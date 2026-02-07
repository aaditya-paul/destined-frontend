import CTA_BTN from "@/components/ui/Cta_btn";
import {
  EditorialHeader,
  LikeableCard,
} from "@/components/ui/EditorialComponents";
import InterestChip from "@/components/ui/InterestChip";
import ProgressBar from "@/components/ui/ProgressBar";
import TextInput from "@/components/ui/TextInput";
import { AVAILABLE_INTERESTS } from "@/constants/data";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { MICROCOPY } from "@/constants/microcopies";
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

  const CONSTANTS = MICROCOPY.onboarding.bioInterests;

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

  // Local state for Poll editing
  const [pollQuestion, setPollQuestion] = useState(data.poll.question);
  const [pollOptions, setPollOptions] = useState(data.poll.options);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    data.poll.correctAnswerIndex,
  );

  const toggleInterest = (interest: string) => {
    const current = data.interests;
    if (current.includes(interest)) {
      updateData({ interests: current.filter((i) => i !== interest) });
    } else if (current.length < 10) {
      updateData({ interests: [...current, interest] });
    }
  };

  const updatePollOption = (index: number, newLabel: string) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = { ...updatedOptions[index], label: newLabel };
    setPollOptions(updatedOptions);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.bio.trim() || data.bio.trim().length < 20) {
      newErrors.bio = CONSTANTS.errors.bio;
    }
    if (data.interests.length < 3) {
      newErrors.interests = CONSTANTS.errors.interests;
    }
    // Poll is optional, but if question exists, options must be filled
    if (pollQuestion.trim()) {
      if (pollOptions.some((opt) => !opt.label.trim())) {
        newErrors.pollOptions = CONSTANTS.errors.mcqOptions;
      }
      if (correctAnswerIndex === null) {
        newErrors.correctAnswer = CONSTANTS.errors.mcqAnswer;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    // Save local poll state to context before continuing
    updateData({
      poll: {
        question: pollQuestion,
        options: pollOptions,
        correctAnswerIndex: correctAnswerIndex,
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
          title={CONSTANTS.title}
          subtitle={CONSTANTS.subtitle}
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
              <Text style={styles.sectionLabel}>{CONSTANTS.bio.label}</Text>
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
              placeholder={CONSTANTS.bio.placeholder}
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
              <Text style={styles.sectionLabel}>
                {CONSTANTS.interests.label}
              </Text>
              <Text style={styles.selectionCount}>
                {data.interests.length}/10
              </Text>
            </View>

            {errors.interests && (
              <Text style={styles.errorText}>{errors.interests}</Text>
            )}

            <View style={styles.interestsContainer}>
              {AVAILABLE_INTERESTS.map((interest) => (
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
            <Text style={styles.sectionLabel}>{CONSTANTS.audio.label}</Text>
            <LikeableCard hideLikeBtn={true}>
              <View style={styles.voiceCardContent}>
                <View style={styles.voiceHeader}>
                  <Text style={styles.voiceLabel}>
                    {recording
                      ? CONSTANTS.audio.hint.recording
                      : CONSTANTS.audio.heading}
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
                      ? `${CONSTANTS.audio.hint.recorded} (${data.voiceNoteDuration})`
                      : CONSTANTS.audio.hint.default}
                </Text>
              </View>
            </LikeableCard>
          </View>

          {/* MCQ Creation */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{CONSTANTS.mcq.label}</Text>
            {(errors.pollOptions || errors.correctAnswer) && (
              <Text style={styles.errorText}>
                {errors.pollOptions || errors.correctAnswer}
              </Text>
            )}
            <LikeableCard hideLikeBtn={true}>
              <View style={styles.pollCardContent}>
                <TextInput
                  label={CONSTANTS.mcq.question.label}
                  value={pollQuestion}
                  onChangeText={setPollQuestion}
                  placeholder={CONSTANTS.mcq.question.placeholder}
                  containerStyle={{ marginBottom: spacing.md }}
                />
                <Text style={styles.optionsLabel}>
                  {CONSTANTS.mcq.options.label}
                </Text>
                <View style={styles.pollOptionsEditContainer}>
                  {pollOptions.map((opt, i) => (
                    <View key={i} style={styles.mcqOptionRow}>
                      <TouchableOpacity
                        style={[
                          styles.correctAnswerBtn,
                          correctAnswerIndex === i &&
                            styles.correctAnswerBtnActive,
                        ]}
                        onPress={() => setCorrectAnswerIndex(i)}
                      >
                        <Ionicons
                          name={
                            correctAnswerIndex === i
                              ? "checkmark-circle"
                              : "radio-button-off"
                          }
                          size={24}
                          color={
                            correctAnswerIndex === i
                              ? colors.primary
                              : colors.textSecondary
                          }
                        />
                      </TouchableOpacity>
                      <View style={styles.optionInputWrapper}>
                        <TextInput
                          value={opt.label}
                          onChangeText={(text) => updatePollOption(i, text)}
                          placeholder={`Option ${i + 1}`}
                          containerStyle={{ marginBottom: 0 }}
                        />
                      </View>
                    </View>
                  ))}
                </View>
                <Text style={styles.pollHint}>{CONSTANTS.mcq.hint}</Text>
              </View>
            </LikeableCard>
          </View>

          <View style={styles.buttonContainer}>
            <CTA_BTN
              text={CONSTANTS.nextBtn}
              onPress={handleContinue}
              btnColor={colors.primary}
            />
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backLink}>{CONSTANTS.backBtn}</Text>
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
  optionsLabel: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  pollOptionsEditContainer: {
    gap: spacing.md,
  },
  mcqOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    // marginBottom: spacing.sm,
  },
  correctAnswerBtn: {
    padding: spacing.xs,
  },
  correctAnswerBtnActive: {
    transform: [{ scale: 1.1 }],
  },
  optionInputWrapper: {
    flex: 1,
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
