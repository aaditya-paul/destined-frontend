import { EditorialHeader } from "@/components/ui/EditorialComponents";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { useOnboarding } from "@/context/OnboardingContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { data } = useOnboarding();

  // Calculate profile score based on completeness and quality
  const profileScore = useMemo(() => {
    let score = 0;
    const maxScore = 100;

    // Images (40 points max - most important)
    const filledImages = data.images.filter((img) => img !== undefined).length;
    score += (filledImages / 6) * 40;

    // Bio (15 points)
    if (data.bio && data.bio.length > 50) score += 15;
    else if (data.bio && data.bio.length > 20) score += 10;
    else if (data.bio) score += 5;

    // Interests (15 points)
    if (data.interests.length >= 5) score += 15;
    else score += (data.interests.length / 5) * 15;

    // Voice note (10 points)
    if (data.voiceNoteDuration && data.voiceNoteDuration.length > 0)
      score += 10;

    // Basic info completion (20 points)
    const basicFields = [
      data.firstName,
      data.lastName,
      data.location,
      data.height,
      data.jobTitle,
      data.school,
    ];
    const filledBasicFields = basicFields.filter(
      (field) => field && field.trim().length > 0,
    ).length;
    score += (filledBasicFields / basicFields.length) * 20;

    return Math.round(score);
  }, [data]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return colors.primary;
    if (score >= 50) return "#FFA500";
    return "#FF4444";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "EXCEPTIONAL";
    if (score >= 80) return "EXCELLENT";
    if (score >= 70) return "STRONG";
    if (score >= 50) return "DECENT";
    return "NEEDS WORK";
  };

  const age = new Date().getFullYear() - data.dateOfBirth.getFullYear();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <EditorialHeader
            title="YOUR_PROFILE"
            subtitle="Manage your digital presence."
          />
        </View>

        {/* Profile Score Card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreTitle}>PROFILE STRENGTH</Text>
            <Text
              style={[
                styles.scoreValue,
                { color: getScoreColor(profileScore) },
              ]}
            >
              {profileScore}%
            </Text>
          </View>

          {/* Score Bar */}
          <View style={styles.scoreBarContainer}>
            <View style={styles.scoreBarBackground}>
              <LinearGradient
                colors={[
                  getScoreColor(profileScore),
                  getScoreColor(profileScore) + "80",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.scoreBarFill, { width: `${profileScore}%` }]}
              />
            </View>
          </View>

          <Text style={styles.scoreLabel}>{getScoreLabel(profileScore)}</Text>

          {profileScore < 80 && (
            <Text style={styles.scoreHint}>
              {profileScore < 40
                ? "Add more photos and complete your profile to increase visibility"
                : profileScore < 70
                  ? "Add interests and a voice note to stand out more"
                  : "Almost perfect! Complete remaining sections"}
            </Text>
          )}
        </View>

        {/* User Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.avatarSection}>
            {data.images[0] ? (
              <Image
                source={{ uri: data.images[0].uri }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>
                  {data.firstName[0] || "U"}
                </Text>
              </View>
            )}

            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {data.firstName} {data.lastName}
              </Text>
              {age > 0 && <Text style={styles.userAge}>{age} YEARS OLD</Text>}
            </View>
          </View>

          <View style={styles.detailsGrid}>
            {data.location && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>LOCATION</Text>
                <Text style={styles.detailValue}>{data.location}</Text>
              </View>
            )}
            {data.jobTitle && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>OCCUPATION</Text>
                <Text style={styles.detailValue}>{data.jobTitle}</Text>
              </View>
            )}
            {data.school && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>EDUCATION</Text>
                <Text style={styles.detailValue}>{data.school}</Text>
              </View>
            )}
            {data.height && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>HEIGHT</Text>
                <Text style={styles.detailValue}>{data.height}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/profile-preview")}
            activeOpacity={0.8}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.md,
              }}
            >
              <Ionicons name="eye" size={24} color={colors.secondary} />
              <View>
                <Text style={styles.actionButtonText}>PREVIEW PROFILE</Text>
                <Text style={styles.actionButtonSubtext}>
                  See how others view you
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => router.push("/onboarding/basic-identity")}
            activeOpacity={0.8}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.md,
              }}
            >
              <Ionicons name="pencil" size={24} color={colors.white} />
              <View>
                <Text
                  style={[
                    styles.actionButtonText,
                    styles.actionButtonTextPrimary,
                  ]}
                >
                  EDIT PROFILE
                </Text>
                <Text
                  style={[
                    styles.actionButtonSubtext,
                    styles.actionButtonSubtextPrimary,
                  ]}
                >
                  Update your information
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.secondary }]}
            onPress={() => router.push("/settings")}
            activeOpacity={0.8}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.md,
              }}
            >
              <Ionicons name="settings" size={24} color={colors.white} />
              <View>
                <Text style={[styles.actionButtonText, { color: "white" }]}>
                  SETTINGS
                </Text>
                <Text
                  style={[
                    styles.actionButtonSubtext,
                    { color: "rgba(255, 255, 255, 0.7)" },
                  ]}
                >
                  App preferences & account
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {data.images.filter((img) => img !== undefined).length}/6
            </Text>
            <Text style={styles.statLabel}>PHOTOS</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{data.interests.length}</Text>
            <Text style={styles.statLabel}>INTERESTS</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {data.bio ? data.bio.length : 0}
            </Text>
            <Text style={styles.statLabel}>BIO CHARS</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl,
  },
  scrollContent: {
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.xl,
    paddingBottom: 120,
  },
  header: {
    marginBottom: spacing.xl,
  },
  scoreCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  scoreTitle: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 2,
  },
  scoreValue: {
    fontSize: 32,
    fontFamily: fontFamilies.bold,
    letterSpacing: -1,
  },
  scoreBarContainer: {
    marginBottom: spacing.md,
  },
  scoreBarBackground: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: "hidden",
  },
  scoreBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  scoreLabel: {
    fontSize: 14,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },
  scoreHint: {
    fontSize: 12,
    fontFamily: fontFamilies.variable,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  overviewCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.lg,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.lg,
  },
  avatarPlaceholderText: {
    fontSize: 32,
    fontFamily: fontFamilies.bold,
    color: colors.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  userAge: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
  },
  detailsGrid: {
    gap: spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 11,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: fontFamilies.variable,
    color: colors.secondary,
  },
  actionsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  actionButtonTextPrimary: {
    color: colors.white,
  },
  actionButtonSubtext: {
    fontSize: 12,
    fontFamily: fontFamilies.variable,
    color: colors.textSecondary,
  },
  actionButtonSubtextPrimary: {
    color: colors.white,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.background,
  },
});
