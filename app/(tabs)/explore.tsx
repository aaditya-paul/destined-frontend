import { EditorialHeader } from "@/components/ui/EditorialComponents";
import { colors, fontFamilies, spacing } from "@/constants/globalStyles";
import { dummyProfiles } from "@/data/dummyData";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

export default function ExploreScreen() {
  const leftColumn = dummyProfiles.filter((_, i) => i % 2 === 0);
  const rightColumn = dummyProfiles.filter((_, i) => i % 2 !== 0);

  const ExploreCard = ({
    profile,
    height,
  }: {
    profile: (typeof dummyProfiles)[0];
    height: number;
  }) => (
    <TouchableOpacity activeOpacity={0.9} style={[styles.card, { height }]}>
      <Image
        source={{ uri: profile.images[0]?.uri }}
        style={styles.cardImage}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.cardGradient}
      >
        <Text style={styles.cardName}>
          {profile.firstName},{" "}
          {new Date().getFullYear() - profile.dateOfBirth.getFullYear()}
        </Text>
        <Text style={styles.cardLocation} numberOfLines={1}>
          {profile.location}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EditorialHeader title="EXPLORE" subtitle="Discover people nearby." />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.masonryContainer}>
          <View style={styles.column}>
            {leftColumn.map((profile, index) => (
              <ExploreCard
                key={index}
                profile={profile}
                height={index % 2 === 0 ? 250 : 300}
              />
            ))}
          </View>
          <View style={styles.column}>
            {rightColumn.map((profile, index) => (
              <ExploreCard
                key={index}
                profile={profile}
                height={index % 2 === 0 ? 300 : 250}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  masonryContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  column: {
    width: COLUMN_WIDTH,
    gap: spacing.md,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.disabled,
    position: "relative",
    // Shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "flex-end",
    padding: spacing.md,
  },
  cardName: {
    fontSize: 16,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    marginBottom: 2,
  },
  cardLocation: {
    fontSize: 12,
    fontFamily: fontFamilies.primary.medium,
    color: colors.white,
    opacity: 0.8,
  },
});
