import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import { colors } from "@constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
//comment
const { width } = Dimensions.get("window");

export default function LikesScreen() {
  // Dating app style data
  const likes = [
    {
      id: 1,
      name: "Alex",
      age: 26,
      distance: "2 km away",
      bio: "Coffee lover • Travel addict • Adventure seeker",
      time: "Just now",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      isOnline: true,
      isSuperLike: false,
    },
    {
      id: 2,
      name: "Sophia",
      age: 24,
      distance: "5 km away",
      bio: "Artist • Dog mom • Love sunset walks",
      time: "10 min ago",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w-400&h=400&fit=crop",
      isOnline: true,
      isSuperLike: true, // Gold border for super like
    },
    {
      id: 3,
      name: "Jordan",
      age: 28,
      distance: "1 km away",
      bio: "Gym enthusiast • Foodie • Netflix & chill",
      time: "1 hour ago",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      isOnline: false,
      isSuperLike: false,
    },
    {
      id: 4,
      name: "Mike",
      age: 30,
      distance: "3 km away",
      bio: "Musician • Photographer • Coffee addict",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      isOnline: true,
      isSuperLike: false,
    },
  ];

  const handleLike = (id: number) => {
    // Like back - create match
    alert(`🎉 It's a match! You liked back.`);
  };

  const handlePass = (id: number) => {
    // Pass on this like
    alert(`Passed on this profile.`);
  };

  const handleMessage = (id: number) => {
    // Open chat
    alert(`Opening chat...`);
  };

  return (
    <View style={styles.container}>
      {/* HEADER - Tinder/Bumble Style */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Likes</Text>
        <View style={styles.headerStats}>
          <View style={styles.statPill}>
            <Ionicons name="flame" size={16} color="#FF6B6B" />
            <Text style={styles.statPillText}>{likes.length}</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN CONTENT - CARD STACK STYLE */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>People who liked you</Text>
        
        {likes.map((person) => (
          <View 
            key={person.id} 
            style={[
              styles.profileCard,
              person.isSuperLike && styles.superLikeCard
            ]}
          >
            {/* PROFILE IMAGE WITH BADGES */}
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: person.image }} 
                style={styles.profileImage} 
              />
              
              {/* SUPER LIKE BADGE */}
              {person.isSuperLike && (
                <View style={styles.superLikeBadge}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.superLikeText}>Super Like</Text>
                </View>
              )}
              
              {/* ONLINE INDICATOR */}
              {person.isOnline && (
                <View style={styles.onlineIndicator} />
              )}
              
              {/* TIME BADGE */}
              <View style={styles.timeBadge}>
                <Ionicons name="time" size={12} color="white" />
                <Text style={styles.timeText}>{person.time}</Text>
              </View>
            </View>

            {/* PROFILE INFO */}
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{person.name}, {person.age}</Text>
                <Ionicons name="location" size={14} color={colors.textSecondary} />
                <Text style={styles.distance}>{person.distance}</Text>
              </View>
              
              <Text style={styles.bio} numberOfLines={2}>
                {person.bio}
              </Text>
              
              {/* ACTION BUTTONS - TINDER STYLE */}
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={styles.passButton}
                  onPress={() => handlePass(person.id)}
                >
                  <View style={[styles.iconCircle, styles.passCircle]}>
                    <Ionicons name="close" size={28} color="#FF6B6B" />
                  </View>
                  <Text style={styles.passText}>Pass</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.messageButton}
                  onPress={() => handleMessage(person.id)}
                >
                  <View style={[styles.iconCircle, styles.messageCircle]}>
                    <Ionicons name="chatbubble" size={22} color={colors.textPrimary} />
                  </View>
                  <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.likeButton}
                  onPress={() => handleLike(person.id)}
                >
                  <View style={[styles.iconCircle, styles.likeCircle]}>
                    <Ionicons name="heart" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.likeText}>Like Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* PREMIUM UPSELL (but still free) */}
        <View style={styles.premiumCard}>
          <Ionicons name="diamond" size={30} color="#FFD700" />
          <View style={styles.premiumContent}>
            <Text style={styles.premiumTitle}>See Who Likes You - Free!</Text>
            <Text style={styles.premiumText}>
              Unlike other apps, we show all likes clearly without paying. 
              No blurry faces, no hidden profiles.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: "Manrope-ExtraBold",
    color: "#FF6B6B", // Tinder red
  },
  headerStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  statPillText: {
    fontSize: 14,
    fontFamily: "Manrope-Bold",
    color: "#FF6B6B",
    marginLeft: 5,
  },
  filterButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Manrope-SemiBold",
    color: "#666",
    marginTop: 20,
    marginBottom: 15,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  superLikeCard: {
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: width * 0.7, // Responsive height
  },
  superLikeBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  superLikeText: {
    color: "black",
    fontSize: 12,
    fontFamily: "Manrope-Bold",
    marginLeft: 5,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 15,
    right: 15,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
  },
  timeBadge: {
    position: "absolute",
    bottom: 15,
    left: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  timeText: {
    color: "white",
    fontSize: 11,
    fontFamily: "Manrope",
    marginLeft: 4,
  },
  profileInfo: {
    padding: 20,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontFamily: "Manrope-Bold",
    color: "#333",
    marginRight: 8,
  },
  distance: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  bio: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: "Manrope",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  passCircle: {
    backgroundColor: "#FFF0F0",
  },
  messageCircle: {
    backgroundColor: "#F0F0F0",
  },
  likeCircle: {
    backgroundColor: "#F0FFF0",
  },
  passButton: {
    alignItems: "center",
  },
  messageButton: {
    alignItems: "center",
  },
  likeButton: {
    alignItems: "center",
  },
  passText: {
    fontSize: 12,
    color: "#FF6B6B",
    fontFamily: "Manrope-SemiBold",
  },
  messageText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Manrope-SemiBold",
  },
  likeText: {
    fontSize: 12,
    color: "#4CAF50",
    fontFamily: "Manrope-SemiBold",
  },
  premiumCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  premiumContent: {
    flex: 1,
    marginLeft: 15,
  },
  premiumTitle: {
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    color: "#333",
    marginBottom: 5,
  },
  premiumText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});