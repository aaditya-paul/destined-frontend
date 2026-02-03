import CTA_BTN from "@/components/ui/Cta_btn";
import DatePicker from "@/components/ui/DatePicker";
import Dropdown from "@/components/ui/Dropdown";
import { EditorialHeader } from "@/components/ui/EditorialComponents";
import ProgressBar from "@/components/ui/ProgressBar";
import TextInput from "@/components/ui/TextInput";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { useOnboarding } from "@/context/OnboardingContext";
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

const BasicIdentityScreen = () => {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const genderOptions = ["Man", "Woman", "Non-binary", "Prefer not to say"];
  const lookingForOptions = ["Men", "Women", "Everyone"];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.firstName.trim()) newErrors.firstName = "FIRST NAME REQUIRED";
    if (!data.lastName.trim()) newErrors.lastName = "LAST NAME REQUIRED";

    const age = new Date().getFullYear() - data.dateOfBirth.getFullYear();
    if (age < 18) newErrors.dateOfBirth = "MINIMUM AGE IS 18";

    if (!data.gender) newErrors.gender = "SELECT YOUR GENDER";
    if (!data.lookingFor) newErrors.lookingFor = "SELECT PREFERENCE";

    // New fields validation (optional but good to have basic check)
    if (!data.location.trim()) newErrors.location = "LOCATION REQUIRED";
    if (!data.height.trim()) newErrors.height = "HEIGHT REQUIRED";
    if (!data.jobTitle.trim()) newErrors.jobTitle = "JOB TITLE REQUIRED";
    if (!data.school.trim()) newErrors.school = "SCHOOL/ALMA MATER REQUIRED";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push("/onboarding/bio-interests");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <ProgressBar totalSteps={3} currentStep={1} />
        <View style={styles.headerSpacer} />
        <EditorialHeader
          title="THE_FOUNDATION"
          subtitle="Initialize your profile parameters."
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
          {/* Identification Block */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>IDENTIFICATION</Text>
            <View style={styles.formGroup}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <TextInput
                    label="FIRST NAME"
                    placeholder="E.g. John"
                    value={data.firstName}
                    onChangeText={(text) => updateData({ firstName: text })}
                    error={errors.firstName}
                    autoCapitalize="words"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    label="LAST NAME"
                    placeholder="E.g. Doe"
                    value={data.lastName}
                    onChangeText={(text) => updateData({ lastName: text })}
                    error={errors.lastName}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Vitals Block */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>VITALS & SPECS</Text>
            <View style={styles.formGroup}>
              <DatePicker
                label="DATE OF BIRTH"
                value={data.dateOfBirth}
                onChange={(date) => updateData({ dateOfBirth: date })}
                error={errors.dateOfBirth}
              />

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Dropdown
                    label="GENDER"
                    value={data.gender}
                    options={genderOptions}
                    onChange={(value) => updateData({ gender: value as any })}
                    placeholder="Select"
                    error={errors.gender}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    label="HEIGHT"
                    placeholder="E.g. 6'1" // Keeping it text for now for simplicity
                    value={data.height}
                    onChangeText={(text) => updateData({ height: text })}
                    error={errors.height}
                  />
                </View>
              </View>

              <View style={{ zIndex: 999 }}>
                {/* Dropdown container z-index fix if needed */}
              </View>

              <Dropdown
                label="INTERESTED IN"
                value={data.lookingFor}
                options={lookingForOptions}
                onChange={(value) => updateData({ lookingFor: value as any })}
                placeholder="Select preference"
                error={errors.lookingFor}
              />
            </View>
          </View>

          {/* Background Block */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>BACKGROUND</Text>
            <View style={styles.formGroup}>
              <TextInput
                label="CURRENT LOCATION"
                placeholder="City, Country"
                value={data.location}
                onChangeText={(text) => updateData({ location: text })}
                error={errors.location}
                autoCapitalize="words"
              />
              <TextInput
                label="JOB TITLE"
                placeholder="E.g. Architect"
                value={data.jobTitle}
                onChangeText={(text) => updateData({ jobTitle: text })}
                error={errors.jobTitle}
                autoCapitalize="words"
              />
              <TextInput
                label="DEGREE / SCHOOL"
                placeholder="E.g. IIT Tech"
                value={data.school}
                onChangeText={(text) => updateData({ school: text })}
                error={errors.school}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CTA_BTN
              text="INITIALIZE PROFILE"
              onPress={handleContinue}
              btnColor={colors.primary}
            />
            <Text style={styles.infoText}>
              You must be at least 18 to join this community.
            </Text>
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
  sectionLabel: {
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 2.5,
    marginBottom: spacing.lg,
    opacity: 0.6,
  },
  formGroup: {
    gap: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  buttonContainer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  infoText: {
    textAlign: "center",
    fontSize: 10,
    color: colors.textSecondary,
    fontFamily: fontFamilies.bold,
    letterSpacing: 0.5,
    opacity: 0.7,
  },
});

export default BasicIdentityScreen;
