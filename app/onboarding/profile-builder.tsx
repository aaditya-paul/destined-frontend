import CTA_BTN from "@/components/ui/Cta_btn";
import DecorativeStripes from "@/components/ui/DecorativeStripes";
import ImageUpload from "@/components/ui/ImageUpload";
import ProgressBar from "@/components/ui/ProgressBar";
import {
  colors,
  fontFamilies,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ProfileBuilderScreen = () => {
  const router = useRouter();
  const [images, setImages] = useState<(string | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const [error, setError] = useState("");

  const handleImageSelect = (uri: string, index: number) => {
    const newImages = [...images];
    newImages[index] = uri;
    setImages(newImages);
    setError("");
  };

  const validateForm = () => {
    const uploadedImages = images.filter((img) => img !== undefined);
    if (uploadedImages.length < 2) {
      setError("Please upload at least 2 photos");
      return false;
    }
    return true;
  };

  const handleComplete = () => {
    if (validateForm()) {
      Alert.alert(
        "Profile Complete!",
        "Your profile has been created successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              // TODO: Save data and navigate to main app
              console.log("Profile images:", images);
              router.replace("/");
            },
          },
        ]
      );
    }
  };

  const handleBack = () => {
    router.back();
  };

  const uploadedCount = images.filter((img) => img !== undefined).length;

  return (
    <View style={styles.container}>
      <DecorativeStripes position="top" />
      <DecorativeStripes position="bottom" />

      <ProgressBar totalSteps={3} currentStep={3} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Show your best self</Text>
          <Text style={styles.subtitle}>
            Upload 2-6 photos that represent you
          </Text>
          <Text style={styles.photoCount}>
            {uploadedCount}/6 photos uploaded
          </Text>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.photosGrid}>
          {/* Main photo - larger */}
          <View style={styles.mainPhotoContainer}>
            <ImageUpload
              imageUri={images[0]}
              onImageSelect={(uri) => handleImageSelect(uri, 0)}
              size={160}
              label="Main Photo"
            />
          </View>

          {/* Secondary photos - smaller grid */}
          <View style={styles.secondaryPhotosContainer}>
            {[1, 2, 3, 4, 5].map((index) => (
              <ImageUpload
                key={index}
                imageUri={images[index]}
                onImageSelect={(uri) => handleImageSelect(uri, index)}
                size={100}
              />
            ))}
          </View>
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>Photo Tips:</Text>
          <Text style={styles.tipText}>• Show your face clearly</Text>
          <Text style={styles.tipText}>• Include variety (close-ups, full body)</Text>
          <Text style={styles.tipText}>• Use recent photos</Text>
          <Text style={styles.tipText}>• Show your hobbies and interests</Text>
          <Text style={styles.tipText}>• Smile naturally!</Text>
        </View>

        <View style={styles.buttonContainer}>
          <CTA_BTN
            text="Complete Profile"
            onPress={handleComplete}
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
    </View>
  );
};

export default ProfileBuilderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    marginBottom: spacing.md,
  },
  photoCount: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: "600",
  },
  errorText: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.lg,
    fontWeight: "600",
  },
  photosGrid: {
    alignItems: "center",
    marginBottom: spacing["3xl"],
  },
  mainPhotoContainer: {
    marginBottom: spacing.xl,
  },
  secondaryPhotosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.md,
  },
  tips: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: 20,
    marginBottom: spacing["3xl"],
  },
  tipsTitle: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  tipText: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  backButton: {
    borderWidth: 2,
    borderColor: colors.secondary,
  },
});
