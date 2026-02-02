import CTA_BTN from "@/components/ui/Cta_btn";
import InterestChip from "@/components/ui/InterestChip";
import ProgressBar from "@/components/ui/ProgressBar";
import TextInput from "@/components/ui/TextInput";
import {
  colors,
  fontFamilies,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const BioInterestsScreen = () => {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else if (selectedInterests.length < 10) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!bio.trim() || bio.trim().length < 20) {
      newErrors.bio = "YOUR STORY NEEDS MORE DETAIL (MIN 20 CHARS).";
    }
    if (selectedInterests.length < 3) {
      newErrors.interests = "SELECT AT LEAST 3 ATTRIBUTES.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push("/onboarding/profile-builder");
    }
  };

  return (
    <View style={styles.container}>
      {/* <DecorativeStripes position="top" /> */}

      <View style={styles.topNav}>
        <ProgressBar totalSteps={3} currentStep={2} />
        <View style={styles.header}>
          <Text style={styles.title}>The Narrative</Text>
          <Text style={styles.subtitle}>
            Define your character and what drives you.
          </Text>
        </View>
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
              <Text style={styles.label}>PERSONAL STATEMENT</Text>
              <Text
                style={[
                  styles.charCount,
                  bio.length > 450 && { color: colors.primary },
                ]}
              >
                {bio.length}/500
              </Text>
            </View>
            <TextInput
              placeholder="What makes you... you?"
              value={bio}
              onChangeText={setBio}
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
              <Text style={styles.label}>ATTRIBUTES & INTERESTS</Text>
              <Text style={styles.selectionCount}>
                {selectedInterests.length}/10
              </Text>
            </View>

            {errors.interests ? (
              <Text style={styles.errorText}>{errors.interests}</Text>
            ) : (
              <Text style={styles.sectionSubtitle}>
                Select 3-10 tags that resonate with you.
              </Text>
            )}

            <View style={styles.interestsContainer}>
              {availableInterests.map((interest) => (
                <InterestChip
                  key={interest}
                  label={interest}
                  selected={selectedInterests.includes(interest)}
                  onPress={() => toggleInterest(interest)}
                />
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CTA_BTN
              text="SAVE & CONTINUE"
              onPress={handleContinue}
              btnColor={colors.primary}
            />
            <Text style={styles.backLink} onPress={() => router.back()}>
              GO BACK
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <DecorativeStripes position="bottom" /> */}
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
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    letterSpacing: -0.5,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    opacity: 0.8,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing["2xl"],
    paddingBottom: 120,
    paddingTop: spacing.xl,
  },
  section: {
    marginBottom: spacing["3xl"],
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    letterSpacing: 1.5,
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
    lineHeight: 22,
  },
  charCount: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    fontStyle: "italic",
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
