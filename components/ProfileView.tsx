import {
  EditorialHeader,
  LikeableCard,
} from "@/components/ui/EditorialComponents";
import InterestChip from "@/components/ui/InterestChip";
import {
  colors,
  fontFamilies,
  spacing,
} from "@/constants/globalStyles";
import { OnboardingData } from "@/context/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
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
        <View style={[styles.pollResultBar, { width: opt.percent as any }]} />
        <Text style={styles.pollOptionText}>{opt.label}</Text>
        <Text style={styles.pollPercentText}>{opt.percent}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

interface ProfileViewProps {
  profile: OnboardingData;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile }) => {
  const age = profile.dateOfBirth
    ? new Date().getFullYear() - profile.dateOfBirth.getFullYear()
    : "";

  return (
    <>
      {/* HERO SECTION */}
      <View style={styles.heroContainer}>
        <Image
          source={{
            uri: profile.images[0]?.uri || "https://unsplash.it/600/800?1",
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
            {profile.firstName.toUpperCase() || "NAME"}
            {", "}
            <Text style={styles.heroAge}>{age}</Text>
          </Text>
          <View style={styles.locationBadge}>
            <Ionicons name="navigate" size={12} color={colors.white} />
            <Text style={styles.locationText}>
              {profile.location.toUpperCase() || "NO LOCATION"}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: spacing.xl }}>
        {/* THE BASICS (Static) */}
        <View style={styles.vitalsSection}>
          <EditorialHeader title="VIBE CHECK" />
          <View style={styles.vitalsGrid}>
            {profile.jobTitle ? (
              <View style={styles.vitalChip}>
                <Ionicons name="briefcase" size={14} color={colors.secondary} />
                <Text style={styles.vitalLabel}>{profile.jobTitle}</Text>
              </View>
            ) : null}
            {profile.height ? (
              <View style={styles.vitalChip}>
                <Ionicons name="resize" size={14} color={colors.secondary} />
                <Text style={styles.vitalLabel}>{profile.height}</Text>
              </View>
            ) : null}
            {profile.school ? (
              <View style={styles.vitalChip}>
                <Ionicons name="book" size={14} color={colors.secondary} />
                <Text style={styles.vitalLabel}>{profile.school}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* --- SLOT 1: Image 1 --- */}
        {profile.images[1]?.uri && (
          <LikeableCard>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: profile.images[1]?.uri }}
                style={styles.feedImage}
              />
              {profile.images[1]?.prompt && (
                <View style={styles.tapeTag}>
                  <Text style={styles.tapeText}>
                    {`// ${profile.images[1].prompt.toUpperCase()}`}
                  </Text>
                </View>
              )}
            </View>
          </LikeableCard>
        )}

        {/* --- SLOT 2: Voice --- */}
        {profile.voiceNoteDuration && (
          <LikeableCard>
            <VoicePrompt duration={profile.voiceNoteDuration} />
          </LikeableCard>
        )}

        {/* --- SLOT 3: Bio --- */}
        {profile.bio && (
          <LikeableCard>
            <View style={styles.cardPadding}>
              <Text style={styles.cardLabel}>THE PLOT</Text>
              <Text style={styles.bioText}>{profile.bio}</Text>
            </View>
          </LikeableCard>
        )}

        {/* --- SLOT 4: Image 2 --- */}
        {profile.images[2]?.uri && (
          <LikeableCard>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: profile.images[2]?.uri }}
                style={styles.feedImage}
              />
              {profile.images[2]?.prompt && (
                <View style={styles.tapeTag}>
                  <Text style={styles.tapeText}>
                    {`// ${profile.images[2].prompt.toUpperCase()}`}
                  </Text>
                </View>
              )}
            </View>
          </LikeableCard>
        )}

        {/* --- SLOT 5: Poll --- */}
        <LikeableCard>
          <PollSection
            question={profile.poll.question || "Help me decide?"}
            options={profile.poll.options}
          />
        </LikeableCard>

        {/* --- SLOT 6: Image 3 --- */}
        {profile.images[3]?.uri && (
          <LikeableCard>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: profile.images[3]?.uri }}
                style={styles.feedImage}
              />
              {profile.images[3]?.prompt && (
                <View style={styles.tapeTag}>
                  <Text style={styles.tapeText}>
                    {`// ${profile.images[3].prompt.toUpperCase()}`}
                  </Text>
                </View>
              )}
            </View>
          </LikeableCard>
        )}

        {/* --- SLOT 7: Interests --- */}
        <View style={styles.staticSection}>
          <EditorialHeader title="THE ROTATION" />
          <View style={styles.interestsWrapper}>
            {profile.interests.length > 0 ? (
              profile.interests.map((item) => (
                <InterestChip key={item} label={item} selected={true} />
              ))
            ) : (
              <Text style={{ color: colors.textSecondary, fontStyle: "italic" }}>
                No interests added yet.
              </Text>
            )}
          </View>
        </View>

        {/* --- SLOT 8+: Remaining Images (4, 5) --- */}
        {profile.images.slice(4).map((img, index) => {
          if (!img?.uri) return null;
          return (
            <LikeableCard key={`remaining-img-${index}`}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: img.uri }} style={styles.feedImage} />
                {img.prompt && (
                  <View style={styles.tapeTag}>
                    <Text style={styles.tapeText}>
                      {`// ${img.prompt.toUpperCase()}`}
                    </Text>
                  </View>
                )}
              </View>
            </LikeableCard>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  locationText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    letterSpacing: 1.5,
  },

  // Vibe Check / Vitals
  vitalsSection: { marginBottom: spacing["2xl"] },
  vitalsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  vitalChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 24,
  },
  vitalLabel: {
    fontSize: 13,
    fontFamily: fontFamilies.variable,
    color: colors.secondary,
  },

  // Image Cards
  imageContainer: { overflow: "hidden" },
  feedImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  tapeTag: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.lg,
    backgroundColor: "#FFE55C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    transform: [{ rotate: "-2deg" }],
  },
  tapeText: {
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    color: colors.secondary,
    letterSpacing: 1,
  },

  // Bio
  bioText: {
    fontSize: 15,
    fontFamily: fontFamilies.variable,
    color: colors.secondary,
    lineHeight: 24,
  },
  cardLabel: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    letterSpacing: 2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  // Voice Player
  voicePlayer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  playCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  waveFormContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 30,
  },
  waveBar: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 2,
    opacity: 0.3,
  },
  voiceDuration: {
    fontSize: 13,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
  },

  // Poll
  pollQuestion: {
    fontSize: 16,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  pollOption: {
    position: "relative",
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  pollResultBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.primaryLight,
    opacity: 0.2,
  },
  pollOptionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamilies.variable,
    color: colors.secondary,
  },
  pollPercentText: {
    fontSize: 13,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
  },

  // Interests
  staticSection: { marginBottom: spacing["2xl"] },
  interestsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
