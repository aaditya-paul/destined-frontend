import { colors, fontFamilies } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  voiceUri?: string;
  duration?: number; // seconds
  isUser: boolean;
}

/**
 * Format seconds → "0:32", "1:05", etc.
 */
function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Generate deterministic waveform bar heights from a seed string.
 */
function generateWaveform(seed: string, bars: number): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const result: number[] = [];
  for (let i = 0; i < bars; i++) {
    hash = ((hash * 1103515245 + 12345) & 0x7fffffff) >>> 0;
    const normalized = (hash % 100) / 100;
    result.push(0.2 + normalized * 0.8); // Between 0.2 and 1.0
  }
  return result;
}

const WAVEFORM_BARS = 28;
const BAR_WIDTH = 3;
const BAR_GAP = 2;
const MAX_BAR_HEIGHT = 24;

export const VoiceMessageBubble: React.FC<Props> = ({
  voiceUri,
  duration = 0,
  isUser,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1
  const [currentTime, setCurrentTime] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const waveform = generateWaveform(voiceUri || "default", WAVEFORM_BARS);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(async () => {
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          const pos = status.positionMillis / 1000;
          const dur = (status.durationMillis ?? duration * 1000) / 1000;
          setCurrentTime(pos);
          setProgress(dur > 0 ? pos / dur : 0);

          if (status.didJustFinish) {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
        }
      }
    }, 100);
  }, [duration]);

  const handlePlayPause = useCallback(async () => {
    try {
      if (isPlaying && soundRef.current) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }

      if (soundRef.current) {
        // Resume
        await soundRef.current.playAsync();
        setIsPlaying(true);
        startProgressTracking();
        return;
      }

      // Load and play
      if (!voiceUri) return;
      setIsLoading(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: voiceUri },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
        },
      );

      soundRef.current = sound;
      setIsPlaying(true);
      setIsLoading(false);
      startProgressTracking();
    } catch (error) {
      console.warn("Voice playback error:", error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [isPlaying, voiceUri, startProgressTracking]);

  const displayTime =
    isPlaying || progress > 0
      ? formatDuration(currentTime)
      : formatDuration(duration);

  const activeColor = isUser ? "rgba(255,255,255,0.9)" : colors.primary;
  const inactiveColor = isUser
    ? "rgba(255,255,255,0.35)"
    : `${colors.primary}35`;
  const textColor = isUser ? "rgba(255,255,255,0.8)" : colors.textSecondary;

  return (
    <View style={styles.container}>
      {/* Play/Pause button */}
      <Pressable
        onPress={handlePlayPause}
        style={[
          styles.playButton,
          isUser ? styles.playButtonUser : styles.playButtonThem,
        ]}
        hitSlop={8}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={isUser ? colors.primary : colors.white}
          />
        ) : (
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={18}
            color={isUser ? colors.primary : colors.white}
            style={!isPlaying ? { marginLeft: 2 } : undefined}
          />
        )}
      </Pressable>

      {/* Waveform + time */}
      <View style={styles.waveformColumn}>
        <View style={styles.waveformRow}>
          {waveform.map((height, i) => {
            const barProgress = i / WAVEFORM_BARS;
            const isActive = barProgress <= progress;
            return (
              <View
                key={i}
                style={[
                  styles.bar,
                  {
                    height: height * MAX_BAR_HEIGHT,
                    backgroundColor: isActive ? activeColor : inactiveColor,
                  },
                ]}
              />
            );
          })}
        </View>
        <Text style={[styles.duration, { color: textColor }]}>
          {displayTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 180,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonUser: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  playButtonThem: {
    backgroundColor: colors.primary,
  },
  waveformColumn: {
    flex: 1,
    gap: 4,
  },
  waveformRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: BAR_GAP,
    height: MAX_BAR_HEIGHT,
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: BAR_WIDTH / 2,
  },
  duration: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 11,
  },
});
