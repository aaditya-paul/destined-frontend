import { ProfileView } from "@/components/ProfileView";
import { ComplimentHeader } from "@/components/ui/ComplimentHeader";
import ComplimentModal from "@/components/ui/ComplimentModal";
import {
  LikeButton,
  MatchButton,
  PassButton,
} from "@/components/ui/like_unline_actionsBtn";
import { colors, generalSizes, spacing } from "@/constants/globalStyles";
import { dummyProfiles } from "@/data/dummyData";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

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
    // haptics for match feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(
      () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
      150,
    );

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
          <ComplimentHeader compliment={receivedCompliment} />
        )}
        <ProfileView profile={profile} onCardLike={handleCardLike} />
      </ScrollView>

      {/* FIXED ACTION BAR */}
      <View style={styles.interactionBar}>
        <PassButton size={generalSizes["4xl"]} onPress={handlePass} />
        {receivedCompliment ? (
          <MatchButton onPress={handleMatch} />
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
});
