import React from "react";
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from "react-native";
import {
  borderRadius,
  colors,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: object;
}

const TextInput = ({
  label,
  error,
  containerStyle,
  ...props
}: CustomTextInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSizes.sm,
    color: colors.secondary,
    marginBottom: spacing.sm,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    fontSize: fontSizes.base,
    color: colors.secondary,
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: colors.primary,
  },
  errorText: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
});
