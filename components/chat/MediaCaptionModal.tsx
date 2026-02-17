import { colors, fontFamilies } from "@/constants/globalStyles";
import { MediaItem } from "@/context/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");
const THUMB_SIZE = 72;

interface Props {
  visible: boolean;
  media: MediaItem[];
  onSend: (media: MediaItem[]) => void;
  onCancel: () => void;
}

/**
 * Full-screen review modal for selected media.
 * Users can swipe through items, add/edit per-item captions, then send.
 */
export const MediaCaptionModal: React.FC<Props> = ({
  visible,
  media: initialMedia,
  onSend,
  onCancel,
}) => {
  const [items, setItems] = useState<MediaItem[]>(initialMedia);
  const [activeIndex, setActiveIndex] = useState(0);
  const captionInputRef = useRef<TextInput>(null);

  // Resync when modal opens with new media
  React.useEffect(() => {
    if (visible) {
      setItems(initialMedia);
      setActiveIndex(0);
    }
  }, [visible, initialMedia]);

  const activeItem = items[activeIndex];

  const updateCaption = useCallback(
    (text: string) => {
      setItems((prev) =>
        prev.map((m, i) => (i === activeIndex ? { ...m, caption: text } : m)),
      );
    },
    [activeIndex],
  );

  const removeItem = useCallback(
    (idx: number) => {
      const next = items.filter((_, i) => i !== idx);
      if (next.length === 0) {
        onCancel();
        return;
      }
      setItems(next);
      if (activeIndex >= next.length) {
        setActiveIndex(next.length - 1);
      }
    },
    [items, activeIndex, onCancel],
  );

  const handleSend = useCallback(() => {
    onSend(items);
  }, [items, onSend]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onCancel} hitSlop={12}>
            <Ionicons name="close" size={26} color={colors.white} />
          </Pressable>
          <Text style={styles.headerTitle}>
            {items.length} {items.length === 1 ? "item" : "items"} selected
          </Text>
          <View style={{ width: 26 }} />
        </View>

        {/* Preview */}
        <View style={styles.previewArea}>
          {activeItem && (
            <Image
              source={{ uri: activeItem.uri }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}
          {activeItem?.type === "video" && (
            <View style={styles.videoIndicator}>
              <Ionicons name="videocam" size={16} color={colors.white} />
              <Text style={styles.videoLabel}>Video</Text>
            </View>
          )}
        </View>

        {/* Thumbnails strip */}
        {items.length > 1 && (
          <FlatList
            data={items}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => `thumb-${i}`}
            contentContainerStyle={styles.thumbStrip}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => setActiveIndex(index)}
                style={[
                  styles.thumb,
                  index === activeIndex && styles.thumbActive,
                ]}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={styles.thumbImage}
                  resizeMode="cover"
                />
                {item.type === "video" && (
                  <Ionicons
                    name="videocam"
                    size={12}
                    color={colors.white}
                    style={styles.thumbVideoIcon}
                  />
                )}
                <Pressable
                  style={styles.thumbRemove}
                  onPress={() => removeItem(index)}
                  hitSlop={6}
                >
                  <Ionicons name="close-circle" size={18} color="#FF3B30" />
                </Pressable>
              </Pressable>
            )}
          />
        )}

        {/* Caption input + Send */}
        <View style={styles.bottomBar}>
          <View style={styles.captionInputWrap}>
            <TextInput
              ref={captionInputRef}
              style={styles.captionInput}
              placeholder="Add a caption…"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={activeItem?.caption ?? ""}
              onChangeText={updateCaption}
              multiline
              maxLength={200}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.sendBtn,
              pressed && styles.sendBtnPressed,
            ]}
            onPress={handleSend}
          >
            <Ionicons name="send" size={20} color={colors.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 56 : 40,
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: fontFamilies.primary.medium,
    fontSize: 15,
    color: colors.white,
  },
  previewArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: SCREEN_W - 32,
    height: "100%",
  },
  videoIndicator: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  videoLabel: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 12,
    color: colors.white,
  },
  thumbStrip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  thumbActive: {
    borderColor: colors.primary,
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },
  thumbVideoIcon: {
    position: "absolute",
    bottom: 4,
    left: 4,
  },
  thumbRemove: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    paddingTop: 8,
    gap: 8,
  },
  captionInputWrap: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    maxHeight: 100,
  },
  captionInput: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 15,
    color: colors.white,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnPressed: {
    transform: [{ scale: 0.92 }],
  },
});
