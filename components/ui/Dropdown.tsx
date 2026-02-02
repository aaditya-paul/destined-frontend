import {
  borderRadius,
  colors,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface DropdownProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  containerStyle?: object;
}

const Dropdown = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  error,
  containerStyle,
}: DropdownProps) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.dropdown, error && styles.dropdownError]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              {options.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.option,
                    option === value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      option === value && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Dropdown;

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
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderWidth: 2,
    borderColor: "transparent",
  },
  dropdownError: {
    borderColor: colors.primary,
  },
  dropdownText: {
    fontSize: fontSizes.base,
    color: colors.secondary,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    width: "80%",
    maxHeight: "60%",
    overflow: "hidden",
  },
  option: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedOption: {
    backgroundColor: colors.primarySemiTransparent,
  },
  optionText: {
    fontSize: fontSizes.base,
    color: colors.secondary,
  },
  selectedOptionText: {
    color: colors.white,
    fontWeight: "600",
  },
});
