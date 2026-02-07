import { EditorialHeader } from "@/components/ui/EditorialComponents";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { dummyProfiles } from "@/data/dummyData";
import { BlurView } from "expo-blur";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function LikesScreen() {
  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof dummyProfiles)[0];
    index: number;
  }) => {
    // Simulate "premium" gate for items after the first 2
    const isBlurred = index > 1;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            source={{ uri: item.images[0]?.uri }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardName}>
              {item.firstName},{" "}
              {new Date().getFullYear() - item.dateOfBirth.getFullYear()}
            </Text>
            <Text style={styles.cardBio} numberOfLines={2}>
              {item.bio}
            </Text>
          </View>
        </View>

        {isBlurred && (
          <View style={styles.blurContainer}>
            <BlurView
              intensity={20}
              style={StyleSheet.absoluteFill}
              tint="light"
            />
            <View style={styles.lockContainer}>
              <Text style={styles.lockText}>Upgrade to see who likes you</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EditorialHeader title="LIKES" subtitle="See who's interested." />
      </View>

      <FlatList
        data={dummyProfiles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  cardContainer: {
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    // Shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: colors.white,
  },
  card: {
    flexDirection: "row",
    height: 100,
    backgroundColor: colors.white,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center",
  },
  cardName: {
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    color: colors.secondary,
    marginBottom: 4,
  },
  cardBio: {
    fontSize: 12,
    fontFamily: fontFamilies.primary.medium,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  lockContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  lockText: {
    color: colors.white,
    fontFamily: fontFamilies.bold,
    fontSize: 12,
  },
});
