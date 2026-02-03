import {
  EditorialHeader,
  LikeableCard,
} from "@/components/ui/EditorialComponents";
import InterestChip from "@/components/ui/InterestChip";
import { LikeButton, PassButton } from "@/components/ui/like_unline_actionsBtn";
import {
  colors,
  fontFamilies,
  generalSizes,
  spacing,
} from "@/constants/globalStyles";
import { useOnboarding } from "@/context/OnboardingContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const VoicePrompt = ({ duration }: { duration: string | null }) => (
  <View style={styles.cardPadding}>
    <View style={styles.rowBetween}>
      <Text style={styles.cardLabel}>HEAR ME OUT</Text>
      <Ionicons name="mic" size={12} color={colors.primary} />
    </View>
    <View style={styles.voicePlayer}>
      <TouchableOpacity style={styles.playCircle}>
        <Ionicons name="play" size={18} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.waveFormContainer}>
        {[1, 0.6, 0.8, 0.4, 0.9, 0.5, 1, 0.7].map((h, i) => (
          <View key={i} style={[styles.waveBar, { height: h * 20 }]} />
        ))}
      </View>
      <Text style={styles.voiceDuration}>{duration || "0:00"}</Text>
    </View>
  </View>
);

const PollSection = ({
  question,
  options,
}: {
  question: string;
  options: { label: string; percent: string }[];
}) => (
  <View style={styles.cardPadding}>
    <Text style={styles.cardLabel}>THIS OR THAT</Text>
    <Text style={styles.pollQuestion}>{question}</Text>
    {options.map((opt, i) => (
      <TouchableOpacity key={i} style={styles.pollOption}>
        <View
          style={[styles.pollResultBar, { width: `${opt.percent}%` as any }]}
        />
        <Text style={styles.pollOptionText}>{opt.label}</Text>
        <Text style={styles.pollPercentText}>{opt.percent}%</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ProfilePreviewScreen = () => {
  const { data } = useOnboarding();

  const age = data.dateOfBirth
    ? new Date().getFullYear() - data.dateOfBirth.getFullYear()
    : "";

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: data.images[0]?.uri || "https://unsplash.it/600/800?1",
            }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.95)"]}
            style={styles.gradient}
          />
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTag}>THE REAL ONE</Text>
            <Text style={styles.heroName}>
              {data.firstName.toUpperCase() || "NAME"}
              {", "}
              <Text style={styles.heroAge}>{age}</Text>
            </Text>
            <View style={styles.locationBadge}>
              <Ionicons name="navigate" size={12} color={colors.white} />
              <Text style={styles.locationText}>
                {data.location.toUpperCase() || "NO LOCATION"}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.xl }}>
          {/* THE BASICS (Static) */}
          <View style={styles.vitalsSection}>
            <EditorialHeader title="VIBE CHECK" />
            <View style={styles.vitalsGrid}>
              {data.jobTitle ? (
                <View style={styles.vitalChip}>
                  <Ionicons
                    name="briefcase"
                    size={14}
                    color={colors.secondary}
                  />
                  <Text style={styles.vitalLabel}>{data.jobTitle}</Text>
                </View>
              ) : null}
              {data.height ? (
                <View style={styles.vitalChip}>
                  <Ionicons name="resize" size={14} color={colors.secondary} />
                  <Text style={styles.vitalLabel}>{data.height}</Text>
                </View>
              ) : null}
              {data.school ? (
                <View style={styles.vitalChip}>
                  <Ionicons name="book" size={14} color={colors.secondary} />
                  <Text style={styles.vitalLabel}>{data.school}</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* DYNAMIC FEED: Mixed content */}
          {/* Render remaining images and other sections freely */}

          {data.images.slice(1).map((img, index) => {
            if (!img?.uri) return null;
            return (
              <LikeableCard key={`img-${index}`}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: img.uri }} style={styles.feedImage} />
                  <View style={styles.tapeTag}>
                    <Text style={styles.tapeText}>
                      {img.prompt
                        ? `// ${img.prompt.toUpperCase()}`
                        : "// NO CONTEXT"}
                    </Text>
                  </View>
                </View>
              </LikeableCard>
            );
          })}

          {/* VOICE LOG (Likeable) */}
          {data.voiceNoteDuration && (
            <LikeableCard>
              <VoicePrompt duration={data.voiceNoteDuration} />
            </LikeableCard>
          )}

          {/* THE PLOT / BIO (Now Likeable) */}
          {data.bio && (
            <LikeableCard>
              <View style={styles.cardPadding}>
                <Text style={styles.cardLabel}>THE PLOT</Text>
                <Text style={styles.bioText}>{data.bio}</Text>
              </View>
            </LikeableCard>
          )}

          {/* POLL (Likeable) */}
          <LikeableCard>
            <PollSection
              question={data.poll.question || "Help me decide?"}
              options={data.poll.options}
            />
          </LikeableCard>

          {/* THE ROTATION (Static) */}
          <View style={styles.staticSection}>
            <EditorialHeader title="THE ROTATION" />
            <View style={styles.interestsWrapper}>
              {data.interests.length > 0 ? (
                data.interests.map((item) => (
                  <InterestChip key={item} label={item} selected={true} />
                ))
              ) : (
                <Text
                  style={{ color: colors.textSecondary, fontStyle: "italic" }}
                >
                  No interests added yet.
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FIXED ACTION BAR */}
      <View style={styles.interactionBar}>
        <PassButton size={generalSizes["4xl"]} onPress={() => {}} />
        <LikeButton size={generalSizes["4xl"]} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 160 },
  cardPadding: { padding: spacing.xl },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },

  // Hero Section
  heroContainer: { width, height: height * 0.75, marginBottom: spacing["3xl"] },
  heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
  gradient: { position: "absolute", bottom: 0, width: "100%", height: "40%" },
  heroTextContainer: { position: "absolute", bottom: 40, left: spacing["2xl"] },
  heroTag: {
    color: colors.primary,
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroName: {
    fontSize: 42,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    letterSpacing: -1,
  },
  heroAge: { fontWeight: "300", opacity: 0.7 },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  locationText: {
    color: colors.white,
    fontSize: 11,
    fontFamily: fontFamilies.bold,
    letterSpacing: 1,
  },

  // Vitals
  vitalsSection: { marginBottom: spacing["2xl"] },
  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  vitalChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  vitalLabel: {
    fontSize: 13,
    color: colors.secondary,
    fontFamily: fontFamilies.variable,
    fontWeight: "500",
  },

  // Photo Component
  imageContainer: { width: "100%", aspectRatio: 0.8 },
  feedImage: { width: "100%", height: "100%" },
  tapeTag: {
    position: "absolute",
    top: 20,
    right: -5,
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    transform: [{ rotate: "2deg" }],
  },
  tapeText: {
    color: colors.white,
    fontSize: 9,
    fontFamily: fontFamilies.bold,
    letterSpacing: 1,
  },

  // Voice Card
  cardLabel: {
    fontSize: 9,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  voicePlayer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  playCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  waveFormContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  waveBar: {
    width: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
  },
  voiceDuration: { color: colors.white, fontSize: 11, opacity: 0.8 },

  // Poll Card
  pollQuestion: {
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: 16,
  },
  pollOption: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  pollResultBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#E8E8E8",
    opacity: 0.5,
  },
  pollOptionText: {
    fontSize: 14,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
  },
  pollPercentText: { fontSize: 12, color: colors.textSecondary },

  // Static Sections
  staticSection: { marginBottom: spacing["3xl"] },
  interestsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  bioText: {
    fontSize: 16,
    color: colors.secondary,
    lineHeight: 24,
    fontFamily: fontFamilies.variable,
  },

  // Action Bar
  interactionBar: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: spacing.xl,
  },
});

export default ProfilePreviewScreen;
