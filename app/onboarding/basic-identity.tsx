import CTA_BTN from "@/components/ui/Cta_btn";
import DatePicker from "@/components/ui/DatePicker";
import Dropdown from "@/components/ui/Dropdown";
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

const BasicIdentityScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(2000, 0, 1),
    gender: "",
    lookingFor: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const genderOptions = ["Man", "Woman", "Non-binary", "Prefer not to say"];
  const lookingForOptions = ["Men", "Women", "Everyone"];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "FIRST NAME REQUIRED";
    if (!formData.lastName.trim()) newErrors.lastName = "LAST NAME REQUIRED";

    const age = new Date().getFullYear() - formData.dateOfBirth.getFullYear();
    if (age < 18) newErrors.dateOfBirth = "MINIMUM AGE IS 18";

    if (!formData.gender) newErrors.gender = "SELECT YOUR GENDER";
    if (!formData.lookingFor) newErrors.lookingFor = "SELECT PREFERENCE";

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
      {/* <DecorativeStripes position="top" /> */}

      <View style={styles.topNav}>
        <ProgressBar totalSteps={3} currentStep={1} />
        <View style={styles.header}>
          <Text style={styles.title}>The Foundation</Text>
          <Text style={styles.subtitle}>
            Enter your core details to initialize your profile.
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
          {/* Identification Block */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>IDENTIFICATION</Text>
            <View style={styles.formGroup}>
              <TextInput
                label="FIRST NAME"
                placeholder="John"
                value={formData.firstName}
                onChangeText={(text) =>
                  setFormData({ ...formData, firstName: text })
                }
                error={errors.firstName}
                autoCapitalize="words"
                // labelStyle={styles.inputLabel}
              />
              <TextInput
                label="LAST NAME"
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData({ ...formData, lastName: text })
                }
                error={errors.lastName}
                autoCapitalize="words"
                // labelStyle={styles.inputLabel}
              />
            </View>
          </View>

          {/* Vital Stats Block */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>VITAL STATS</Text>
            <View style={styles.formGroup}>
              <DatePicker
                label="DATE OF BIRTH"
                value={formData.dateOfBirth}
                onChange={(date) =>
                  setFormData({ ...formData, dateOfBirth: date })
                }
                error={errors.dateOfBirth}
              />

              <View style={styles.dropdownRow}>
                <View style={{ flex: 1 }}>
                  <Dropdown
                    label="YOUR GENDER"
                    value={formData.gender}
                    options={genderOptions}
                    onChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                    placeholder="Select"
                    error={errors.gender}
                  />
                </View>
              </View>

              <Dropdown
                label="INTERESTED IN"
                value={formData.lookingFor}
                options={lookingForOptions}
                onChange={(value) =>
                  setFormData({ ...formData, lookingFor: value })
                }
                placeholder="Select preference"
                error={errors.lookingFor}
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
    gap: spacing.xs,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    letterSpacing: 1,
  },
  dropdownRow: {
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
