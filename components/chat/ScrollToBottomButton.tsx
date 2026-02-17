import { colors } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  visible: boolean;
  onPress: () => void;
  unreadBelow?: number;
}

export const ScrollToBottomButton: React.FC<Props> = ({
  visible,
  onPress,
  unreadBelow = 0,
}) => {
  if (!visible) return null;

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name="chevron-down" size={20} color={colors.text} />
      {unreadBelow > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {unreadBelow > 9 ? "9+" : unreadBelow}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 16,
    bottom: 80,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.8,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -4,
    backgroundColor: colors.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
  },
});
