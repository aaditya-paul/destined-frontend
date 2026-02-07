import CTA_BTN from "@/components/ui/Cta_btn";
import DatePicker from "@/components/ui/DatePicker";
import Dropdown from "@/components/ui/Dropdown";
import { EditorialHeader } from "@/components/ui/EditorialComponents";
import ProgressBar from "@/components/ui/ProgressBar";
import TextInput from "@/components/ui/TextInput";
import {
  DATING_PREFERENCE_OPTIONS,
  FEET_OPTIONS,
  GENDER_OPTIONS,
  INCHES_OPTIONS,
  LOOKING_FOR_OPTIONS,
} from "@/constants/data";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { MICROCOPY } from "@/constants/microcopies";
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

  const CONSTANTS = MICROCOPY.onboarding.basicIdentity;

  // Parse existing height or default to empty
  const parseHeight = (heightStr: string) => {
    const match = heightStr.match(/(\d+)'(\d+)"/);
    if (match) {
      return { feet: match[1], inches: match[2] };
    }
    return { feet: "", inches: "" };
  };

  const [heightFeet, setHeightFeet] = useState(
    parseHeight(data.height).feet || "0",
  );
  const [heightInches, setHeightInches] = useState(
    parseHeight(data.height).inches || "0",
  );

  const updateHeight = (feet: string, inches: string) => {
    if (feet && inches) {
      updateData({ height: `${feet}'${inches}"` });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.firstName.trim()) newErrors.firstName = "FIRST NAME REQUIRED";
    if (!data.lastName.trim()) newErrors.lastName = "LAST NAME REQUIRED";

    const age = new Date().getFullYear() - data.dateOfBirth.getFullYear();
    if (age < 18) newErrors.dateOfBirth = "MINIMUM AGE IS 18";

    if (!data.gender) newErrors.gender = "SELECT YOUR GENDER";
    if (!data.lookingFor) newErrors.lookingFor = "SELECT PREFERENCE";
    if (!data.datingPreference)
      newErrors.datingPreference = "SELECT DATING PREFERENCE";

    // New fields validation (optional but good to have basic check)
    if (!data.location.trim()) newErrors.location = "LOCATION REQUIRED";
    if (!data.height.trim()) newErrors.height = "HEIGHT REQUIRED";
    if (!data.jobTitle.trim()) newErrors.jobTitle = "JOB TITLE REQUIRED";
    if (!data.school.trim()) newErrors.school = "SCHOOL/College REQUIRED";

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
          {/* Identification Block */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              {CONSTANTS.sections.identification}
            </Text>
            <View style={styles.formGroup}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <TextInput
                    label={CONSTANTS.fields.firstName.label}
                    placeholder={CONSTANTS.fields.firstName.placeholder}
                    value={data.firstName}
                    onChangeText={(text) => updateData({ firstName: text })}
                    error={errors.firstName}
                    autoCapitalize="words"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    label={CONSTANTS.fields.lastName.label}
                    placeholder={CONSTANTS.fields.lastName.placeholder}
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
            <Text style={styles.sectionLabel}>{CONSTANTS.sections.vitals}</Text>
            <View style={styles.formGroup}>
              <DatePicker
                label={CONSTANTS.fields.dob.label}
                value={data.dateOfBirth}
                onChange={(date) => updateData({ dateOfBirth: date })}
                error={errors.dateOfBirth}
              />

              <Dropdown
                label={CONSTANTS.fields.gender.label}
                value={data.gender}
                options={GENDER_OPTIONS}
                onChange={(value) => updateData({ gender: value as any })}
                placeholder={CONSTANTS.fields.gender.placeholder}
                error={errors.gender}
              />

              <View style={styles.heightRow}>
                <View style={{ flex: 1 }}>
                  <Dropdown
                    label={`${CONSTANTS.fields.height.label} (${CONSTANTS.fields.heightFt.label})`}
                    value={heightFeet}
                    options={FEET_OPTIONS}
                    onChange={(value) => {
                      setHeightFeet(value);
                      updateHeight(value, heightInches);
                    }}
                    placeholder="0"
                    error={errors.height}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Dropdown
                    label={`${CONSTANTS.fields.height.label} (${CONSTANTS.fields.heightIn.label})`}
                    value={heightInches}
                    options={INCHES_OPTIONS}
                    onChange={(value) => {
                      setHeightInches(value);
                      updateHeight(heightFeet, value);
                    }}
                    placeholder="0"
                  />
                </View>
              </View>

              <View style={{ zIndex: 999 }}>
                {/* Dropdown container z-index fix if needed */}
              </View>

              <Dropdown
                label={CONSTANTS.fields.lookingFor.label}
                value={data.lookingFor}
                options={LOOKING_FOR_OPTIONS}
                onChange={(value) => updateData({ lookingFor: value as any })}
                placeholder={CONSTANTS.fields.lookingFor.placeholder}
                error={errors.lookingFor}
              />

              <Dropdown
                label={CONSTANTS.fields.datingPref.label}
                value={data.datingPreference}
                options={DATING_PREFERENCE_OPTIONS}
                onChange={(value) =>
                  updateData({ datingPreference: value as any })
                }
                placeholder={CONSTANTS.fields.datingPref.placeholder}
                error={errors.datingPreference}
              />
            </View>
          </View>

          {/* Background Block */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              {CONSTANTS.sections.background}
            </Text>
            <View style={styles.formGroup}>
              <TextInput
                label={CONSTANTS.fields.location.label}
                placeholder={CONSTANTS.fields.location.placeholder}
                value={data.location}
                onChangeText={(text) => updateData({ location: text })}
                error={errors.location}
                autoCapitalize="words"
              />
              <TextInput
                label={CONSTANTS.fields.job.label}
                placeholder={CONSTANTS.fields.job.placeholder}
                value={data.jobTitle}
                onChangeText={(text) => updateData({ jobTitle: text })}
                error={errors.jobTitle}
                autoCapitalize="words"
              />
              <TextInput
                label={CONSTANTS.fields.school.label}
                placeholder={CONSTANTS.fields.school.placeholder}
                value={data.school}
                onChangeText={(text) => updateData({ school: text })}
                error={errors.school}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CTA_BTN
              text={CONSTANTS.nextBtn}
              onPress={handleContinue}
              btnColor={colors.primary}
            />
            <Text style={styles.infoText}>{CONSTANTS.ageNote}</Text>
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
  heightRow: {
    flexDirection: "row",
    gap: spacing.sm,
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
