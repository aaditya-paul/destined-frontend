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
}

const ComplimentModal = ({
  visible,
  onClose,
  onSend,
  profileName,
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
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          //   style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
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

          <Text style={styles.subtitle}>
            Stand out with a thoughtful first message to {profileName}
          </Text>

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
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    maxHeight: "85%",
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
    fontSize: fontSizes.xl,
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
    borderColor: colors.border,
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
  suggestionsContainer: {
    marginBottom: spacing.lg,
  },
  suggestionsTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.primary.medium,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  suggestionChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  suggestionChip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  suggestionText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.primary.regular,
    color: colors.text,
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
