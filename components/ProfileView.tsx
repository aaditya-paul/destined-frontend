import {
  EditorialHeader,
  LikeableCard,
} from "@/components/ui/EditorialComponents";
import InterestChip from "@/components/ui/InterestChip";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { OnboardingData } from "@/context/types";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const VoicePrompt = ({
  duration,
  uri,
}: {
  duration: string | null;
  uri?: string | null;
}) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [currentPosition, setCurrentPosition] = useState(0); // in ms
  const [totalDuration, setTotalDuration] = useState(0); // in ms
  const [layoutWidth, setLayoutWidth] = useState(0);

  const [isSeeking, setIsSeeking] = useState(false); // Add seeking state

  // Format MM:SS
  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  async function playSound() {
    if (!uri) return;
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          {
            shouldPlay: true,
            isLooping: false,
            progressUpdateIntervalMillis: 50,
          }, // fast updates
        );
        setSound(newSound);
        setIsPlaying(true);
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            // Update progress & position ONLY if not seeking
            if (status.durationMillis) {
              setTotalDuration(status.durationMillis);
              if (!isSeeking) {
                setProgress(status.positionMillis / status.durationMillis);
                setCurrentPosition(status.positionMillis);
              }
            }

            if (status.didJustFinish) {
              setIsPlaying(false);
              setProgress(0);
              setCurrentPosition(0);
              newSound.stopAsync(); // Ensure it stops
              newSound.setPositionAsync(0);
            }
          }
        });
      }
    } catch (error) {
      console.log("Error playing sound", error);
    }
  }

  const handleSeek = async (event: any) => {
    if (!sound || !totalDuration || !layoutWidth) return;

    setIsSeeking(true); // Block updates

    const touchX = event.nativeEvent.locationX;
    // Bound between 0 and 1
    const seekProgress = Math.max(0, Math.min(1, touchX / layoutWidth));
    const seekPosition = seekProgress * totalDuration;

    // Optimally update UI immediately
    setProgress(seekProgress);
    setCurrentPosition(seekPosition);

    try {
      // Pause first for smoother seek
      if (isPlaying) {
        await sound.pauseAsync();
      }

      await sound.setPositionAsync(seekPosition);

      // Resume if it was playing or we want it to play on tap
      // Let's decide: tap to seek always plays? Or maintains state?
      // User said "voice control", usually seek keeps playing.
      // But if paused, maybe just seek?
      // Let's force play for better feedback
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log("Error seeking", error);
    } finally {
      // Small delay to let the seek settle before allowing updates again
      setTimeout(() => {
        setIsSeeking(false);
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      sound ? sound.unloadAsync() : undefined;
    };
  }, [sound]);

  // Generate some static random heights for the bars
  const waveHeights = [
    0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1, 0.7, 0.5, 0.8, 0.6, 0.9, 0.4, 0.6, 0.5,
    0.8, 0.5, 0.7, 0.4, 0.6,
  ];

  return (
    <View style={styles.cardPadding}>
      <View style={styles.rowBetween}>
        <Text style={styles.cardLabel}>HEAR ME OUT</Text>
        <View style={styles.audioBadge}>
          <Ionicons name="headset" size={10} color={colors.white} />
          <Text style={styles.audioBadgeText}>AUDIO</Text>
        </View>
      </View>

      <View style={styles.voicePlayerContainer}>
        <TouchableOpacity
          style={[styles.playCircle, isPlaying && styles.playCircleActive]}
          onPress={playSound}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={22}
            color={isPlaying ? colors.white : colors.primary}
            style={{ marginLeft: isPlaying ? 0 : 2 }} // center play icon visually
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.trackContainer}
          onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
          onPress={handleSeek}
          activeOpacity={1}
        >
          <View style={styles.waveFormContainer}>
            {waveHeights.map((h, i) => {
              // Smoother visualization
              // Calculate how much of this specific bar is filled
              // Total bars = 20. Each bar represents 5% (0.05) of total duration.
              const barWidth = 1 / waveHeights.length;
              const barStart = i * barWidth;

              // If progress is past this bar's end, it's fully active (1)
              // If progress is before this bar's start, it's inactive (0)
              // If progress is within this bar, it's partially active

              let activeOpacity = 0.3; // Default inactive
              let barColor = "#E0E0E0";

              if (progress > barStart) {
                barColor = colors.primary;
                activeOpacity = 1;
              }

              return (
                <View
                  key={i}
                  style={[
                    styles.waveBar,
                    {
                      height: 12 + h * 18,
                      backgroundColor: barColor,
                      opacity: activeOpacity,
                    },
                  ]}
                />
              );
            })}
          </View>
        </TouchableOpacity>

        <Text style={styles.voiceDuration}>
          {isPlaying ? formatTime(currentPosition) : duration || "0:00"}
        </Text>
      </View>
    </View>
  );
};

const PollSection = ({
  question,
  options,
  correctAnswerIndex,
}: {
  question: string;
  options: { label: string }[];
  correctAnswerIndex: number | null;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionPress = (index: number) => {
    if (hasAnswered) return; // Prevent changing answer after selection
    setSelectedIndex(index);
    setHasAnswered(true);
  };

  return (
    <View style={styles.cardPadding}>
      <Text style={styles.cardLabel}>MCQ CHALLENGE</Text>
      <Text style={styles.pollQuestion}>{question}</Text>
      {options.map((opt, i) => {
        const isSelected = selectedIndex === i;
        const isCorrect = correctAnswerIndex === i;
        const showCorrect = hasAnswered && isCorrect;
        const showIncorrect = hasAnswered && isSelected && !isCorrect;

        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.mcqOption,
              showCorrect && styles.mcqOptionCorrect,
              showIncorrect && styles.mcqOptionIncorrect,
              !hasAnswered && styles.mcqOptionClickable,
            ]}
            onPress={() => handleOptionPress(i)}
            disabled={hasAnswered}
          >
            <View
              style={[
                styles.mcqOptionCircle,
                showCorrect && styles.mcqOptionCircleCorrect,
                showIncorrect && styles.mcqOptionCircleIncorrect,
              ]}
            >
              {hasAnswered && (isCorrect || (isSelected && !isCorrect)) ? (
                <Ionicons
                  name={isCorrect ? "checkmark" : "close"}
                  size={18}
                  color={colors.white}
                />
              ) : (
                <Text style={styles.mcqOptionLetter}>
                  {String.fromCharCode(65 + i)}
                </Text>
              )}
            </View>
            <Text
              style={[
                styles.mcqOptionText,
                (showCorrect || showIncorrect) && styles.mcqOptionTextBold,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
      {hasAnswered && (
        <Text style={styles.mcqFeedback}>
          {selectedIndex === correctAnswerIndex
            ? "🎉 Correct! You know them well!"
            : "Keep guessing! Every answer reveals more."}
        </Text>
      )}
    </View>
  );
};

interface ProfileViewProps {
  profile: OnboardingData;
  onCardLike?: (cardContent: React.ReactNode) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onCardLike,
}) => {
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
            {profile.datingPreference ? (
              <View style={styles.vitalChip}>
                <Ionicons name="heart" size={14} color={colors.secondary} />
                <Text style={styles.vitalLabel}>
                  {profile.datingPreference}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* --- SLOT 1: Image 1 --- */}
        {profile.images[1]?.uri && (
          <LikeableCard
            onLike={() =>
              onCardLike?.(
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
                </View>,
              )
            }
          >
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
          <LikeableCard
            onLike={() =>
              onCardLike?.(
                <VoicePrompt
                  duration={profile.voiceNoteDuration}
                  uri={profile.voiceNoteUri}
                />,
              )
            }
          >
            <VoicePrompt
              duration={profile.voiceNoteDuration}
              uri={profile.voiceNoteUri}
            />
          </LikeableCard>
        )}

        {/* --- SLOT 3: Bio --- */}
        {profile.bio && (
          <LikeableCard
            onLike={() =>
              onCardLike?.(
                <View style={styles.cardPadding}>
                  <Text style={styles.cardLabel}>THE PLOT</Text>
                  <Text style={styles.bioText}>{profile.bio}</Text>
                </View>,
              )
            }
          >
            <View style={styles.cardPadding}>
              <Text style={styles.cardLabel}>THE PLOT</Text>
              <Text style={styles.bioText}>{profile.bio}</Text>
            </View>
          </LikeableCard>
        )}

        {/* --- SLOT 4: Image 2 --- */}
        {profile.images[2]?.uri && (
          <LikeableCard
            onLike={() =>
              onCardLike?.(
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
                </View>,
              )
            }
          >
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
        <LikeableCard
          onLike={() =>
            onCardLike?.(
              <PollSection
                question={profile.poll.question || "Help me decide?"}
                options={profile.poll.options}
                correctAnswerIndex={profile.poll.correctAnswerIndex}
              />,
            )
          }
        >
          <PollSection
            question={profile.poll.question || "Help me decide?"}
            options={profile.poll.options}
            correctAnswerIndex={profile.poll.correctAnswerIndex}
          />
        </LikeableCard>

        {/* --- SLOT 6: Image 3 --- */}
        {profile.images[3]?.uri && (
          <LikeableCard
            onLike={() =>
              onCardLike?.(
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
                </View>,
              )
            }
          >
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
              <Text
                style={{ color: colors.textSecondary, fontStyle: "italic" }}
              >
                No interests added yet.
              </Text>
            )}
          </View>
        </View>

        {/* --- SLOT 8+: Remaining Images (4, 5) --- */}
        {profile.images.slice(4).map((img, index) => {
          if (!img?.uri) return null;
          const imageContent = (
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
          );
          return (
            <LikeableCard
              key={`remaining-img-${index}`}
              onLike={() => onCardLike?.(imageContent)}
            >
              {imageContent}
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
  // Voice Player
  voicePlayerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: "#F8F9FA",
    padding: spacing.sm,
    borderRadius: 16,
    marginTop: spacing.xs,
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  playCircleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  trackContainer: {
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  waveFormContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    height: 30,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
  },
  voiceDuration: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    width: 40,
    textAlign: "right",
  },
  audioBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  audioBadgeText: {
    color: colors.white,
    fontSize: 8,
    fontFamily: fontFamilies.bold,
    letterSpacing: 1,
  },

  // Poll
  pollQuestion: {
    fontSize: 16,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  mcqOption: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.secondary,
    gap: spacing.md,
  },
  mcqOptionClickable: {
    borderColor: colors.secondary,
    opacity: 0.8,
  },
  mcqOptionCorrect: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  mcqOptionIncorrect: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    borderColor: "#F44336",
    borderWidth: 2,
  },
  mcqOptionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  mcqOptionCircleCorrect: {
    backgroundColor: "#4CAF50",
  },
  mcqOptionCircleIncorrect: {
    backgroundColor: "#F44336",
  },
  mcqOptionLetter: {
    fontSize: 14,
    fontFamily: fontFamilies.bold,
    color: colors.white,
  },
  mcqOptionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamilies.variable,
    color: colors.secondary,
  },
  mcqOptionTextBold: {
    fontFamily: fontFamilies.bold,
  },
  mcqFeedback: {
    marginTop: spacing.md,
    fontSize: 13,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    textAlign: "center",
    fontStyle: "italic",
  },

  // Interests
  staticSection: { marginBottom: spacing["2xl"] },
  interestsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
