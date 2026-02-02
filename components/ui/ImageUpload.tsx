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
  onImageSelect: (uri: string) => void;
  size?: number;
  label?: string;
}

const ImageUpload = ({
  imageUri,
  onImageSelect,
  size = 120,
  label,
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
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onImageSelect(result.assets[0].uri);
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
          <Image source={{ uri: imageUri }} style={styles.image} />
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
});
