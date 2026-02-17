import { ActionItem, ChatActionSheet } from "@/components/chat/ChatActionSheet";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { DateSeparator } from "@/components/chat/DateSeparator";
import { EmojiReactionPicker } from "@/components/chat/EmojiReactionPicker";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ScrollToBottomButton } from "@/components/chat/ScrollToBottomButton";
import { SwipeableMessage } from "@/components/chat/SwipeableMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { Message, ReplyRef } from "@/context/types";
import { dummyChats } from "@/data/dummyData";
import {
  buildChatListData,
  ChatListItem,
  formatLastActive,
} from "@/utils/chatHelpers";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const chatData = dummyChats.find((c) => c.id === id) ?? null;

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    chatData ? chatData.messages : [],
  );
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [headerSheetVisible, setHeaderSheetVisible] = useState(false);
  const [messageSheetVisible, setMessageSheetVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyRef, setReplyRef] = useState<ReplyRef | null>(null);
  const [reactionPickerVisible, setReactionPickerVisible] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<RNTextInput>(null);
  const pendingReactionRef = useRef(false);

  // ── Data Processing ──────────────────────────────────────────────
  const processedData: ChatListItem[] = useMemo(
    () => buildChatListData(messages),
    [messages],
  );

  // ── Reply Handling ───────────────────────────────────────────────
  const handleReply = useCallback(
    (msg: Message) => {
      const senderName =
        msg.sender === "user" ? "You" : (chatData?.user?.firstName ?? "Them");
      setReplyRef({ id: msg.id, text: msg.text || "📷 Photo", senderName });
      inputRef.current?.focus();
    },
    [chatData],
  );

  const handleCancelReply = useCallback(() => {
    setReplyRef(null);
  }, []);

  // ── Reaction Handling ────────────────────────────────────────────
  const handleReactionSelect = useCallback(
    (emoji: string) => {
      if (!selectedMessage) return;
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== selectedMessage.id) return m;
          const existing = m.reactions ?? [];
          const alreadyReacted = existing.find(
            (r) => r.emoji === emoji && r.sender === "user",
          );
          if (alreadyReacted) {
            // Toggle off
            return {
              ...m,
              reactions: existing.filter((r) => r !== alreadyReacted),
            };
          }
          return {
            ...m,
            reactions: [...existing, { emoji, sender: "user" as const }],
          };
        }),
      );
      setSelectedMessage(null);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    [selectedMessage],
  );

  const handleReactionPress = useCallback((msg: Message, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msg.id) return m;
        const existing = m.reactions ?? [];
        const alreadyReacted = existing.find(
          (r) => r.emoji === emoji && r.sender === "user",
        );
        if (alreadyReacted) {
          return {
            ...m,
            reactions: existing.filter((r) => r !== alreadyReacted),
          };
        }
        return {
          ...m,
          reactions: [...existing, { emoji, sender: "user" as const }],
        };
      }),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  // ── Send Message ─────────────────────────────────────────────────
  const handleSend = useCallback(() => {
    if (!messageText.trim()) return;

    const newMsg: Message = {
      id: `user-${Date.now()}`,
      text: messageText.trim(),
      sender: "user",
      timestamp: new Date(),
      status: "sent",
      type: "text",
      ...(replyRef ? { replyTo: replyRef } : {}),
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessageText("");
    setReplyRef(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Simulate delivery after a short delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMsg.id ? { ...m, status: "delivered" } : m,
        ),
      );
    }, 1500);

    // Simulate read receipt
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: "read" } : m)),
      );
    }, 4000);

    // Auto-scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  }, [messageText, replyRef]);

  // ── Image Picker ─────────────────────────────────────────────────
  const handleImagePick = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets[0]) {
      const newMsg: Message = {
        id: `img-${Date.now()}`,
        text: "",
        sender: "user",
        timestamp: new Date(),
        status: "sent",
        type: "image",
        imageUri: result.assets[0].uri,
      };
      setMessages((prev) => [...prev, newMsg]);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    }
  }, []);

  const handleCameraPress = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Camera access is required to take photos.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets[0]) {
      const newMsg: Message = {
        id: `cam-${Date.now()}`,
        text: "",
        sender: "user",
        timestamp: new Date(),
        status: "sent",
        type: "image",
        imageUri: result.assets[0].uri,
      };
      setMessages((prev) => [...prev, newMsg]);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, []);

  // ── Voice Message ────────────────────────────────────────────────
  const handleVoiceSend = useCallback(
    (uri: string, duration: number) => {
      const newMsg: Message = {
        id: `voice-${Date.now()}`,
        text: "",
        sender: "user",
        timestamp: new Date(),
        status: "sent",
        type: "voice",
        voiceUri: uri,
        voiceDuration: duration,
        ...(replyRef ? { replyTo: replyRef } : {}),
      };

      setMessages((prev) => [...prev, newMsg]);
      setReplyRef(null);

      // Simulate delivery
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === newMsg.id ? { ...m, status: "delivered" } : m,
          ),
        );
      }, 1500);

      // Simulate read
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === newMsg.id ? { ...m, status: "read" } : m)),
        );
      }, 4000);

      // Auto-scroll
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    },
    [replyRef],
  );

  // ── Scroll Handling ──────────────────────────────────────────────
  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      setShowScrollToBottom(offsetY > 300);
    },
    [],
  );

  const scrollToBottom = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  // ── Long Press Actions ───────────────────────────────────────────
  const handleMessageLongPress = useCallback((msg: Message) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedMessage(msg);
    setMessageSheetVisible(true);
  }, []);

  const messageActions: ActionItem[] = useMemo(
    () => [
      {
        icon: "copy-outline" as keyof typeof Ionicons.glyphMap,
        label: "Copy Text",
        onPress: () => {
          if (selectedMessage?.text) {
            Clipboard.setStringAsync(selectedMessage.text);
          }
        },
      },
      {
        icon: "arrow-undo-outline" as keyof typeof Ionicons.glyphMap,
        label: "Reply",
        onPress: () => {
          if (selectedMessage) {
            handleReply(selectedMessage);
          }
        },
      },
      {
        icon: "heart-outline" as keyof typeof Ionicons.glyphMap,
        label: "React",
        onPress: () => {
          pendingReactionRef.current = true;
          setMessageSheetVisible(false);
          setTimeout(() => {
            setReactionPickerVisible(true);
            pendingReactionRef.current = false;
          }, 300);
        },
      },
      ...(selectedMessage?.sender === "user"
        ? [
            {
              icon: "trash-outline" as keyof typeof Ionicons.glyphMap,
              label: "Delete Message",
              destructive: true,
              onPress: () => {
                if (selectedMessage) {
                  setMessages((prev) =>
                    prev.filter((m) => m.id !== selectedMessage.id),
                  );
                }
              },
            },
          ]
        : []),
    ],
    [selectedMessage, handleReply],
  );

  const headerActions: ActionItem[] = useMemo(
    () => [
      {
        icon: "person-outline" as keyof typeof Ionicons.glyphMap,
        label: "View Profile",
        onPress: () => {
          if (chatData) {
            router.push({
              pathname: "/user-profile",
              params: { id: chatData.id },
            });
          }
        },
      },
      {
        icon: "search-outline" as keyof typeof Ionicons.glyphMap,
        label: "Search in Chat",
        onPress: () => {},
      },
      {
        icon: "notifications-off-outline" as keyof typeof Ionicons.glyphMap,
        label: "Mute Notifications",
        onPress: () => {},
      },
      {
        icon: "hand-left-outline" as keyof typeof Ionicons.glyphMap,
        label: "Block",
        destructive: true,
        onPress: () => {},
      },
      {
        icon: "flag-outline" as keyof typeof Ionicons.glyphMap,
        label: "Report",
        destructive: true,
        onPress: () => {},
      },
    ],
    [chatData, router],
  );

  // ── Status text for header ───────────────────────────────────────
  const statusText = useMemo(() => {
    if (!chatData) return undefined;
    if (chatData.isOnline) return "Online";
    if (chatData.lastActive) return formatLastActive(chatData.lastActive);
    return undefined;
  }, [chatData]);

  // ── Render Item ──────────────────────────────────────────────────
  const renderItem = useCallback(
    ({ item }: { item: ChatListItem }) => {
      if (item.type === "separator") {
        return <DateSeparator text={item.text} />;
      }
      return (
        <SwipeableMessage onReply={() => handleReply(item.data)}>
          <MessageBubble
            message={item.data}
            position={item.position}
            showTimestamp={item.showTimestamp}
            onLongPress={handleMessageLongPress}
            onReactionPress={handleReactionPress}
          />
        </SwipeableMessage>
      );
    },
    [handleMessageLongPress, handleReply, handleReactionPress],
  );

  const keyExtractor = useCallback((item: ChatListItem) => {
    return item.type === "separator" ? item.id : item.data.id;
  }, []);

  const userName = chatData?.user?.firstName ?? "someone";

  // ── Empty Conversation ───────────────────────────────────────────
  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyChat}>
        <View style={styles.emptyChatCircle}>
          <Ionicons name="hand-right" size={32} color={colors.primary} />
        </View>
        <Text style={styles.emptyChatTitle}>Say hi!</Text>
        <Text style={styles.emptyChatSubtitle}>
          You matched with {userName}. Start a conversation!
        </Text>
      </View>
    ),
    [userName],
  );

  // ── List Footer (typing indicator) – appears at top of inverted list ──
  const isTyping = chatData?.isTyping ?? false;
  const ListFooterComponent = useCallback(() => {
    if (!isTyping) return null;
    return (
      <View style={styles.typingWrap}>
        <TypingIndicator />
      </View>
    );
  }, [isTyping]);

  // ── Error guard (AFTER all hooks) ────────────────────────────────
  if (!chatData) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={56}
          color={colors.border}
        />
        <Text style={styles.errorText}>Chat not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.errorBackBtn}
        >
          <Text style={styles.errorBackText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          {/* Header */}
          <ChatHeader
            name={chatData.user.firstName}
            imageUri={chatData.user.images[0]?.uri || ""}
            isOnline={chatData.isOnline}
            statusText={statusText}
            onBack={() => {
              Keyboard.dismiss();
              router.back();
            }}
            onProfilePress={() =>
              router.push({
                pathname: "/user-profile",
                params: { id: chatData.id },
              })
            }
            onMorePress={() => setHeaderSheetVisible(true)}
          />

          {/* Messages */}
          <View style={styles.messagesArea}>
            <FlatList
              ref={flatListRef}
              data={processedData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              inverted
              contentContainerStyle={styles.messageList}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={100}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={ListEmptyComponent}
              ListHeaderComponent={ListFooterComponent}
              maxToRenderPerBatch={15}
              windowSize={10}
              removeClippedSubviews={Platform.OS === "android"}
            />

            <ScrollToBottomButton
              visible={showScrollToBottom}
              onPress={scrollToBottom}
            />
          </View>

          {/* Input Bar */}
          <ChatInput
            value={messageText}
            onChangeText={setMessageText}
            onSend={handleSend}
            onCameraPress={handleCameraPress}
            onImagePress={handleImagePick}
            onVoiceSend={handleVoiceSend}
            replyRef={replyRef}
            onCancelReply={handleCancelReply}
          />
        </KeyboardAvoidingView>

        {/* Action Sheets */}
        <ChatActionSheet
          visible={headerSheetVisible}
          onClose={() => setHeaderSheetVisible(false)}
          title={chatData.user.firstName}
          actions={headerActions}
        />
        <ChatActionSheet
          visible={messageSheetVisible}
          onClose={() => {
            setMessageSheetVisible(false);
            if (!pendingReactionRef.current) {
              setSelectedMessage(null);
            }
          }}
          title="Message Options"
          actions={messageActions}
        />

        {/* Emoji Reaction Picker */}
        <EmojiReactionPicker
          visible={reactionPickerVisible}
          onClose={() => {
            setReactionPickerVisible(false);
            setSelectedMessage(null);
          }}
          onSelect={handleReactionSelect}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  messagesArea: {
    flex: 1,
    position: "relative",
  },
  messageList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  typingWrap: {
    paddingHorizontal: 4,
    paddingTop: 4,
  },

  // ── Error ───────────────────────────────────────────────────────
  errorContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  errorText: {
    fontFamily: fontFamilies.primary.medium,
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
  errorBackBtn: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: colors.primary,
    borderRadius: 24,
  },
  errorBackText: {
    color: colors.white,
    fontFamily: fontFamilies.bold,
    fontSize: 14,
  },

  // ── Empty Conversation ──────────────────────────────────────────
  emptyChat: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    // Inverted list: this appears at the center/bottom visually
    transform: [{ scaleY: -1 }],
  },
  emptyChatCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyChatTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: colors.text,
    marginBottom: 6,
  },
  emptyChatSubtitle: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});
