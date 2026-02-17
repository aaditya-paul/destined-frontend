import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  name: string;
  imageUri: string;
  isOnline?: boolean;
  statusText?: string;
  onBack: () => void;
  onProfilePress: () => void;
  onMorePress: () => void;
}

export const ChatHeader: React.FC<Props> = ({
  name,
  imageUri,
  isOnline,
  statusText,
  onBack,
  onProfilePress,
  onMorePress,
}) => (
  <>
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        hitSlop={10}
      >
        <Ionicons name="chevron-back" size={26} color={colors.secondary} />
      </Pressable>

      <Pressable
        onPress={onProfilePress}
        style={({ pressed }) => [styles.profile, pressed && styles.pressed]}
      >
        <View style={styles.avatarWrap}>
          <Image source={{ uri: imageUri }} style={styles.avatar} />
          {isOnline && <View style={styles.onlineDot} />}
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          {statusText ? <Text style={styles.status}>{statusText}</Text> : null}
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
          hitSlop={8}
        >
          <Ionicons
            name="videocam-outline"
            size={22}
            color={colors.secondary}
          />
        </Pressable>
        <Pressable
          onPress={onMorePress}
          style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
          hitSlop={8}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={colors.secondary}
          />
        </Pressable>
      </View>
    </View>
    <View style={styles.divider} />
  </>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  backBtn: {
    padding: spacing.sm,
  },
  pressed: {
    opacity: 0.6,
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 4,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#34C759",
    borderWidth: 2,
    borderColor: colors.background,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: fontFamilies.bold,
    fontSize: 17,
    color: colors.secondary,
  },
  status: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  actionBtn: {
    padding: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
