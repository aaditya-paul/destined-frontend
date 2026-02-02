import {
  borderRadius,
  colors,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface InterestChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

const InterestChip = ({
  label,
  selected = false,
  onPress,
}: InterestChipProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={handlePress}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default InterestChip;

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.white,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: fontSizes.sm,
    color: colors.secondary,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: colors.white,
    fontWeight: "600",
  },
});
