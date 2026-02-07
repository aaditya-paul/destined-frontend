import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { dummyChats } from "@/data/dummyData";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const chatData = dummyChats.find((c) => c.id === id);

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(chatData ? chatData.messages : []);

  if (!chatData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Chat not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSend = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const renderMessage = ({ item }: { item: (typeof messages)[0] }) => {
    const isUser = item.sender === "user";
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.themBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.themText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            isUser ? styles.userTimestamp : styles.themTimestamp,
          ]}
        >
          {item.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={colors.secondary} />
        </TouchableOpacity>

        <View style={styles.headerProfile}>
          <Image
            source={{ uri: chatData.user.images[0]?.uri }}
            style={styles.headerImage}
          />
          <Text style={styles.headerName}>{chatData.user.firstName}</Text>
        </View>

        <TouchableOpacity style={styles.moreButton}>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      {/* Messages */}
      <FlatList
        data={messages} // Reverse if you want bottom-up, but basic top-down for now
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !messageText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!messageText.trim()}
          >
            <Ionicons name="arrow-up" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerName: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    color: colors.secondary,
  },
  moreButton: {
    padding: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  messageList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginBottom: 4,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  themBubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.white, // or a light gray matching usage
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: colors.white,
  },
  themText: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: fontFamilies.primary.regular,
    marginTop: 4,
    alignSelf: "flex-end",
    opacity: 0.7,
  },
  userTimestamp: {
    color: colors.white,
  },
  themTimestamp: {
    color: colors.textSecondary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: Platform.OS === "ios" ? spacing.xl : spacing.md, // specific safe area handling if needed
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    minHeight: 44,
    maxHeight: 100,
    fontFamily: fontFamilies.primary.regular,
    fontSize: 16,
    color: colors.text,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: colors.textSecondary,
    shadowOpacity: 0,
    elevation: 0,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontFamily: fontFamilies.primary.medium,
    color: colors.textSecondary,
  },
  backText: {
    textAlign: "center",
    marginTop: 20,
    color: colors.primary,
    fontFamily: fontFamilies.bold,
  },
});
