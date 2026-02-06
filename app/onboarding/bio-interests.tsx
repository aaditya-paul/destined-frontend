import CTA_BTN from "@/components/ui/Cta_btn";
import {
  EditorialHeader,
  LikeableCard,
} from "@/components/ui/EditorialComponents";
import InterestChip from "@/components/ui/InterestChip";
import ProgressBar from "@/components/ui/ProgressBar";
import TextInput from "@/components/ui/TextInput";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { useOnboarding } from "@/context/OnboardingContext";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BioInterestsScreen = () => {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recordingDuration, setRecordingDuration] = useState(0); // in seconds
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Playback State
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  async function playRecordedAudio() {
    if (!data.voiceNoteUri) return;
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
        console.log("Loading Sound");
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: data.voiceNoteUri },
          { shouldPlay: true, isLooping: false },
        );
        setSound(newSound);
        setIsPlaying(true);
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            newSound.stopAsync();
            newSound.setPositionAsync(0);
          }
        });
      }
    } catch (error) {
      console.log("Error playing audio", error);
    }
  }

  // Local state for Poll editing (simplified for now)
  const [pollQuestion, setPollQuestion] = useState(data.poll.question);

  const availableInterests = [
    "Travel",
    "Photography",
    "Music",
    "Cooking",
    "Fitness",
    "Reading",
    "Movies",
    "Gaming",
    "Art",
    "Dancing",
    "Hiking",
    "Yoga",
    "Coffee",
    "Wine",
    "Sports",
    "Technology",
    "Fashion",
    "Food",
    "Pets",
    "Nature",
  ];

  const toggleInterest = (interest: string) => {
    const current = data.interests;
    if (current.includes(interest)) {
      updateData({ interests: current.filter((i) => i !== interest) });
    } else if (current.length < 10) {
      updateData({ interests: [...current, interest] });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.bio.trim() || data.bio.trim().length < 20) {
      newErrors.bio = "YOUR STORY NEEDS MORE DETAIL (MIN 20 CHARS).";
    }
    if (data.interests.length < 3) {
      newErrors.interests = "SELECT AT LEAST 3 ATTRIBUTES.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    // Save local poll state to context before continuing
    updateData({
      poll: {
        ...data.poll,
        question: pollQuestion,
      },
    });

    if (validateForm()) {
      router.push("/onboarding/profile-builder");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <ProgressBar totalSteps={3} currentStep={2} />
        <View style={styles.headerSpacer} />
        <EditorialHeader
          title="THE_NARRATIVE"
          subtitle="Define your character and voice."
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Bio Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>PERSONAL STATEMENT</Text>
              <Text
                style={[
                  styles.charCount,
                  data.bio.length > 450 && { color: colors.primary },
                ]}
              >
                {data.bio.length}/500
              </Text>
            </View>
            <TextInput
              placeholder="What makes you... you?"
              value={data.bio}
              onChangeText={(text) => updateData({ bio: text })}
              error={errors.bio}
              multiline
              numberOfLines={6}
              style={styles.bioInput}
              maxLength={500}
            />
          </View>

          {/* Interests Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>ATTRIBUTES & INTERESTS</Text>
              <Text style={styles.selectionCount}>
                {data.interests.length}/10
              </Text>
            </View>

            {errors.interests && (
              <Text style={styles.errorText}>{errors.interests}</Text>
            )}

            <View style={styles.interestsContainer}>
              {availableInterests.map((interest) => (
                <InterestChip
                  key={interest}
                  label={interest}
                  selected={data.interests.includes(interest)}
                  onPress={() => toggleInterest(interest)}
                />
              ))}
            </View>
          </View>

          {/* Voice Prompt (Real Recording) */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>AUDIO LOG</Text>
            <LikeableCard hideLikeBtn={true}>
              <View style={styles.voiceCardContent}>
                <View style={styles.voiceHeader}>
                  <Text style={styles.voiceLabel}>
                    {recording ? "RECORDING..." : "RECORD 2 MIN INTRO"}
                  </Text>
                  {data.voiceNoteUri ? (
                    <TouchableOpacity
                      onPress={() => {
                        updateData({
                          voiceNoteDuration: null,
                          voiceNoteUri: null,
                        });
                        setRecordingDuration(0);
                        if (sound) {
                          sound.unloadAsync();
                          setSound(undefined);
                          setIsPlaying(false);
                        }
                      }}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    recording ? styles.recordButtonRecording : {},
                    data.voiceNoteUri ? styles.recordButtonActive : {},
                  ]}
                  onPress={async () => {
                    if (recording) {
                      // Stop Recording
                      console.log("Stopping recording..");
                      if (timerInterval) clearInterval(timerInterval);
                      setTimerInterval(null);
                      setRecording(undefined);
                      await recording.stopAndUnloadAsync();
                      const uri = recording.getURI();
                      console.log("Recording stopped and stored at", uri);

                      // Format duration
                      const mins = Math.floor(recordingDuration / 60);
                      const secs = recordingDuration % 60;
                      const durationStr = `${mins}:${secs < 10 ? "0" : ""}${secs}`;

                      updateData({
                        voiceNoteUri: uri,
                        voiceNoteDuration: durationStr,
                      });
                    } else if (data.voiceNoteUri) {
                      // Playback
                      playRecordedAudio();
                    } else {
                      // Start Recording
                      if (permissionResponse?.status !== "granted") {
                        console.log("Requesting permission..");
                        const permission = await requestPermission();
                        if (permission.status !== "granted") return;
                      }

                      await Audio.setAudioModeAsync({
                        allowsRecordingIOS: true,
                        playsInSilentModeIOS: true,
                      });

                      console.log("Starting recording..");
                      const { recording } = await Audio.Recording.createAsync(
                        Audio.RecordingOptionsPresets.HIGH_QUALITY,
                      );
                      setRecording(recording);
                      setRecordingDuration(0);

                      const interval = setInterval(() => {
                        setRecordingDuration((d) => {
                          if (d >= 120) {
                            // 2 mins limit
                            // Stop automatically
                            recording.stopAndUnloadAsync().then(() => {
                              const uri = recording.getURI();
                              updateData({
                                voiceNoteUri: uri,
                                voiceNoteDuration: "2:00",
                              });
                              setRecording(undefined);
                              clearInterval(interval);
                            });
                            return 120;
                          }
                          return d + 1;
                        });
                      }, 1000);
                      setTimerInterval(interval as unknown as NodeJS.Timeout);
                    }
                  }}
                >
                  {recording ? (
                    <View style={styles.recordingIndicator} />
                  ) : (
                    <Ionicons
                      name={
                        data.voiceNoteUri
                          ? isPlaying
                            ? "pause"
                            : "play"
                          : "mic"
                      }
                      size={24}
                      color={colors.white}
                    />
                  )}
                </TouchableOpacity>

                <Text style={styles.voiceHint}>
                  {recording
                    ? `${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, "0")} / 2:00`
                    : data.voiceNoteDuration
                      ? `AUDIO CAPTURED (${data.voiceNoteDuration})`
                      : "TAP TO RECORD"}
                </Text>
              </View>
            </LikeableCard>
          </View>

          {/* Poll Creation (Simplified) */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>QUERY INTERFACE</Text>
            <LikeableCard hideLikeBtn={true}>
              <View style={styles.pollCardContent}>
                <TextInput
                  label="POLL QUESTION"
                  value={pollQuestion}
                  onChangeText={setPollQuestion}
                  placeholder="Ask something..."
                  containerStyle={{ marginBottom: spacing.md }}
                />
                <View style={styles.pollOptionVisual}>
                  {data.poll.options.map((opt, i) => (
                    <View key={i} style={styles.pollOptionRow}>
                      <View style={styles.pollBar} />
                      <Text style={styles.pollOptionText}>{opt.label}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.pollHint}>
                  *Options are set to default for demo*
                </Text>
              </View>
            </LikeableCard>
          </View>

          <View style={styles.buttonContainer}>
            <CTA_BTN
              text="SAVE & CONTINUE"
              onPress={handleContinue}
              btnColor={colors.primary}
            />
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backLink}>GO BACK</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topNav: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing["2xl"],
  },
  headerSpacer: {
    height: spacing.lg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing["2xl"],
    paddingBottom: 120,
    paddingTop: spacing.lg,
  },
  section: {
    marginBottom: spacing["2xl"],
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 2.5,
    marginBottom: spacing.lg,
    opacity: 0.6,
  },
  bioInput: {
    minHeight: 140,
    textAlignVertical: "top",
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 15,
    fontFamily: fontFamilies.variable,
    lineHeight: 22,
  },
  charCount: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
  },
  selectionCount: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  errorText: {
    fontSize: 11,
    color: colors.primary,
    fontFamily: fontFamilies.bold,
    marginBottom: spacing.md,
    textTransform: "uppercase",
  },

  // Voice Card
  voiceCardContent: {
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.md,
  },
  voiceHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  voiceLabel: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 1.5,
  },
  recordButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacing.xs,
  },
  recordButtonActive: {
    backgroundColor: colors.primary,
  },
  recordButtonRecording: {
    backgroundColor: "#FF4B4B",
    borderWidth: 2,
    borderColor: colors.white,
  },
  recordingIndicator: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  voiceHint: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    opacity: 0.8,
    letterSpacing: 2,
  },

  // Poll Card
  pollCardContent: {
    padding: spacing.lg,
  },
  pollOptionVisual: {
    gap: 8,
    marginTop: spacing.sm,
    opacity: 0.6,
  },
  pollOptionRow: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  pollBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "30%",
    backgroundColor: "#E0E0E0",
  },
  pollOptionText: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
  },
  pollHint: {
    marginTop: spacing.md,
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: "center",
    fontStyle: "italic",
  },

  buttonContainer: {
    marginTop: spacing.lg,
    gap: spacing.lg,
  },
  backLink: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textDecorationLine: "underline",
  },
});

export default BioInterestsScreen;
