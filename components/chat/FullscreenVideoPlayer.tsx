import { colors, fontFamilies } from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const SPEED_OPTIONS = [1, 1.5, 2];

interface Props {
  uri: string;
  onClose: () => void;
}

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Fullscreen video player with seek bar, speed control, play/pause.
 */
export const FullscreenVideoPlayer: React.FC<Props> = ({ uri, onClose }) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [seekBarWidth, setSeekBarWidth] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  const currentSpeed = SPEED_OPTIONS[speedIndex];

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    const dur = (status.durationMillis ?? 0) / 1000;
    const pos = status.positionMillis / 1000;
    if (dur > 0) setTotalDuration(dur);
    setCurrentTime(pos);
    setProgress(dur > 0 ? pos / dur : 0);
    setIsPlaying(status.isPlaying);

    if (status.didJustFinish) {
      setIsPlaying(false);
      setProgress(1);
      setCurrentTime(dur);
    }
  }, []);

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

  const handleSeek = useCallback(
    async (evt: GestureResponderEvent) => {
      if (seekBarWidth <= 0 || !videoRef.current) return;
      const fraction = Math.max(
        0,
        Math.min(1, evt.nativeEvent.locationX / seekBarWidth),
      );
      const seekMs = fraction * totalDuration * 1000;
      await videoRef.current.setPositionAsync(seekMs);
    },
    [seekBarWidth, totalDuration],
  );

  const handleSpeedToggle = useCallback(async () => {
    const next = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(next);
    if (videoRef.current) {
      await videoRef.current.setRateAsync(SPEED_OPTIONS[next], true);
    }
  }, [speedIndex]);

  const onSeekBarLayout = useCallback((e: LayoutChangeEvent) => {
    setSeekBarWidth(e.nativeEvent.layout.width);
  }, []);

  const toggleControls = useCallback(() => {
    setControlsVisible((v) => !v);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.videoArea} onPress={toggleControls}>
        <Video
          ref={videoRef}
          source={{ uri }}
          resizeMode={ResizeMode.CONTAIN}
          style={styles.video}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          shouldPlay
          rate={currentSpeed}
        />
      </Pressable>

      {controlsVisible && (
        <>
          {/* Close button */}
          <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={28} color={colors.white} />
          </Pressable>

          {/* Bottom controls */}
          <View style={styles.controls}>
            {/* Seek bar */}
            <Pressable
              onPress={handleSeek}
              onLayout={onSeekBarLayout}
              style={styles.seekBarWrap}
            >
              <View style={styles.seekBarBg}>
                <View
                  style={[styles.seekBarFill, { width: `${progress * 100}%` }]}
                />
                <View
                  style={[styles.seekThumb, { left: `${progress * 100}%` }]}
                />
              </View>
            </Pressable>

            {/* Row: time ‧ play ‧ speed */}
            <View style={styles.controlRow}>
              <Text style={styles.timeText}>
                {fmt(currentTime)} / {fmt(totalDuration)}
              </Text>

              <Pressable onPress={togglePlay} style={styles.playBtn}>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={28}
                  color={colors.white}
                />
              </Pressable>

              <Pressable onPress={handleSpeedToggle} style={styles.speedBtn}>
                <Text style={styles.speedText}>{currentSpeed}x</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: SCREEN_W,
    height: SCREEN_H,
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  controls: {
    position: "absolute",
    bottom: 40,
    left: 16,
    right: 16,
  },
  seekBarWrap: {
    paddingVertical: 12,
  },
  seekBarBg: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    justifyContent: "center",
  },
  seekBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  seekThumb: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    marginLeft: -7,
    top: -5,
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontVariant: ["tabular-nums"],
    minWidth: 80,
  },
  playBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  speedBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 48,
    alignItems: "center",
  },
  speedText: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: colors.white,
  },
});
