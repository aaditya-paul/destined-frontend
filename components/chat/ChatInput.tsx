import { colors, fontFamilies } from "@/constants/globalStyles";
import { ReplyRef } from "@/context/types";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Platform,
  Pressable,
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ReplyPreview } from "./ReplyPreview";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onCameraPress?: () => void;
  onImagePress?: () => void;
  /** Opens multi-select media picker (images + videos). */
  onMediaPress?: () => void;
  onVoiceSend?: (uri: string, duration: number) => void;
  replyRef?: ReplyRef | null;
  onCancelReply?: () => void;
}

export interface ChatInputHandle {
  focus: () => void;
}

export const ChatInput = React.forwardRef<ChatInputHandle, Props>(
  (
    {
      value,
      onChangeText,
      onSend,
      onCameraPress,
      onImagePress,
      onMediaPress,
      onVoiceSend,
      replyRef,
      onCancelReply,
    },
    ref,
  ) => {
    const internalInputRef = useRef<RNTextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        // Blur first to guarantee the keyboard reopens even if
        // focus() is called while the input is technically "focused"
        // but the keyboard was dismissed (e.g. via back button / tap).
        internalInputRef.current?.blur();
        setTimeout(() => internalInputRef.current?.focus(), 60);
      },
    }));
    const [inputHeight, setInputHeight] = useState(40);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const hasText = value.trim().length > 0;

    const recordingRef = useRef<Audio.Recording | null>(null);
    const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(
      null,
    );
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const handleSend = () => {
      if (!hasText) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onSend();
    };

    // ── Voice Recording ─────────────────────────────────────────────
    const startPulse = useCallback(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, [pulseAnim]);

    const stopPulse = useCallback(() => {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }, [pulseAnim]);

    const startRecording = useCallback(async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") return;

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );

        recordingRef.current = recording;
        setIsRecording(true);
        setRecordingDuration(0);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        startPulse();

        // Track duration
        recordingTimerRef.current = setInterval(() => {
          setRecordingDuration((prev) => prev + 1);
        }, 1000);
      } catch (error) {
        console.warn("Failed to start recording:", error);
      }
    }, [startPulse]);

    const stopRecording = useCallback(async () => {
      if (!recordingRef.current) return;

      try {
        stopPulse();
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }

        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        const status = await recordingRef.current.getStatusAsync();
        const durationSec = Math.round((status.durationMillis ?? 0) / 1000);

        recordingRef.current = null;
        setIsRecording(false);
        setRecordingDuration(0);

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });

        if (uri && durationSec >= 1 && onVoiceSend) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onVoiceSend(uri, durationSec);
        }
      } catch (error) {
        console.warn("Failed to stop recording:", error);
        setIsRecording(false);
        setRecordingDuration(0);
      }
    }, [onVoiceSend, stopPulse]);

    const cancelRecording = useCallback(async () => {
      if (!recordingRef.current) return;
      try {
        stopPulse();
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
        setIsRecording(false);
        setRecordingDuration(0);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        setIsRecording(false);
        setRecordingDuration(0);
      }
    }, [stopPulse]);

    const formatTimer = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
      <View style={styles.container}>
        {/* Reply preview bar */}
        {replyRef && onCancelReply && (
          <ReplyPreview replyRef={replyRef} onDismiss={onCancelReply} />
        )}

        {isRecording ? (
          /* ── Recording State ──────────────────────────────────── */
          <View style={styles.row}>
            {/* Cancel */}
            <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.iconPressed,
              ]}
              onPress={cancelRecording}
              hitSlop={8}
            >
              <Ionicons name="trash-outline" size={22} color="#FF3B30" />
            </Pressable>

            {/* Recording indicator */}
            <View style={styles.recordingIndicator}>
              <Animated.View
                style={[
                  styles.recordingDot,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              />
              <Text style={styles.recordingTimer}>
                {formatTimer(recordingDuration)}
              </Text>
              <Text style={styles.recordingLabel}>Recording...</Text>
            </View>

            {/* Stop & send */}
            <Pressable
              style={({ pressed }) => [
                styles.sendButton,
                styles.sendActive,
                pressed && styles.sendPressed,
              ]}
              onPress={stopRecording}
            >
              <Ionicons name="arrow-up" size={20} color={colors.white} />
            </Pressable>
          </View>
        ) : (
          /* ── Normal Input State ───────────────────────────────── */
          <View style={styles.row}>
            {/* Camera */}
            <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.iconPressed,
              ]}
              onPress={onCameraPress}
              hitSlop={8}
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color={colors.textSecondary}
              />
            </Pressable>

            {/* Gallery (single image) */}
            <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.iconPressed,
              ]}
              onPress={onImagePress}
              hitSlop={8}
            >
              <Ionicons
                name="image-outline"
                size={22}
                color={colors.textSecondary}
              />
            </Pressable>

            {/* Multi-media picker (images + videos) */}
            {onMediaPress && (
              <Pressable
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.iconPressed,
                ]}
                onPress={onMediaPress}
                hitSlop={8}
              >
                <Ionicons
                  name="albums-outline"
                  size={22}
                  color={colors.textSecondary}
                />
              </Pressable>
            )}

            {/* Text Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                ref={internalInputRef}
                style={[
                  styles.input,
                  { height: Math.max(40, Math.min(inputHeight, 100)) },
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder="Type a message..."
                placeholderTextColor={colors.textSecondary}
                multiline
                onContentSizeChange={(e) =>
                  setInputHeight(e.nativeEvent.contentSize.height)
                }
              />
            </View>

            {/* Send / Mic */}
            {hasText ? (
              <Pressable
                style={({ pressed }) => [
                  styles.sendButton,
                  styles.sendActive,
                  pressed && styles.sendPressed,
                ]}
                onPress={handleSend}
              >
                <Ionicons name="arrow-up" size={20} color={colors.white} />
              </Pressable>
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.sendButton,
                  styles.sendInactive,
                  pressed && styles.micPressed,
                ]}
                onPress={startRecording}
              >
                <Ionicons name="mic" size={22} color={colors.textSecondary} />
              </Pressable>
            )}
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "ios" ? 28 : 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingTop: 8,
    gap: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconPressed: {
    opacity: 0.5,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 22,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  input: {
    fontSize: 15,
    fontFamily: fontFamilies.primary.regular,
    color: colors.text,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendInactive: {
    backgroundColor: "transparent",
  },
  sendPressed: {
    transform: [{ scale: 0.92 }],
  },
  micPressed: {
    opacity: 0.5,
  },

  // ── Recording ───────────────────────────────────────────────────
  recordingIndicator: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
  },
  recordingTimer: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text,
    fontVariant: ["tabular-nums"],
  },
  recordingLabel: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
});

ChatInput.displayName = "ChatInput";
