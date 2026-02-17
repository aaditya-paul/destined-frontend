import { colors, fontFamilies } from "@/constants/globalStyles";
import { Message } from "@/context/types";
import { MessagePosition, formatMessageTime } from "@/utils/chatHelpers";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  message: Message;
  position: MessagePosition;
  showTimestamp: boolean;
  onLongPress?: (message: Message) => void;
  onReactionPress?: (message: Message, emoji: string) => void;
}

const RADIUS = 20;
const SMALL_RADIUS = 4;

export const MessageBubble: React.FC<Props> = ({
  message,
  position,
  showTimestamp,
  onLongPress,
  onReactionPress,
}) => {
  const isUser = message.sender === "user";
  const isDeleted = message.isDeleted === true;

  // Grouped border-radius: the shared edge between consecutive bubbles
  // from the same sender gets a small radius for visual continuity.
  const borderRadius = isUser
    ? {
        borderTopLeftRadius: RADIUS,
        borderTopRightRadius:
          position === "first" || position === "single" ? RADIUS : SMALL_RADIUS,
        borderBottomLeftRadius: RADIUS,
        borderBottomRightRadius:
          position === "last" || position === "single" ? RADIUS : SMALL_RADIUS,
      }
    : {
        borderTopLeftRadius:
          position === "first" || position === "single" ? RADIUS : SMALL_RADIUS,
        borderTopRightRadius: RADIUS,
        borderBottomLeftRadius:
          position === "last" || position === "single" ? RADIUS : SMALL_RADIUS,
        borderBottomRightRadius: RADIUS,
      };

  const renderStatus = () => {
    if (!isUser || !showTimestamp) return null;
    const status = message.status ?? "sent";
    const iconName: keyof typeof Ionicons.glyphMap =
      status === "sent" ? "checkmark" : "checkmark-done";
    const iconColor =
      status === "read" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)";
    return (
      <Ionicons
        name={iconName}
        size={14}
        color={iconColor}
        style={{ marginLeft: 4 }}
      />
    );
  };

  // ── Reactions row beneath the bubble ─────────────────────────────
  const renderReactions = () => {
    if (!message.reactions || message.reactions.length === 0) return null;

    // De-duplicate reactions and count them
    const grouped = message.reactions.reduce<
      Record<string, { emoji: string; count: number; byUser: boolean }>
    >((acc, r) => {
      if (!acc[r.emoji]) {
        acc[r.emoji] = { emoji: r.emoji, count: 0, byUser: false };
      }
      acc[r.emoji].count += 1;
      if (r.sender === "user") acc[r.emoji].byUser = true;
      return acc;
    }, {});

    return (
      <View
        style={[
          styles.reactionsRow,
          isUser ? styles.reactionsUser : styles.reactionsThem,
        ]}
      >
        {Object.values(grouped).map((r) => (
          <Pressable
            key={r.emoji}
            onPress={() => onReactionPress?.(message, r.emoji)}
            style={[
              styles.reactionBadge,
              r.byUser && styles.reactionBadgeActive,
            ]}
          >
            <Text style={styles.reactionEmoji}>{r.emoji}</Text>
            {r.count > 1 && <Text style={styles.reactionCount}>{r.count}</Text>}
          </Pressable>
        ))}
      </View>
    );
  };

  const topSpacing = position === "first" || position === "single" ? 10 : 2;

  // ── Deleted message ──────────────────────────────────────────────
  if (isDeleted) {
    return (
      <View
        style={[
          styles.wrapper,
          isUser ? styles.wrapperUser : styles.wrapperThem,
          { marginTop: topSpacing },
        ]}
      >
        <View style={[styles.bubble, styles.deletedBubble, borderRadius]}>
          <View style={styles.deletedContent}>
            <Ionicons
              name="ban-outline"
              size={14}
              color={colors.textSecondary}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.deletedText}>
              {isUser ? "You unsent a message" : "This message was deleted"}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Pressable
        onLongPress={() => onLongPress?.(message)}
        delayLongPress={350}
        style={({ pressed }) => [
          styles.wrapper,
          isUser ? styles.wrapperUser : styles.wrapperThem,
          { marginTop: topSpacing },
          pressed && styles.pressed,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.themBubble,
            borderRadius,
          ]}
        >
          {/* Reply reference */}
          {message.replyTo && (
            <View
              style={[
                styles.replyBar,
                isUser ? styles.replyBarUser : styles.replyBarThem,
              ]}
            >
              <Text
                style={[
                  styles.replyName,
                  isUser ? styles.replyNameUser : styles.replyNameThem,
                ]}
                numberOfLines={1}
              >
                {message.replyTo.senderName}
              </Text>
              <Text
                style={[
                  styles.replyText,
                  isUser ? styles.replyTextUser : styles.replyTextThem,
                ]}
                numberOfLines={2}
              >
                {message.replyTo.text}
              </Text>
            </View>
          )}

          {/* Image message */}
          {message.type === "image" && message.imageUri && (
            <Image
              source={{ uri: message.imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          {/* Text content */}
          {message.text ? (
            <Text
              style={[styles.text, isUser ? styles.userText : styles.themText]}
            >
              {message.text}
            </Text>
          ) : null}

          {/* Timestamp + read receipt */}
          {showTimestamp && (
            <View style={styles.meta}>
              <Text
                style={[
                  styles.time,
                  isUser ? styles.userTime : styles.themTime,
                ]}
              >
                {formatMessageTime(message.timestamp)}
              </Text>
              {renderStatus()}
            </View>
          )}
        </View>
      </Pressable>

      {/* Reactions below the bubble */}
      {renderReactions()}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: "78%",
  },
  wrapperUser: {
    alignSelf: "flex-end",
  },
  wrapperThem: {
    alignSelf: "flex-start",
  },
  pressed: {
    opacity: 0.7,
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: colors.primary,
  },
  themBubble: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // ── Reply reference inside bubble ────────────────────────────────
  replyBar: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 6,
    borderLeftWidth: 3,
  },
  replyBarUser: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderLeftColor: "rgba(255,255,255,0.6)",
  },
  replyBarThem: {
    backgroundColor: `${colors.primary}10`,
    borderLeftColor: colors.primary,
  },
  replyName: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    marginBottom: 2,
  },
  replyNameUser: {
    color: "rgba(255,255,255,0.85)",
  },
  replyNameThem: {
    color: colors.primary,
  },
  replyText: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  replyTextUser: {
    color: "rgba(255,255,255,0.7)",
  },
  replyTextThem: {
    color: colors.textSecondary,
  },

  // ── Deleted ──────────────────────────────────────────────────────
  deletedBubble: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  deletedContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  deletedText: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: "italic",
  },

  // ── Reactions ────────────────────────────────────────────────────
  reactionsRow: {
    flexDirection: "row",
    marginTop: -12, // Pull them up to overlap the bubble bottom
    marginBottom: 4,
    gap: 4,
    zIndex: 10,
  },
  reactionsUser: {
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  reactionsThem: {
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  reactionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1.5,
    borderColor: colors.white,
    // Add 3D-ish shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  reactionBadgeActive: {
    borderColor: colors.white,
    backgroundColor: `${colors.primary}`,
  },
  reactionEmoji: {
    fontSize: 16,
    lineHeight: 20,
  },
  reactionCount: {
    fontSize: 12,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    marginLeft: 3,
  },

  image: {
    width: 220,
    height: 180,
    borderRadius: 12,
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: fontFamilies.primary.regular,
  },
  userText: {
    color: colors.white,
  },
  themText: {
    color: colors.text,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  time: {
    fontSize: 11,
    fontFamily: fontFamilies.primary.regular,
  },
  userTime: {
    color: "rgba(255,255,255,0.7)",
  },
  themTime: {
    color: colors.textSecondary,
  },
});
