import { ProfileView } from "@/components/ProfileView";
import ComplimentModal from "@/components/ui/ComplimentModal";
import { LikeButton, PassButton } from "@/components/ui/like_unline_actionsBtn";
import { colors, generalSizes } from "@/constants/globalStyles";
import { dummyProfiles } from "@/data/dummyData";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComplimentModal, setShowComplimentModal] = useState(false);
  const [selectedCardContext, setSelectedCardContext] =
    useState<React.ReactNode>(null);
  const currentProfile = dummyProfiles[currentIndex];
  const nextProfile = dummyProfiles[(currentIndex + 1) % dummyProfiles.length];

  const scrollViewRef = useRef<ScrollView>(null);
  const currentSlideAnim = useRef(new Animated.Value(0)).current;
  const currentRotateAnim = useRef(new Animated.Value(0)).current;
  const currentOpacityAnim = useRef(new Animated.Value(1)).current;
  const nextScaleAnim = useRef(new Animated.Value(0.95)).current;
  const nextTranslateYAnim = useRef(new Animated.Value(20)).current;

  const animateSlide = (direction: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);

    const toValue = direction === "right" ? width * 1.5 : -width * 1.5;
    const rotateValue = direction === "right" ? 20 : -20;

    Animated.parallel([
      // Slide and rotate current card out
      Animated.timing(currentSlideAnim, {
        toValue,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(currentRotateAnim, {
        toValue: rotateValue,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(currentOpacityAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      // Scale up and move next card to front
      Animated.timing(nextScaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(nextTranslateYAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update to next profile immediately
      const nextIndex = (currentIndex + 1) % dummyProfiles.length;
      setCurrentIndex(nextIndex);

      // Reset animations after state update
      requestAnimationFrame(() => {
        currentSlideAnim.setValue(0);
        currentRotateAnim.setValue(0);
        currentOpacityAnim.setValue(1);
        nextScaleAnim.setValue(0.95);
        nextTranslateYAnim.setValue(20);

        setIsAnimating(false);

        // Scroll to top
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        }, 0);
      });
    });
  };

  const handleLike = () => {
    setShowComplimentModal(true);
  };

  const handleCardLike = (cardContent: React.ReactNode) => {
    setSelectedCardContext(cardContent);
    setShowComplimentModal(true);
  };

  const handleSendCompliment = (message: string) => {
    console.log(`Liked: ${currentProfile.firstName} with message: ${message}`);
    setSelectedCardContext(null);
    animateSlide("right");
  };

  const handlePass = () => {
    console.log(`Passed: ${currentProfile.firstName}`);
    animateSlide("left");
  };

  const renderProfile = (
    profile: typeof currentProfile,
    isNext = false,
    profileIndex: number,
  ) => {
    return (
      <ScrollView
        key={`profile-${profileIndex}`}
        ref={isNext ? undefined : scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!isNext}
        style={{ backgroundColor: colors.background }}
      >
        <ProfileView
          profile={profile}
          onCardLike={isNext ? undefined : handleCardLike}
        />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Next Profile (Behind) */}
      <Animated.View
        style={[
          styles.cardContainer,
          styles.nextCard,
          {
            transform: [
              { scale: nextScaleAnim },
              { translateY: nextTranslateYAnim },
            ],
          },
        ]}
      >
        {renderProfile(
          nextProfile,
          true,
          (currentIndex + 1) % dummyProfiles.length,
        )}
      </Animated.View>

      {/* Current Profile (Front) */}
      <Animated.View
        style={[
          styles.cardContainer,
          styles.currentCard,
          {
            opacity: currentOpacityAnim,
            transform: [
              { translateX: currentSlideAnim },
              {
                rotate: currentRotateAnim.interpolate({
                  inputRange: [-20, 20],
                  outputRange: ["-20deg", "20deg"],
                }),
              },
            ],
          },
        ]}
      >
        {renderProfile(currentProfile, false, currentIndex)}
      </Animated.View>

      {/* FIXED ACTION BAR */}
      <View style={styles.interactionBar}>
        <PassButton size={generalSizes["4xl"]} onPress={handlePass} />
        <LikeButton size={generalSizes["4xl"]} onPress={handleLike} />
      </View>

      {/* COMPLIMENT MODAL */}
      <ComplimentModal
        visible={showComplimentModal}
        onClose={() => {
          setShowComplimentModal(false);
          setSelectedCardContext(null);
        }}
        onSend={handleSendCompliment}
        profileName={currentProfile.firstName}
        cardContext={selectedCardContext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  cardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
  },
  currentCard: {
    zIndex: 2,
  },
  nextCard: {
    zIndex: 1,
  },
  scrollContent: { paddingBottom: 160 },

  // Action Bar
  interactionBar: {
    position: "absolute",
    bottom: 110,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 24,
    zIndex: 10,
  },
});
