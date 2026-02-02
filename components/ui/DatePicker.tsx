import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  borderRadius,
  colors,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";

interface DatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
  containerStyle?: object;
}

const DatePicker = ({
  label,
  value,
  onChange,
  error,
  containerStyle,
}: DatePickerProps) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.dateButton, error && styles.dateButtonError]}
        onPress={() => setShow(true)}
      >
        <Text style={styles.dateText}>{formatDate(value)}</Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {show && Platform.OS === "ios" && (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setShow(false)}>
                  <Text style={styles.doneButton}>Done</Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={value}
                mode="date"
                display="spinner"
                onChange={handleChange}
                maximumDate={new Date()}
              />
            </View>
          </View>
        </Modal>
      )}

      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

export default DatePicker;

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
  dateButton: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderWidth: 2,
    borderColor: "transparent",
  },
  dateButtonError: {
    borderColor: colors.primary,
  },
  dateText: {
    fontSize: fontSizes.base,
    color: colors.secondary,
  },
  errorText: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    paddingBottom: spacing["3xl"],
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  doneButton: {
    fontSize: fontSizes.base,
    color: colors.primary,
    fontWeight: "600",
  },
});
