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
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const GRID_SPACING = spacing.md;
const COLUMN_WIDTH = (width - spacing["2xl"] * 2 - GRID_SPACING * 2) / 3;

const ProfileBuilderScreen = () => {
  const router = useRouter();
  const [images, setImages] = useState<(string | undefined)[]>(
    new Array(6).fill(undefined),
  );
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
      setError("Add at least 2 photos to stand out.");
      return false;
    }
    return true;
  };

  const handleComplete = () => {
    if (validateForm()) {
      Alert.alert("Profile Locked", "Your journey begins now.", [
        {
          text: "Enter App",
          onPress: () => {
            console.log("Profile images:", images);
            router.replace("/");
          },
        },
      ]);
    }
  };

  const uploadedCount = images.filter((img) => img !== undefined).length;

  return (
    <View style={styles.container}>
      <DecorativeStripes position="top" />

      <View style={styles.topNav}>
        <ProgressBar totalSteps={3} currentStep={3} />
        <View style={styles.header}>
          <Text style={styles.title}>Visual Identity</Text>
          <Text style={styles.subtitle}>
            Select 2-6 photos to define your presence.
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {/* Main Large Photo */}
          <View style={styles.mainSlot}>
            <ImageUpload
              imageUri={images[0]}
              onImageSelect={(uri) => handleImageSelect(uri, 0)}
              size={COLUMN_WIDTH * 2 + GRID_SPACING}
              label="Primary"
            />
          </View>

          {/* Secondary Slots */}
          <View style={styles.sideColumn}>
            {[1, 2].map((i) => (
              <ImageUpload
                key={i}
                imageUri={images[i]}
                onImageSelect={(uri) => handleImageSelect(uri, i)}
                size={COLUMN_WIDTH}
              />
            ))}
          </View>

          {/* Bottom Row */}
          <View style={styles.bottomRow}>
            {[3, 4, 5].map((i) => (
              <ImageUpload
                key={i}
                imageUri={images[i]}
                onImageSelect={(uri) => handleImageSelect(uri, i)}
                size={COLUMN_WIDTH}
              />
            ))}
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.statusRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{uploadedCount}/6 SLOTS FILLED</Text>
          </View>
        </View>

        <View style={styles.guideContainer}>
          <Text style={styles.guideTitle}>THE BLUEPRINT</Text>
          <View style={styles.guideGrid}>
            <Text style={styles.guideItem}>• High Clarity</Text>
            <Text style={styles.guideItem}>• Solo Shots</Text>
            <Text style={styles.guideItem}>• Natural Light</Text>
            <Text style={styles.guideItem}>• Recent</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CTA_BTN
            text="FINALIZE PROFILE"
            onPress={handleComplete}
            btnColor={colors.primary}
          />
          <Text style={styles.backLink} onPress={() => router.back()}>
            GO BACK
          </Text>
        </View>
      </ScrollView>

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
    marginBottom: spacing.md,
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
  scrollContent: {
    paddingHorizontal: spacing["2xl"],
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_SPACING,
    marginTop: spacing.md,
  },
  mainSlot: {
    width: COLUMN_WIDTH * 2 + GRID_SPACING,
    height: COLUMN_WIDTH * 2 + GRID_SPACING,
  },
  sideColumn: {
    gap: GRID_SPACING,
  },
  bottomRow: {
    flexDirection: "row",
    gap: GRID_SPACING,
    marginTop: 0,
  },
  statusRow: {
    alignItems: "center",
    marginVertical: spacing.xl,
  },
  badge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    letterSpacing: 1,
  },
  guideContainer: {
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
    paddingTop: spacing.lg,
    marginBottom: spacing["2xl"],
  },
  guideTitle: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  guideGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  guideItem: {
    fontSize: 13,
    color: colors.textSecondary,
    width: "45%",
  },
  errorText: {
    color: colors.primary,
    textAlign: "center",
    fontFamily: fontFamilies.bold,
    marginTop: spacing.md,
  },
  buttonContainer: {
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

export default ProfileBuilderScreen;
