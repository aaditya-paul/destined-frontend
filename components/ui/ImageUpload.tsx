import {
  borderRadius,
  colors,
  fontSizes,
  spacing,
} from "@/constants/globalStyles";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ImageUploadProps {
  imageUri?: string;
  onImageSelect: (uris: string[]) => void;
  size?: number;
  label?: string;
  selectPrompt?: () => void;
  prompt?: string;
}

const ImageUpload = ({
  imageUri,
  onImageSelect,
  size = 120,
  label,
  selectPrompt,
  prompt,
}: ImageUploadProps) => {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // Turn off editing primarily to support multi-select better, though expo-image-picker handles it differently
      allowsMultipleSelection: true,
      selectionLimit: 6,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uris = result.assets.map((asset) => asset.uri);
      onImageSelect(uris);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.uploadBox, { width: size, height: size }]}
        onPress={pickImage}
      >
        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            {selectPrompt && (
              <Pressable
                style={styles.promptBadge}
                onPress={(e) => {
                  e.stopPropagation();
                  selectPrompt();
                }}
              >
                {prompt ? (
                  <Text style={styles.promptText} numberOfLines={1}>
                    {prompt}
                  </Text>
                ) : (
                  <View style={styles.addPromptRow}>
                    <Text style={styles.addPromptIcon}>+</Text>
                    <Text style={styles.addPromptText}>Prompt</Text>
                  </View>
                )}
              </Pressable>
            )}
          </>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.plusIcon}>+</Text>
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSizes.sm,
    color: colors.secondary,
    marginBottom: spacing.md,
    fontWeight: "600",
  },
  uploadBox: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.white,
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 40,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  placeholderText: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
  promptBadge: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    maxWidth: "90%",
  },
  promptText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
  },
  addPromptRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addPromptIcon: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  addPromptText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
  },
});
