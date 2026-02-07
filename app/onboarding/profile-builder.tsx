import CTA_BTN from "@/components/ui/Cta_btn";
import { EditorialHeader } from "@/components/ui/EditorialComponents";
import ImageUpload from "@/components/ui/ImageUpload";
import ProgressBar from "@/components/ui/ProgressBar";
import PromptModal from "@/components/ui/PromptModal";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { MICROCOPY } from "@/constants/microcopies";
import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const GRID_SPACING = spacing.md;
const COLUMN_WIDTH = (width - spacing["2xl"] * 2 - GRID_SPACING * 2) / 3;

const ProfileBuilderScreen = () => {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const [error, setError] = useState("");
  const [isPromptModalVisible, setIsPromptModalVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const CONSTANTS = MICROCOPY.onboarding.profileBuilder;

  const handleImageSelect = (uris: string[], startIndex: number) => {
    const newImages = [...data.images];
    uris.forEach((uri, i) => {
      const index = startIndex + i;
      if (index < 6) {
        // Keep existing prompt if replacing image? Or reset? Let's keep object structure but maybe reset prompt?
        // User probably expects a fresh start for a new image.
        newImages[index] = { uri, prompt: undefined };
      }
    });
    updateData({ images: newImages });
    setError("");
  };

  const openPromptModal = (index: number) => {
    setActiveImageIndex(index);
    setIsPromptModalVisible(true);
  };

  const handlePromptSelect = (prompt: string) => {
    if (activeImageIndex !== null) {
      const newImages = [...data.images];
      const currentImage = newImages[activeImageIndex];
      if (currentImage) {
        newImages[activeImageIndex] = { ...currentImage, prompt };
        updateData({ images: newImages });
      }
      setIsPromptModalVisible(false);
      setActiveImageIndex(null);
    }
  };

  const validateForm = () => {
    const uploadedImages = data.images.filter((img) => img !== undefined);
    if (uploadedImages.length < 2) {
      setError(CONSTANTS.error);
      return false;
    }
    return true;
  };

  const handleComplete = () => {
    if (validateForm()) {
      router.replace("/(tabs)/home");
    }
  };

  const uploadedCount = data.images.filter((img) => img !== undefined).length;

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <ProgressBar totalSteps={3} currentStep={3} />
        <View style={styles.headerSpacer} />
        <EditorialHeader
          title={CONSTANTS.title}
          subtitle={CONSTANTS.subtitle}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {/* Main Large Photo */}
          <View style={styles.mainSlot}>
            <ImageUpload
              imageUri={data.images[0]?.uri}
              onImageSelect={(uris) => handleImageSelect(uris, 0)}
              size={COLUMN_WIDTH * 2 + GRID_SPACING}
              label="Primary"
            />
          </View>

          {/* Secondary Slots */}
          <View style={styles.sideColumn}>
            {[1, 2].map((i) => (
              <ImageUpload
                key={i}
                imageUri={data.images[i]?.uri}
                onImageSelect={(uris) => handleImageSelect(uris, i)}
                size={COLUMN_WIDTH}
                selectPrompt={() => openPromptModal(i)}
                prompt={data.images[i]?.prompt}
              />
            ))}
          </View>

          {/* Bottom Row */}
          <View style={styles.bottomRow}>
            {[3, 4, 5].map((i) => (
              <ImageUpload
                key={i}
                imageUri={data.images[i]?.uri}
                onImageSelect={(uris) => handleImageSelect(uris, i)}
                size={COLUMN_WIDTH}
                selectPrompt={() => openPromptModal(i)}
                prompt={data.images[i]?.prompt}
              />
            ))}
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.statusRow}>
          <View style={styles.tapeTag}>
            <Text style={styles.tapeText}>
              {uploadedCount}/6 {CONSTANTS.uploaded}
            </Text>
          </View>
        </View>

        <View style={styles.guideContainer}>
          <Text style={styles.guideTitle}>{CONSTANTS.guide.title}</Text>
          <View style={styles.guideGrid}>
            {CONSTANTS.guide.items.map((item, index) => (
              <Text key={index} style={styles.guideItem}>
                • {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CTA_BTN
            text={CONSTANTS.finishBtn}
            onPress={handleComplete}
            btnColor={colors.primary}
          />
          <Text style={styles.backLink} onPress={() => router.back()}>
            {CONSTANTS.backBtn}
          </Text>
        </View>
      </ScrollView>

      {/* <DecorativeStripes position="bottom" /> */}

      <PromptModal
        visible={isPromptModalVisible}
        onClose={() => setIsPromptModalVisible(false)}
        onSelect={handlePromptSelect}
        currentPrompt={
          activeImageIndex !== null
            ? data.images[activeImageIndex]?.prompt
            : undefined
        }
      />
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
  scrollContent: {
    paddingHorizontal: spacing["2xl"],
    paddingBottom: 100,
    paddingTop: spacing.lg,
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

  // Custom Badge Style (Tape)
  tapeTag: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    transform: [{ rotate: "-2deg" }],
  },
  tapeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: fontFamilies.bold,
    letterSpacing: 2,
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
