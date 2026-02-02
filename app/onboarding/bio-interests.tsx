import CTA_BTN from "@/components/ui/Cta_btn";
import DecorativeStripes from "@/components/ui/DecorativeStripes";
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

    if (!bio.trim()) {
      newErrors.bio = "Please write something about yourself";
    } else if (bio.trim().length < 20) {
      newErrors.bio = "Bio should be at least 20 characters";
    }

    if (selectedInterests.length < 3) {
      newErrors.interests = "Please select at least 3 interests";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // TODO: Save data to state management or backend
      console.log("Bio:", bio);
      console.log("Interests:", selectedInterests);
      router.push("/onboarding/profile-builder");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <DecorativeStripes position="top" />
      <DecorativeStripes position="bottom" />

      <ProgressBar totalSteps={3} currentStep={2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Tell your story</Text>
            <Text style={styles.subtitle}>
              Share what makes you unique and what you love
            </Text>
          </View>

          <View style={styles.section}>
            <TextInput
              label="About Me"
              placeholder="Write a few lines about yourself..."
              value={bio}
              onChangeText={setBio}
              error={errors.bio}
              multiline
              numberOfLines={6}
              style={styles.bioInput}
              maxLength={500}
            />
            <Text style={styles.charCount}>{bio.length}/500</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Interests</Text>
            <Text style={styles.sectionSubtitle}>
              Select 3-10 interests ({selectedInterests.length} selected)
            </Text>
            {errors.interests && (
              <Text style={styles.errorText}>{errors.interests}</Text>
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
              text="Continue"
              onPress={handleContinue}
              btnColor={colors.primary}
            />
            <CTA_BTN
              text="Back"
              onPress={handleBack}
              btnColor={colors.white}
              txtColor={colors.secondary}
              style={styles.backButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BioInterestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing["2xl"],
    paddingBottom: spacing["3xl"],
  },
  header: {
    alignItems: "center",
    marginBottom: spacing["3xl"],
  },
  title: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    textAlign: "center",
  },
  section: {
    marginBottom: spacing["3xl"],
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  bioInput: {
    height: 120,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    textAlign: "right",
    marginTop: spacing.xs,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  errorText: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  buttonContainer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  backButton: {
    borderWidth: 2,
    borderColor: colors.secondary,
  },
});
