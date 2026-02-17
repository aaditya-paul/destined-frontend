import { colors, fontFamilies } from "@/constants/globalStyles";
import { ReplyRef } from "@/context/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  replyRef: ReplyRef;
  onDismiss: () => void;
}

/**
 * Banner shown above the chat input when the user is composing a reply.
 */
export const ReplyPreview: React.FC<Props> = ({ replyRef, onDismiss }) => (
  <View style={styles.container}>
    <View style={styles.accent} />
    <View style={styles.content}>
      <Text style={styles.name} numberOfLines={1}>
        {replyRef.senderName}
      </Text>
      <Text style={styles.text} numberOfLines={1}>
        {replyRef.text}
      </Text>
    </View>
    <Pressable
      onPress={onDismiss}
      hitSlop={10}
      style={({ pressed }) => [styles.close, pressed && { opacity: 0.5 }]}
    >
      <Ionicons name="close" size={20} color={colors.textSecondary} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  accent: {
    width: 3,
    height: "100%",
    minHeight: 36,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: colors.primary,
    marginBottom: 2,
  },
  text: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  close: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
