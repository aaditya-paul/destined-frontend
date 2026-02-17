import { colors, fontFamilies } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  videoUri: string;
  duration?: number;
  isUser: boolean;
  /** Tap the thumbnail to go fullscreen. */
  onFullscreen?: (uri: string) => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Inline video bubble shown inside a chat message.
 * Tap once to play/pause, tap the expand icon to open fullscreen.
 */
export const VideoPlayerBubble: React.FC<Props> = ({
  videoUri,
  duration = 0,
  isUser,
  onFullscreen,
}) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;
      const dur = (status.durationMillis ?? duration * 1000) / 1000;
      const pos = status.positionMillis / 1000;
      if (dur > 0) setTotalDuration(dur);
      setCurrentTime(pos);
      setProgress(dur > 0 ? pos / dur : 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      }
    },
    [duration],
  );

  const togglePlay = useCallback(async () => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();
    if (status.isLoaded && status.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      if (status.isLoaded && status.didJustFinish) {
        await videoRef.current.setPositionAsync(0);
      }
      await videoRef.current.playAsync();
    }
  }, []);

  const displayTime =
    isPlaying || progress > 0
      ? formatDuration(currentTime)
      : formatDuration(totalDuration);

  const textColor = isUser ? "rgba(255,255,255,0.85)" : colors.textSecondary;

  return (
    <View style={styles.container}>
      <Pressable onPress={togglePlay} style={styles.videoWrap}>
        <Video
          ref={videoRef}
          source={{ uri: videoUri }}
          resizeMode={ResizeMode.COVER}
          style={styles.video}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          isLooping={false}
          shouldPlay={false}
        />

        {/* Play overlay */}
        {!isPlaying && (
          <View style={styles.playOverlay}>
            <View style={styles.playCircle}>
              <Ionicons
                name="play"
                size={24}
                color={colors.white}
                style={{ marginLeft: 3 }}
              />
            </View>
          </View>
        )}

        {/* Fullscreen button */}
        {onFullscreen && (
          <Pressable
            style={styles.fullscreenBtn}
            onPress={() => onFullscreen(videoUri)}
            hitSlop={8}
          >
            <Ionicons name="expand-outline" size={18} color={colors.white} />
          </Pressable>
        )}

        {/* Progress bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
          />
        </View>
      </Pressable>

      {/* Duration label */}
      <View style={styles.meta}>
        <Ionicons
          name="videocam"
          size={12}
          color={textColor}
          style={{ marginRight: 4 }}
        />
        <Text style={[styles.duration, { color: textColor }]}>
          {displayTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  videoWrap: {
    width: 220,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarBg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  duration: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 11,
  },
});
