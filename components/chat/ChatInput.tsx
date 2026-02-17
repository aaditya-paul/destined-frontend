import { colors, fontFamilies } from "@/constants/globalStyles";
import { ReplyRef } from "@/context/types";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { ReplyPreview } from "./ReplyPreview";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onCameraPress?: () => void;
  onImagePress?: () => void;
  replyRef?: ReplyRef | null;
  onCancelReply?: () => void;
}

export const ChatInput: React.FC<Props> = ({
  value,
  onChangeText,
  onSend,
  onCameraPress,
  onImagePress,
  replyRef,
  onCancelReply,
}) => {
  const [inputHeight, setInputHeight] = useState(40);
  const hasText = value.trim().length > 0;

  const handleSend = () => {
    if (!hasText) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSend();
  };

  return (
    <View style={styles.container}>
      {/* Reply preview bar */}
      {replyRef && onCancelReply && (
        <ReplyPreview replyRef={replyRef} onDismiss={onCancelReply} />
      )}
      <View style={styles.row}>
        {/* Camera */}
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconPressed,
          ]}
          onPress={onCameraPress}
          hitSlop={8}
        >
          <Ionicons
            name="camera-outline"
            size={24}
            color={colors.textSecondary}
          />
        </Pressable>

        {/* Gallery */}
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconPressed,
          ]}
          onPress={onImagePress}
          hitSlop={8}
        >
          <Ionicons
            name="image-outline"
            size={22}
            color={colors.textSecondary}
          />
        </Pressable>

        {/* Text Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              { height: Math.max(40, Math.min(inputHeight, 100)) },
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            multiline
            onContentSizeChange={(e) =>
              setInputHeight(e.nativeEvent.contentSize.height)
            }
          />
        </View>

        {/* Send / Mic */}
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            hasText ? styles.sendActive : styles.sendInactive,
            pressed && hasText && styles.sendPressed,
          ]}
          onPress={hasText ? handleSend : undefined}
          disabled={!hasText}
        >
          <Ionicons
            name={hasText ? "arrow-up" : "mic"}
            size={hasText ? 20 : 22}
            color={hasText ? colors.white : colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "ios" ? 28 : 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingTop: 8,
    gap: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconPressed: {
    opacity: 0.5,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 22,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  input: {
    fontSize: 15,
    fontFamily: fontFamilies.primary.regular,
    color: colors.text,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendInactive: {
    backgroundColor: "transparent",
  },
  sendPressed: {
    transform: [{ scale: 0.92 }],
  },
});
