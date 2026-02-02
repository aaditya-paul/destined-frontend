import { colors, spacing } from "@/constants/globalStyles";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressBar = ({ totalSteps, currentStep }: ProgressBarProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[styles.step, index < currentStep && styles.stepActive]}
        />
      ))}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing["2xl"],
    paddingVertical: spacing.xl,
  },
  step: {
    flex: 1,
    height: 4,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  stepActive: {
    backgroundColor: colors.primary,
  },
});
