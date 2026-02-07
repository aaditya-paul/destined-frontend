import { ProfileView } from "@/components/ProfileView";
import ComplimentModal from "@/components/ui/ComplimentModal";
import { LikeButton, PassButton } from "@/components/ui/like_unline_actionsBtn";
import {
  colors,
  fontFamilies,
  generalSizes,
  spacing,
} from "@/constants/globalStyles";
import { dummyProfiles } from "@/data/dummyData";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserProfileScreen() {
  const router = useRouter();
  const { id, compliment } = useLocalSearchParams();
  // Decode the profile index from params or default to 0
  const profileIndex = id ? parseInt(id as string, 10) : 0;
  const profile = dummyProfiles[profileIndex] || dummyProfiles[0];
  const receivedCompliment = compliment as string | undefined;

  const [showComplimentModal, setShowComplimentModal] = useState(false);
  const [selectedCardContext, setSelectedCardContext] =
    useState<React.ReactNode>(null);

  const handleLike = () => {
    setShowComplimentModal(true);
  };

  const handleMatch = () => {
    // Mock Match Animation/Action
    alert("It's a Match! 🎉");
    router.back();
  };

  const handleCardLike = (cardContent: React.ReactNode) => {
    setSelectedCardContext(cardContent);
    setShowComplimentModal(true);
  };

  const handleSendCompliment = (message: string) => {
    console.log(`Liked ${profile.firstName} with message: ${message}`);
    // Close modal and go back
    setShowComplimentModal(false);
    setSelectedCardContext(null);
    router.back();
  };

  const handlePass = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={24} color={colors.secondary} />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {receivedCompliment && (
          <View style={styles.complimentHeader}>
            <View style={styles.complimentBadge}>
              <Ionicons
                name="chatbubble-ellipses"
                size={16}
                color={colors.white}
              />
              <Text style={styles.complimentBadgeText}>
                Sent you a compliment
              </Text>
            </View>
            <Text style={styles.complimentText}>"{receivedCompliment}"</Text>
          </View>
        )}
        <ProfileView profile={profile} onCardLike={handleCardLike} />
      </ScrollView>

      {/* FIXED ACTION BAR */}
      <View style={styles.interactionBar}>
        <PassButton size={generalSizes["4xl"]} onPress={handlePass} />
        {receivedCompliment ? (
          <TouchableOpacity
            style={styles.matchButton}
            onPress={handleMatch}
            activeOpacity={0.8}
          >
            <Ionicons name="heart" size={32} color={colors.white} />
            <Text style={styles.matchButtonText}>MATCH</Text>
          </TouchableOpacity>
        ) : (
          <LikeButton size={generalSizes["4xl"]} onPress={handleLike} />
        )}
      </View>

      {/* COMPLIMENT MODAL */}
      <ComplimentModal
        visible={showComplimentModal}
        onClose={() => {
          setShowComplimentModal(false);
          setSelectedCardContext(null);
        }}
        onSend={handleSendCompliment}
        profileName={profile.firstName}
        cardContext={selectedCardContext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 160 },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  // Action Bar
  interactionBar: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: spacing.xl,
    alignItems: "center",
  },
  matchButton: {
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  matchButtonText: {
    color: colors.white,
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    letterSpacing: 1,
  },
  complimentHeader: {
    marginTop: 80, // Space for close button
    marginHorizontal: spacing.xl,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 20,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  complimentBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    marginBottom: spacing.sm,
  },
  complimentBadgeText: {
    color: colors.white,
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    textTransform: "uppercase",
  },
  complimentText: {
    fontFamily: fontFamilies.primary.medium,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
});
