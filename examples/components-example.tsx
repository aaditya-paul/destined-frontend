// Example: Using all components together

import CTA_BTN from "@/components/ui/Cta_btn";
import DatePicker from "@/components/ui/DatePicker";
import Dropdown from "@/components/ui/Dropdown";
import ImageUpload from "@/components/ui/ImageUpload";
import InterestChip from "@/components/ui/InterestChip";
import ProgressBar from "@/components/ui/ProgressBar";
import TextInput from "@/components/ui/TextInput";
import { colors, spacing } from "@/constants/globalStyles";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ExampleScreen = () => {
  // Text Input Example
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  // Date Picker Example
  const [birthDate, setBirthDate] = useState(new Date());

  // Dropdown Example
  const [gender, setGender] = useState("");
  const genderOptions = ["Male", "Female", "Other"];

  // Interest Chips Example
  const [interests, setInterests] = useState<string[]>([]);
  const availableInterests = ["Music", "Travel", "Sports", "Reading"];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  // Image Upload Example
  const [profileImage, setProfileImage] = useState<string>();

  // Form Submission
  const handleSubmit = () => {
    if (!name) {
      setNameError("Name is required");
      return;
    }
    console.log({ name, birthDate, gender, interests, profileImage });
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <ProgressBar totalSteps={5} currentStep={3} />

      <ScrollView style={styles.scrollView}>
        {/* Text Input */}
        <TextInput
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          error={nameError}
        />

        {/* Date Picker */}
        <DatePicker
          label="Date of Birth"
          value={birthDate}
          onChange={setBirthDate}
        />

        {/* Dropdown */}
        <Dropdown
          label="Gender"
          value={gender}
          options={genderOptions}
          onChange={setGender}
          placeholder="Select gender"
        />

        {/* Image Upload */}
        <ImageUpload
          label="Profile Photo"
          imageUri={profileImage}
          onImageSelect={setProfileImage}
          size={150}
        />

        {/* Interest Chips */}
        <View style={styles.interestsContainer}>
          {availableInterests.map((interest) => (
            <InterestChip
              key={interest}
              label={interest}
              selected={interests.includes(interest)}
              onPress={() => toggleInterest(interest)}
            />
          ))}
        </View>

        {/* Submit Button */}
        <CTA_BTN
          text="Submit"
          onPress={handleSubmit}
          btnColor={colors.primary}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing["2xl"],
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.xl,
  },
});

export default ExampleScreen;
