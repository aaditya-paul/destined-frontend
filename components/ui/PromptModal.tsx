import {
  colors,
  fontFamilies,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import { PROFILE_PROMPTS } from "@/constants/profilePrompts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PromptModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (prompt: string) => void;
  currentPrompt?: string;
}

const PromptModal = ({
  visible,
  onClose,
  onSelect,
  currentPrompt,
}: PromptModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Pick a Prompt</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={colors.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {PROFILE_PROMPTS.map((prompt, index) => {
              const isSelected = currentPrompt === prompt;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.promptItem, isSelected && styles.selectedItem]}
                  onPress={() => onSelect(prompt)}
                >
                  <Text
                    style={[
                      styles.promptText,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {prompt}
                  </Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default PromptModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "80%", // Take up 80% of screen
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
  },
  closeBtn: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    paddingBottom: 40,
  },
  promptItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  selectedItem: {
    backgroundColor: "rgba(255, 75, 75, 0.05)",
    marginHorizontal: -spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  promptText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.variable,
    color: colors.secondary,
    flex: 1,
    marginRight: 12,
  },
  selectedText: {
    color: colors.primary,
    fontFamily: fontFamilies.bold,
  },
});
