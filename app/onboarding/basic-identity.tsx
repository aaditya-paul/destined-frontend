import CTA_BTN from "@/components/ui/Cta_btn";
import DatePicker from "@/components/ui/DatePicker";
import DecorativeStripes from "@/components/ui/DecorativeStripes";
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const age = new Date().getFullYear() - formData.dateOfBirth.getFullYear();
    if (age < 18) {
      newErrors.dateOfBirth = "You must be at least 18 years old";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.lookingFor) {
      newErrors.lookingFor = "Please select who you're looking for";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // TODO: Save data to state management or backend
      console.log("Form data:", formData);
      router.push("/onboarding/bio-interests");
    }
  };

  return (
    <View style={styles.container}>
      <DecorativeStripes position="top" />
      <DecorativeStripes position="bottom" />

      <ProgressBar totalSteps={3} currentStep={1} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Let&apos;s get to know you</Text>
            <Text style={styles.subtitle}>
              Tell us about yourself to create your profile
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              keyboardType="name-phone-pad"
              autoComplete="name-given"
              onChangeText={(text) =>
                setFormData({ ...formData, firstName: text })
              }
              error={errors.firstName}
              autoCapitalize="words"
            />

            <TextInput
              label="Last Name"
              keyboardType="name-phone-pad"
              autoComplete="name-family"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChangeText={(text) =>
                setFormData({ ...formData, lastName: text })
              }
              error={errors.lastName}
              autoCapitalize="words"
            />

            <DatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(date) =>
                setFormData({ ...formData, dateOfBirth: date })
              }
              error={errors.dateOfBirth}
            />

            <Dropdown
              label="Gender"
              value={formData.gender}
              options={genderOptions}
              onChange={(value) => setFormData({ ...formData, gender: value })}
              placeholder="Select your gender"
              error={errors.gender}
            />

            <Dropdown
              label="I'm looking for"
              value={formData.lookingFor}
              options={lookingForOptions}
              onChange={(value) =>
                setFormData({ ...formData, lookingFor: value })
              }
              placeholder="Select preference"
              error={errors.lookingFor}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CTA_BTN
              text="Continue"
              onPress={handleContinue}
              btnColor={colors.primary}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BasicIdentityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
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
  form: {
    width: "100%",
  },
  buttonContainer: {
    marginTop: spacing.xl,
  },
});
