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
import { dummyProfiles } from "@/data/dummyData";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
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
        <View style={[styles.pollResultBar, { width: opt.percent as any }]} />
        <Text style={styles.pollOptionText}>{opt.label}</Text>
        <Text style={styles.pollPercentText}>{opt.percent}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentProfile = dummyProfiles[currentIndex];
  const nextProfile = dummyProfiles[(currentIndex + 1) % dummyProfiles.length];

  const scrollViewRef = useRef<ScrollView>(null);
  const currentSlideAnim = useRef(new Animated.Value(0)).current;
  const currentRotateAnim = useRef(new Animated.Value(0)).current;
  const currentOpacityAnim = useRef(new Animated.Value(1)).current;
  const nextScaleAnim = useRef(new Animated.Value(0.95)).current;
  const nextTranslateYAnim = useRef(new Animated.Value(20)).current;

  const animateSlide = (direction: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);

    const toValue = direction === "right" ? width * 1.5 : -width * 1.5;
    const rotateValue = direction === "right" ? 20 : -20;

    Animated.parallel([
      // Slide and rotate current card out
      Animated.timing(currentSlideAnim, {
        toValue,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(currentRotateAnim, {
        toValue: rotateValue,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(currentOpacityAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      // Scale up and move next card to front
      Animated.timing(nextScaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(nextTranslateYAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update to next profile immediately
      const nextIndex = (currentIndex + 1) % dummyProfiles.length;
      setCurrentIndex(nextIndex);

      // Reset animations after state update
      requestAnimationFrame(() => {
        currentSlideAnim.setValue(0);
        currentRotateAnim.setValue(0);
        currentOpacityAnim.setValue(1);
        nextScaleAnim.setValue(0.95);
        nextTranslateYAnim.setValue(20);

        setIsAnimating(false);

        // Scroll to top
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        }, 0);
      });
    });
  };

  const handleLike = () => {
    console.log(`Liked: ${currentProfile.firstName}`);
    animateSlide("right");
  };

  const handlePass = () => {
    console.log(`Passed: ${currentProfile.firstName}`);
    animateSlide("left");
  };

  const age = currentProfile.dateOfBirth
    ? new Date().getFullYear() - currentProfile.dateOfBirth.getFullYear()
    : "";

  const renderProfile = (
    profile: typeof currentProfile,
    isNext = false,
    profileIndex: number,
  ) => {
    const age = profile.dateOfBirth
      ? new Date().getFullYear() - profile.dateOfBirth.getFullYear()
      : "";

    return (
      <ScrollView
        key={`profile-${profileIndex}`}
        ref={isNext ? undefined : scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!isNext}
        style={{ backgroundColor: colors.background }}
      >
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
                  <Ionicons
                    name="briefcase"
                    size={14}
                    color={colors.secondary}
                  />
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
                      {profile.images[1]?.prompt.toUpperCase()}
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
                      {profile.images[2]?.prompt.toUpperCase()}
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
                      {profile.images[3]?.prompt.toUpperCase()}
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
                <Text style={styles.emptyText}>No interests added yet</Text>
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
                        {img.prompt.toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
              </LikeableCard>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Next Profile (Behind) */}
      <Animated.View
        style={[
          styles.cardContainer,
          styles.nextCard,
          {
            transform: [
              { scale: nextScaleAnim },
              { translateY: nextTranslateYAnim },
            ],
          },
        ]}
      >
        {renderProfile(
          nextProfile,
          true,
          (currentIndex + 1) % dummyProfiles.length,
        )}
      </Animated.View>

      {/* Current Profile (Front) */}
      <Animated.View
        style={[
          styles.cardContainer,
          styles.currentCard,
          {
            opacity: currentOpacityAnim,
            transform: [
              { translateX: currentSlideAnim },
              {
                rotate: currentRotateAnim.interpolate({
                  inputRange: [-20, 20],
                  outputRange: ["-20deg", "20deg"],
                }),
              },
            ],
          },
        ]}
      >
        {renderProfile(currentProfile, false, currentIndex)}
      </Animated.View>

      {/* FIXED ACTION BAR */}
      <View style={styles.interactionBar}>
        <PassButton size={generalSizes["4xl"]} onPress={handlePass} />
        <LikeButton size={generalSizes["4xl"]} onPress={handleLike} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  cardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
  },
  currentCard: {
    zIndex: 2,
  },
  nextCard: {
    zIndex: 1,
  },
  scrollContent: { paddingBottom: 160 },
  cardPadding: { padding: spacing.xl },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },

  // Hero Section
  heroContainer: {
    width,
    height: height * 0.75,
    marginBottom: spacing["3xl"],
    borderBottomLeftRadius: generalSizes["2xl"],
    borderBottomRightRadius: generalSizes["2xl"],
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
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
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
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
    zIndex: 10,
  },
});
