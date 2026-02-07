import {
  EditorialHeader,
  SectionLabel,
} from "@/components/ui/EditorialComponents";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { dummyChats, dummyNewMatches } from "@/data/dummyData";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const NewMatchItem = ({
  imageUri,
  name,
  onPress,
}: {
  imageUri: string;
  name: string;
  onPress: () => void;
}) => (
  <Pressable style={styles.newMatchItem} onPress={onPress}>
    <Image source={{ uri: imageUri }} style={styles.newMatchImage} />
    <View style={styles.newMatchBadge} />
    <Text style={styles.newMatchName} numberOfLines={1}>
      {name}
    </Text>
  </Pressable>
);

const ChatRow = ({
  chat,
  onPress,
}: {
  chat: (typeof dummyChats)[0];
  onPress: () => void;
}) => (
  <Pressable style={styles.chatRow} onPress={onPress}>
    <Image
      source={{ uri: chat.user.images[0]?.uri }}
      style={styles.chatImage}
    />
    <View style={styles.chatContent}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>{chat.user.firstName}</Text>
        <Text style={styles.chatTime}>
          {/* Mock time formatting */}
          {chat.messages[chat.messages.length - 1].timestamp.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" },
          )}
        </Text>
      </View>
      <Text
        style={[styles.chatMessage, chat.unread && styles.chatMessageUnread]}
        numberOfLines={1}
      >
        {chat.lastMessage}
      </Text>
    </View>
    {chat.unread && <View style={styles.unreadDot} />}
  </Pressable>
);

export default function ChatsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EditorialHeader
          title="CHATS"
          subtitle="Your matches & conversations."
        />
      </View>

      {/* Search Bar - Optional addition for better UX */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search matches"
          placeholderTextColor={colors.textSecondary}
          style={styles.searchInput}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* New Matches Section */}
        <View style={styles.section}>
          <SectionLabel text="NEW MATCHES" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newMatchesList}
          >
            {dummyNewMatches.map((profile, index) => (
              <NewMatchItem
                key={index}
                imageUri={profile.images[0]?.uri || ""}
                name={profile.firstName}
                onPress={() =>
                  router.push({ pathname: "/user-profile", params: { id: 4 } })
                } // Mock ID for now, ideally find index
              />
            ))}
          </ScrollView>
        </View>

        {/* Messages Section */}
        <View style={styles.section}>
          <SectionLabel text="MESSAGES" />
          <View style={styles.messagesList}>
            {dummyChats.map((chat) => (
              <ChatRow
                key={chat.id}
                chat={chat}
                onPress={() => {
                  router.push(`/chat/${chat.id}`);
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: 60, // Safe Area
    marginBottom: spacing.md,
  },
  searchContainer: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
  },
  section: {
    marginBottom: spacing.xl,
  },
  newMatchesList: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    gap: 16,
  },
  newMatchItem: {
    alignItems: "center",
    width: 64,
  },
  newMatchImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  newMatchBadge: {
    position: "absolute",
    right: 2,
    top: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
  },
  newMatchName: {
    fontFamily: fontFamilies.primary.medium,
    fontSize: 12,
    color: colors.text,
  },
  messagesList: {
    paddingHorizontal: spacing.xl,
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chatImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: spacing.md,
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "center",
  },
  chatName: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text,
  },
  chatTime: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  chatMessage: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  chatMessageUnread: {
    fontFamily: fontFamilies.primary.medium, // Is this valid? check globalStyles
    color: colors.text,
    fontWeight: "600",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },
});
