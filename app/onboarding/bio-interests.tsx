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
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

          {/* Voice Prompt (Mock Recording) */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>AUDIO LOG</Text>
            <LikeableCard hideLikeBtn={true}>
              <View style={styles.voiceCardContent}>
                <View style={styles.voiceHeader}>
                  <Text style={styles.voiceLabel}>RECORD 15 SEC INTRO</Text>
                  {data.voiceNoteDuration ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={colors.primary}
                    />
                  ) : (
                    <Ionicons
                      name="mic-outline"
                      size={16}
                      color={colors.textSecondary}
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    data.voiceNoteDuration ? styles.recordButtonActive : {},
                  ]}
                  onPress={() =>
                    updateData({
                      voiceNoteDuration: data.voiceNoteDuration ? null : "0:15",
                    })
                  }
                >
                  <Ionicons
                    name={data.voiceNoteDuration ? "stop" : "mic"}
                    size={24}
                    color={colors.white}
                  />
                </TouchableOpacity>

                <Text style={styles.voiceHint}>
                  {data.voiceNoteDuration ? "AUDIO CAPTURED" : "TAP TO RECORD"}
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
