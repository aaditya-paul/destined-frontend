import { colors } from "@/constants/globalStyles";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const REACTIONS = ["❤️", "😂", "😮", "😢", "🙏", "👍"];

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
}

/**
 * A small floating reaction picker that appears on long-press → React.
 */
export const EmojiReactionPicker: React.FC<Props> = ({
  visible,
  onClose,
  onSelect,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.pill}>
        {REACTIONS.map((emoji) => (
          <Pressable
            key={emoji}
            style={({ pressed }) => [
              styles.emojiBtn,
              pressed && styles.emojiBtnPressed,
            ]}
            onPress={() => {
              onSelect(emoji);
              onClose();
            }}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </Pressable>
        ))}
      </View>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 28,
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  emojiBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiBtnPressed: {
    backgroundColor: colors.background,
    transform: [{ scale: 1.2 }],
  },
  emoji: {
    fontSize: 24,
  },
});
