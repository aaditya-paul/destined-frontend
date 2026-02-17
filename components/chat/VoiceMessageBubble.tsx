import { colors, fontFamilies } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  LayoutChangeEvent,
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
const SPEED_OPTIONS = [1, 1.5, 2];

export const VoiceMessageBubble: React.FC<Props> = ({
  voiceUri,
  duration = 0,
  isUser,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [waveformWidth, setWaveformWidth] = useState(0);

  const soundRef = useRef<Audio.Sound | null>(null);
  const isPlayingRef = useRef(false);

  const waveform = generateWaveform(voiceUri || "default", WAVEFORM_BARS);
  const currentSpeed = SPEED_OPTIONS[speedIndex];

  // Keep ref in sync with state to avoid stale closures
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.setOnPlaybackStatusUpdate(null);
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  /**
   * Single source of truth for playback state updates.
   * Replaces the old interval-based polling that caused the play/stop/play bug.
   */
  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;

      const dur = (status.durationMillis ?? duration * 1000) / 1000;
      const pos = status.positionMillis / 1000;

      if (dur > 0) setTotalDuration(dur);
      setCurrentTime(pos);
      setProgress(dur > 0 ? pos / dur : 0);

      if (status.didJustFinish) {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      }
    },
    [duration],
  );

  const handlePlayPause = useCallback(async () => {
    try {
      // ── Pause ──
      if (isPlaying && soundRef.current) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        return;
      }

      // ── Resume existing sound ──
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded && status.didJustFinish) {
          // Finished previously – replay from start
          await soundRef.current.setPositionAsync(0);
        }
        await soundRef.current.playAsync();
        setIsPlaying(true);
        return;
      }

      // ── First load & play ──
      if (!voiceUri) return;
      setIsLoading(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: voiceUri },
        {
          shouldPlay: true,
          rate: currentSpeed,
          shouldCorrectPitch: true,
          progressUpdateIntervalMillis: 80,
        },
      );

      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      soundRef.current = sound;
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.warn("Voice playback error:", error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [isPlaying, voiceUri, currentSpeed, onPlaybackStatusUpdate]);

  /**
   * Seek to a position by tapping on the waveform.
   */
  const handleSeek = useCallback(
    async (evt: GestureResponderEvent) => {
      if (waveformWidth <= 0) return;
      const fraction = Math.max(
        0,
        Math.min(1, evt.nativeEvent.locationX / waveformWidth),
      );
      const dur = totalDuration > 0 ? totalDuration : duration;
      const seekMs = fraction * dur * 1000;

      setProgress(fraction);
      setCurrentTime(fraction * dur);

      if (soundRef.current) {
        await soundRef.current.setPositionAsync(seekMs);
        // If paused, start playing after seek
        if (!isPlayingRef.current) {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        }
      }
    },
    [waveformWidth, totalDuration, duration],
  );

  /**
   * Cycle playback speed: 1x → 1.5x → 2x → 1x …
   */
  const handleSpeedToggle = useCallback(async () => {
    const nextIndex = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(nextIndex);
    const newRate = SPEED_OPTIONS[nextIndex];
    if (soundRef.current) {
      await soundRef.current.setRateAsync(newRate, true);
    }
  }, [speedIndex]);

  const onWaveformLayout = useCallback((e: LayoutChangeEvent) => {
    setWaveformWidth(e.nativeEvent.layout.width);
  }, []);

  const displayTime =
    isPlaying || progress > 0
      ? formatDuration(currentTime)
      : formatDuration(duration);

  const activeColor = isUser ? "rgba(255,255,255,0.9)" : colors.primary;
  const inactiveColor = isUser
    ? "rgba(255,255,255,0.35)"
    : `${colors.primary}35`;
  const textColor = isUser ? "rgba(255,255,255,0.8)" : colors.textSecondary;
  const speedBgColor = isUser ? "rgba(255,255,255,0.2)" : `${colors.primary}18`;
  const speedTextColor = isUser ? "rgba(255,255,255,0.9)" : colors.primary;

  return (
    <View style={styles.container}>
      {/* Play / Pause */}
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

      {/* Waveform + time + speed row */}
      <View style={styles.waveformColumn}>
        <Pressable
          onPress={handleSeek}
          onLayout={onWaveformLayout}
          style={styles.waveformRow}
        >
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
        </Pressable>
        <View style={styles.bottomRow}>
          <Text style={[styles.duration, { color: textColor }]}>
            {displayTime}
          </Text>
          {/* Speed control */}
          <Pressable
            onPress={handleSpeedToggle}
            style={[styles.speedButton, { backgroundColor: speedBgColor }]}
            hitSlop={6}
          >
            <Text style={[styles.speedText, { color: speedTextColor }]}>
              {currentSpeed}x
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 200,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonUser: {
    backgroundColor: colors.white,
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
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  duration: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 11,
  },
  speedButton: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  speedText: {
    fontFamily: fontFamilies.bold,
    fontSize: 10,
  },
});
