import {
  borderRadius,
  colors,
  fontFamilies,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ComplimentModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  profileName: string;
  cardContext?: React.ReactNode;
}

const ComplimentModal = ({
  visible,
  onClose,
  onSend,
  profileName,
  cardContext,
}: ComplimentModalProps) => {
  const [message, setMessage] = useState("");
  const maxLength = 300;

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
      onClose();
    }
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}
        style={styles.modalOverlay}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="heart" size={24} color={colors.primary} />
              <Text style={styles.title}>Say something nice</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View>
              <Text style={styles.subtitle}>
                Stand out with a thoughtful first message to
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color: colors.primary,
                      fontFamily: fontFamilies.variable,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {" "}
                  {profileName}
                </Text>
                .
              </Text>
            </View>

            {/* Card Context Preview */}
            {cardContext && (
              <View style={styles.cardContextContainer}>
                <View style={styles.cardContextHeader}>
                  <Ionicons
                    name="arrow-undo"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.cardContextLabel}>Replying to</Text>
                </View>
                <View style={styles.cardContextPreview}>{cardContext}</View>
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Write your message here..."
                placeholderTextColor={colors.textSecondary}
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={maxLength}
                autoFocus
                textAlignVertical="top"
              />
              <View style={styles.characterCount}>
                <Text style={styles.characterCountText}>
                  {message.length}/{maxLength}
                </Text>
              </View>
            </View>

            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Quick starters:</Text>
              <View style={styles.suggestionChips}>
                {[
                  "Love your taste in...",
                  "Your bio made me smile",
                  "We should talk about...",
                ].map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionChip}
                    onPress={() => setMessage(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.sendButton,
                !message.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!message.trim()}
            >
              <Text
                style={[
                  styles.sendButtonText,
                  !message.trim() && styles.sendButtonTextDisabled,
                ]}
              >
                Send Like
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ComplimentModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0,0,0,0.45)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    maxHeight: "85%",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.text,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.variable,
    fontWeight: "500",
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  textInput: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.primary.regular,
    color: colors.text,
    minHeight: 120,
    maxHeight: 200,
  },
  characterCount: {
    alignItems: "flex-end",
    marginTop: spacing.xs,
  },
  characterCountText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.primary.regular,
    color: colors.textSecondary,
  },
  cardContextContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  cardContextHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  cardContextLabel: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.primary.medium,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardContextPreview: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    opacity: 0.85,
    transform: [{ scale: 0.92 }],
  },
  suggestionsContainer: {
    marginBottom: spacing.lg,
  },
  suggestionsTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.primary.medium,
    color: colors.secondary,
    marginBottom: spacing.sm,
    fontWeight: "700",
  },
  suggestionChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  suggestionChip: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.primary.regular,
    color: colors.secondarySemiTransparemt,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  sendButtonText: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.primary.bold,
    color: colors.white,
  },
  sendButtonTextDisabled: {
    color: colors.textSecondary,
  },
});
