import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export interface ActionItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  actions: ActionItem[];
}

export const ChatActionSheet: React.FC<Props> = ({
  visible,
  onClose,
  title,
  actions,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <Pressable style={styles.overlay} onPress={onClose}>
      <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
        {/* Drag handle */}
        <View style={styles.handleRow}>
          <View style={styles.handle} />
        </View>

        {title && <Text style={styles.title}>{title}</Text>}

        {actions.map((action, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [
              styles.action,
              pressed && styles.actionPressed,
              i === actions.length - 1 && styles.lastAction,
            ]}
            onPress={() => {
              action.onPress();
              onClose();
            }}
          >
            <Ionicons
              name={action.icon}
              size={20}
              color={action.destructive ? "#FF3B30" : colors.text}
            />
            <Text
              style={[
                styles.actionLabel,
                action.destructive && styles.destructiveLabel,
              ]}
            >
              {action.label}
            </Text>
          </Pressable>
        ))}

        {/* Cancel */}
        <Pressable
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.actionPressed,
          ]}
          onPress={onClose}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    paddingHorizontal: spacing.xl,
  },
  handleRow: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  lastAction: {
    borderBottomWidth: 0,
  },
  actionPressed: {
    backgroundColor: colors.background,
    borderRadius: 10,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  actionLabel: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 16,
    color: colors.text,
  },
  destructiveLabel: {
    color: "#FF3B30",
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    color: colors.white,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  cancelText: {
    fontFamily: fontFamilies.primary.medium,
    fontSize: 16,
    color: colors.white,
  },
});
