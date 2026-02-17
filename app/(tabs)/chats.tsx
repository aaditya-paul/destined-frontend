import { InlineTypingIndicator } from "@/components/chat/TypingIndicator";
import {
  EditorialHeader,
  SectionLabel,
} from "@/components/ui/EditorialComponents";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { dummyChats, dummyNewMatches } from "@/data/dummyData";
import { formatChatListTime } from "@/utils/chatHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// ─── New Match Bubble ────────────────────────────────────────────────

const NewMatchItem = ({
  imageUri,
  name,
  isOnline,
  onPress,
}: {
  imageUri: string;
  name: string;
  isOnline?: boolean;
  onPress: () => void;
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.newMatchItem,
      pressed && styles.matchPressed,
    ]}
    onPress={onPress}
  >
    <View style={styles.newMatchImageWrap}>
      <Image source={{ uri: imageUri }} style={styles.newMatchImage} />
      {isOnline && <View style={styles.onlineDot} />}
    </View>
    <Text style={styles.newMatchName} numberOfLines={1}>
      {name}
    </Text>
  </Pressable>
);

// ─── Chat Row ────────────────────────────────────────────────────────

const ChatRow = ({
  chat,
  onPress,
}: {
  chat: (typeof dummyChats)[0];
  onPress: () => void;
}) => {
  const lastMsg = chat.messages[chat.messages.length - 1];
  const timeStr = lastMsg ? formatChatListTime(lastMsg.timestamp) : "";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.chatRow,
        pressed && styles.chatRowPressed,
      ]}
      onPress={onPress}
    >
      {/* Avatar with online indicator */}
      <View style={styles.avatarWrap}>
        <Image
          source={{ uri: chat.user.images[0]?.uri }}
          style={styles.chatImage}
        />
        {chat.isOnline && <View style={styles.avatarOnlineDot} />}
      </View>

      {/* Content */}
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>
            {chat.user.firstName}
          </Text>
          <Text style={[styles.chatTime, chat.unread && styles.chatTimeUnread]}>
            {timeStr}
          </Text>
        </View>

        {/* Last message or typing indicator */}
        {chat.isTyping ? (
          <View style={styles.typingRow}>
            <Text style={styles.typingLabel}>typing</Text>
            <InlineTypingIndicator />
          </View>
        ) : (
          <Text
            style={[
              styles.chatMessage,
              chat.unread && styles.chatMessageUnread,
            ]}
            numberOfLines={1}
          >
            {lastMsg?.sender === "user" ? "You: " : ""}
            {lastMsg?.type === "voice" ? "🎤 Voice message" : chat.lastMessage}
          </Text>
        )}
      </View>

      {/* Unread badge */}
      {chat.unread && (chat.unreadCount ?? 0) > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>
            {(chat.unreadCount ?? 0) > 9 ? "9+" : chat.unreadCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

// ─── Empty State ─────────────────────────────────────────────────────

const EmptyState = ({ isSearch }: { isSearch: boolean }) => (
  <View style={styles.emptyContainer}>
    <Ionicons
      name={isSearch ? "search" : "chatbubbles-outline"}
      size={48}
      color={colors.border}
    />
    <Text style={styles.emptyTitle}>
      {isSearch ? "No results found" : "No conversations yet"}
    </Text>
    <Text style={styles.emptySubtitle}>
      {isSearch
        ? "Try a different search term"
        : "Start swiping to match and chat!"}
    </Text>
  </View>
);

// ─── Main Screen ─────────────────────────────────────────────────────

export default function ChatsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Sort chats: unread first, then by most recent message
  const sortedChats = useMemo(() => {
    return [...dummyChats].sort((a, b) => {
      const aTime = a.messages[a.messages.length - 1]?.timestamp.getTime() ?? 0;
      const bTime = b.messages[b.messages.length - 1]?.timestamp.getTime() ?? 0;
      // Unread chats bubble to top, then sort by recency
      if (a.unread && !b.unread) return -1;
      if (!a.unread && b.unread) return 1;
      return bTime - aTime;
    });
  }, []);

  // Filter by search query
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return sortedChats;
    const q = searchQuery.toLowerCase();
    return sortedChats.filter(
      (chat) =>
        chat.user.firstName.toLowerCase().includes(q) ||
        chat.lastMessage.toLowerCase().includes(q),
    );
  }, [searchQuery, sortedChats]);

  const filteredMatches = useMemo(() => {
    if (!searchQuery.trim()) return dummyNewMatches;
    const q = searchQuery.toLowerCase();
    return dummyNewMatches.filter((p) => p.firstName.toLowerCase().includes(q));
  }, [searchQuery]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate network refresh
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  const isSearchActive = searchQuery.trim().length > 0;
  const hasResults = filteredChats.length > 0 || filteredMatches.length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <EditorialHeader
          title="CHATS"
          subtitle="Your matches & conversations."
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search matches & messages"
          placeholderTextColor={colors.textSecondary}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {isSearchActive && Platform.OS === "android" && (
          <Pressable onPress={() => setSearchQuery("")} hitSlop={8}>
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {!hasResults && isSearchActive ? (
          <EmptyState isSearch />
        ) : (
          <>
            {/* New Matches Section */}
            {/* {filteredMatches.length > 0 && (
              <View style={styles.section}>
                <SectionLabel text="NEW MATCHES" />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.newMatchesList}
                >
                  {filteredMatches.map((profile, index) => {
                    // Check if this match is also in chats to show online status
                    const matchChat = dummyChats.find(
                      (c) => c.user.firstName === profile.firstName,
                    );
                    return (
                      <NewMatchItem
                        key={index}
                        imageUri={profile.images[0]?.uri || ""}
                        name={profile.firstName}
                        isOnline={matchChat?.isOnline}
                        onPress={() =>
                          router.push({
                            pathname: "/user-profile",
                            params: { id: index },
                          })
                        }
                      />
                    );
                  })}
                </ScrollView>
              </View>
            )} */}

            {/* Messages Section */}
            <View style={styles.section}>
              <SectionLabel text="MESSAGES" />
              {filteredChats.length === 0 ? (
                <EmptyState isSearch={false} />
              ) : (
                <View style={styles.messagesList}>
                  {filteredChats.map((chat) => (
                    <ChatRow
                      key={chat.id}
                      chat={chat}
                      onPress={() => router.push(`/chat/${chat.id}`)}
                    />
                  ))}
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const TAB_BAR_HEIGHT = Platform.OS === "ios" ? 90 : 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing["2xl"],
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl,
  },

  // ── Search ──────────────────────────────────────────────────────
  searchContainer: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    height: 46,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.primary.medium,
    fontSize: 14,
    color: colors.text,
    paddingVertical: 0,
  },

  // ── Scroll ──────────────────────────────────────────────────────
  scrollContent: {
    paddingBottom: TAB_BAR_HEIGHT + 20,
  },
  section: {
    marginBottom: spacing.xl,
  },

  // ── New Matches ─────────────────────────────────────────────────
  newMatchesList: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    gap: 16,
  },
  newMatchItem: {
    alignItems: "center",
    width: 68,
  },
  matchPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  newMatchImageWrap: {
    position: "relative",
    marginBottom: 6,
  },
  newMatchImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2.5,
    borderColor: colors.primary,
  },
  onlineDot: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#34C759",
    borderWidth: 2.5,
    borderColor: colors.background,
  },
  newMatchName: {
    fontFamily: fontFamilies.primary.medium,
    fontSize: 12,
    color: colors.text,
    textAlign: "center",
  },

  // ── Chat Rows ───────────────────────────────────────────────────
  messagesList: {
    paddingHorizontal: spacing.xl,
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  chatRowPressed: {
    backgroundColor: `${colors.border}30`,
    borderRadius: 12,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  avatarWrap: {
    position: "relative",
    marginRight: spacing.md,
  },
  chatImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarOnlineDot: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#34C759",
    borderWidth: 2.5,
    borderColor: colors.background,
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  chatTime: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  chatTimeUnread: {
    color: colors.primary,
    fontFamily: fontFamilies.primary.medium,
  },
  chatMessage: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  chatMessageUnread: {
    fontFamily: fontFamilies.primary.medium,
    color: colors.text,
  },
  typingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  typingLabel: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 14,
    color: colors.primary,
    fontStyle: "italic",
  },

  // ── Unread Badge ────────────────────────────────────────────────
  unreadBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginLeft: spacing.sm,
  },
  unreadBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },

  // ── Empty State ─────────────────────────────────────────────────
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text,
    marginTop: 16,
  },
  emptySubtitle: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    textAlign: "center",
  },
});
