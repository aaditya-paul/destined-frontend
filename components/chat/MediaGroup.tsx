import { colors, fontFamilies } from "@/constants/globalStyles";
import { MediaItem } from "@/context/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  media: MediaItem[];
  isUser: boolean;
  onImagePress?: (uri: string) => void;
  onVideoPress?: (uri: string) => void;
}

const GRID_SIZE = 220;
const GAP = 3;

/**
 * Renders a compact media grid for grouped photos/videos inside a bubble.
 * 1 item  → full width
 * 2 items → side-by-side
 * 3 items → 1 large + 2 stacked
 * 4+      → 2×2 grid with "+N" overlay on the last cell
 */
export const MediaGroup: React.FC<Props> = ({
  media,
  isUser,
  onImagePress,
  onVideoPress,
}) => {
  const count = media.length;

  const handlePress = (item: MediaItem) => {
    if (item.type === "video") {
      onVideoPress?.(item.uri);
    } else {
      onImagePress?.(item.uri);
    }
  };

  const renderItem = (
    item: MediaItem,
    width: number,
    height: number,
    idx: number,
    overflow?: number,
  ) => (
    <Pressable
      key={idx}
      onPress={() => handlePress(item)}
      style={[styles.cell, { width, height }]}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.cellImage}
        resizeMode="cover"
      />
      {item.type === "video" && (
        <View style={styles.videoOverlay}>
          <Ionicons name="play-circle" size={28} color="rgba(255,255,255,0.9)" />
          {item.duration != null && (
            <Text style={styles.videoDur}>
              {Math.floor(item.duration / 60)}:
              {Math.floor(item.duration % 60)
                .toString()
                .padStart(2, "0")}
            </Text>
          )}
        </View>
      )}
      {overflow != null && overflow > 0 && (
        <View style={styles.overflowOverlay}>
          <Text style={styles.overflowText}>+{overflow}</Text>
        </View>
      )}
      {item.caption ? (
        <View style={styles.captionStrip}>
          <Text
            style={[
              styles.captionText,
              { color: isUser ? "rgba(255,255,255,0.95)" : colors.text },
            ]}
            numberOfLines={1}
          >
            {item.caption}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );

  if (count === 0) return null;

  if (count === 1) {
    return (
      <View style={styles.container}>
        {renderItem(media[0], GRID_SIZE, 160, 0)}
      </View>
    );
  }

  if (count === 2) {
    const cellW = (GRID_SIZE - GAP) / 2;
    return (
      <View style={[styles.container, styles.row]}>
        {renderItem(media[0], cellW, 140, 0)}
        {renderItem(media[1], cellW, 140, 1)}
      </View>
    );
  }

  if (count === 3) {
    const halfH = (140 - GAP) / 2;
    const smallW = (GRID_SIZE - GAP) / 2;
    return (
      <View style={[styles.container, styles.row]}>
        {renderItem(media[0], smallW, 140, 0)}
        <View style={[styles.column, { gap: GAP }]}>
          {renderItem(media[1], smallW, halfH, 1)}
          {renderItem(media[2], smallW, halfH, 2)}
        </View>
      </View>
    );
  }

  // 4+  → 2×2 with overflow
  const cellW = (GRID_SIZE - GAP) / 2;
  const cellH = (140 - GAP) / 2;
  const display = media.slice(0, 4);
  const overflow = count > 4 ? count - 4 : undefined;

  return (
    <View style={[styles.container, styles.grid]}>
      {display.map((item, i) =>
        renderItem(
          item,
          cellW,
          cellH,
          i,
          i === 3 ? overflow : undefined,
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: GRID_SIZE,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    gap: GAP,
  },
  column: {
    flexDirection: "column",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  cell: {
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  cellImage: {
    width: "100%",
    height: "100%",
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  videoDur: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 11,
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
  },
  overflowOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  overflowText: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    color: colors.white,
  },
  captionStrip: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  captionText: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 11,
    lineHeight: 14,
  },
});
