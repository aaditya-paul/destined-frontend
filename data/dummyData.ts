import { Chat, OnboardingData } from "@/context/types";

export const dummyProfiles: OnboardingData[] = [
  {
    firstName: "Sarah",
    lastName: "Mitchell",
    dateOfBirth: new Date(1999, 5, 15),
    gender: "Woman",
    lookingFor: "Men",
    datingPreference: "Long-term relationship",
    location: "New York, NY",
    height: "5'7\"",
    jobTitle: "Product Designer",
    school: "Parsons",
    bio: "Coffee enthusiast ☕ and weekend adventurer 🏔️. I design products that make people smile during the week and chase sunsets on weekends. Looking for someone who can keep up with my hiking pace and my terrible jokes.",
    interests: ["Hiking", "Coffee", "Design", "Photography", "Yoga", "Travel"],
    poll: {
      question: "Perfect Sunday vibes?",
      options: [
        { label: "Brunch & Gallery Hopping" },
        { label: "Hiking Adventure" },
        { label: "Netflix & Chill" },
      ],
      correctAnswerIndex: 1,
    },
    voiceNoteDuration: "0:42",
    voiceNoteUri:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Test audio
    images: [
      {
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        prompt: "Living my best life",
      },
      {
        uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop",
        prompt: "Weekend mood",
      },
      {
        uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop",
      },
    ],
    receivedCompliment: "Your hiking photos are amazing! Where was that taken?",
  },
  {
    firstName: "Jessica",
    lastName: "Chen",
    dateOfBirth: new Date(1997, 2, 22),
    gender: "Woman",
    lookingFor: "Everyone",
    datingPreference: "Figuring it out",
    location: "Brooklyn, NY",
    height: "5'5\"",
    jobTitle: "Digital Artist",
    school: "RISD",
    bio: "Creating worlds one pixel at a time 🎨. Gamer girl who loves competitive CoD and chill indie games. Also a sucker for vinyl records and live music. Let's grab boba and debate which Final Fantasy is the best.",
    interests: ["Gaming", "Art", "Music", "Anime", "Vinyl", "Boba"],
    poll: {
      question: "Friday night plans?",
      options: [
        { label: "Gaming Session" },
        { label: "Concert/Show" },
        { label: "Art Museum" },
      ],
      correctAnswerIndex: 0,
    },
    voiceNoteDuration: "1:03",
    images: [
      {
        uri: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1888&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1895&auto=format&fit=crop",
        prompt: "Studio vibes",
      },
      {
        uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1887&auto=format&fit=crop",
        prompt: "Concert nights",
      },
      {
        uri: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop",
      },
      undefined,
    ],
    receivedCompliment: "Finally someone who appreciates Final Fantasy!",
  },
  {
    firstName: "Emily",
    lastName: "Rodriguez",
    dateOfBirth: new Date(2000, 8, 8),
    gender: "Woman",
    lookingFor: "Men",
    datingPreference: "Short-term fun",
    location: "Jersey City, NJ",
    height: "5'6\"",
    jobTitle: "Marketing Manager",
    school: "NYU Stern",
    bio: "Fluent in sarcasm and emoji 😏. I run a startup by day and binge true crime podcasts by night. Looking for someone who can match my energy and doesn't mind spontaneous road trips.",
    interests: ["Travel", "Reading", "Podcasts", "Wine", "Running"],
    poll: {
      question: "Ideal date night?",
      options: [
        { label: "Trying New Restaurant" },
        { label: "Cozy Wine Bar" },
        { label: "Outdoor Activity" },
      ],
      correctAnswerIndex: 1,
    },
    voiceNoteDuration: "0:35",
    images: [
      {
        uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1887&auto=format&fit=crop",
        prompt: "Exploring new places",
      },
      {
        uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop",
        prompt: "Travel diaries",
      },
      undefined,
      undefined,
    ],
    receivedCompliment: "Love the sarcasm in your bio haha",
  },
  {
    firstName: "Maya",
    lastName: "Patel",
    dateOfBirth: new Date(1998, 11, 3),
    gender: "Woman",
    lookingFor: "Everyone",
    datingPreference: "New friends",
    location: "Manhattan, NY",
    height: "5'4\"",
    jobTitle: "Software Engineer",
    school: "MIT",
    bio: "Building apps and breaking stereotypes 💻. Tech nerd who's also obsessed with K-pop and Korean dramas. Can debug your code and recommend the perfect boba spot. Bonus points if you can teach me how to skateboard!",
    interests: ["Coding", "K-pop", "Boba", "Anime", "Tech", "Food"],
    poll: {
      question: "Late night craving?",
      options: [{ label: "Ramen" }, { label: "Pizza" }, { label: "Tacos" }],
      correctAnswerIndex: 0,
    },
    voiceNoteDuration: "0:58",
    images: [
      {
        uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1888&auto=format&fit=crop",
        prompt: "Coding life",
      },
      {
        uri: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        prompt: "Weekend vibes",
      },
      {
        uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop",
      },
      undefined,
    ],
    receivedCompliment: "K-pop and coding? We might be soulmates.",
  },
  {
    firstName: "Olivia",
    lastName: "Kim",
    dateOfBirth: new Date(1999, 4, 17),
    gender: "Woman",
    lookingFor: "Men",
    datingPreference: "Long-term relationship",
    location: "Queens, NY",
    height: "5'8\"",
    jobTitle: "Fitness Instructor",
    school: "Hunter College",
    bio: "Yoga instructor by day, dance enthusiast by night 🧘‍♀️💃. I believe in good vibes, green smoothies, and even better playlists. If you can't handle me at my burpees, you don't deserve me at my shavasana.",
    interests: ["Yoga", "Dance", "Wellness", "Music", "Cooking", "Nature"],
    poll: {
      question: "Morning routine starter?",
      options: [
        { label: "Workout" },
        { label: "Coffee First" },
        { label: "Meditation" },
      ],
      correctAnswerIndex: 0,
    },
    voiceNoteDuration: "0:47",
    images: [
      {
        uri: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1770&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1895&auto=format&fit=crop",
        prompt: "Fitness journey",
      },
      {
        uri: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1887&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
        prompt: "Living healthy",
      },
      {
        uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop",
      },
      {
        uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
      },
    ],
    receivedCompliment: "Your playlist must be fire 🔥",
  },
];

// ─── Time helpers for dummy data ─────────────────────────────────────
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const NOW = Date.now();

export const dummyChats: Chat[] = [
  // ── Chat 1: Jessica – Online, Typing, Unread ──────────────────────
  {
    id: "1",
    user: dummyProfiles[1],
    lastMessage: "Omg yes! FF7 Remake was incredible 🎮",
    unread: true,
    unreadCount: 2,
    isTyping: true,
    isOnline: true,
    messages: [
      // Yesterday
      {
        id: "j1",
        text: "Finally someone who appreciates Final Fantasy!",
        sender: "them",
        timestamp: new Date(NOW - 1 * DAY - 5 * HOUR),
        status: "read",
        reactions: [{ emoji: "❤️", sender: "user" }],
      },
      {
        id: "j2",
        text: "Haha right? It's literally a masterpiece",
        sender: "user",
        timestamp: new Date(NOW - 1 * DAY - 4.5 * HOUR),
        status: "read",
      },
      {
        id: "j3",
        text: "Which one's your favorite?",
        sender: "user",
        timestamp: new Date(NOW - 1 * DAY - 4.5 * HOUR + MINUTE),
        status: "read",
      },
      {
        id: "j4",
        text: "Ok don't judge me... FF10 😅",
        sender: "them",
        timestamp: new Date(NOW - 1 * DAY - 4 * HOUR),
        status: "read",
        replyTo: {
          id: "j3",
          text: "Which one's your favorite?",
          senderName: "You",
        },
      },
      {
        id: "j5",
        text: "Tidus and Yuna's story is elite tbh",
        sender: "them",
        timestamp: new Date(NOW - 1 * DAY - 4 * HOUR + MINUTE),
        status: "read",
        reactions: [
          { emoji: "😭", sender: "user" },
          { emoji: "💯", sender: "them" },
        ],
      },
      {
        id: "j6",
        text: "No judgment! That ending scene still hits hard",
        sender: "user",
        timestamp: new Date(NOW - 1 * DAY - 3.5 * HOUR),
        status: "read",
      },
      // Voice message from them
      {
        id: "j6v",
        text: "",
        sender: "them",
        timestamp: new Date(NOW - 1 * DAY - 3 * HOUR),
        status: "read",
        type: "voice",
        voiceUri:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        voiceDuration: 12,
      },
      // Today
      {
        id: "j7",
        text: "Have you played the FF7 Rebirth yet??",
        sender: "them",
        timestamp: new Date(NOW - 3 * HOUR),
        status: "read",
      },
      {
        id: "j8",
        text: "Not yet! Been meaning to. Is it good?",
        sender: "user",
        timestamp: new Date(NOW - 2.5 * HOUR),
        status: "read",
        replyTo: {
          id: "j7",
          text: "Have you played the FF7 Rebirth yet??",
          senderName: "Jessica",
        },
      },
      // Image message – game screenshot
      {
        id: "j8img",
        text: "",
        sender: "them",
        timestamp: new Date(NOW - 2 * HOUR),
        type: "image",
        imageUri:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
      },
      {
        id: "j8img2",
        text: "Look at this setup! 🎮",
        sender: "them",
        timestamp: new Date(NOW - 2 * HOUR + MINUTE),
        type: "image",
        imageUri:
          "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop",
      },
      {
        id: "j9",
        text: "Omg yes! FF7 Remake was incredible 🎮",
        sender: "them",
        timestamp: new Date(NOW - 8 * MINUTE),
        reactions: [{ emoji: "🔥", sender: "user" }],
      },
      {
        id: "j10",
        text: "Rebirth takes it to a whole other level",
        sender: "them",
        timestamp: new Date(NOW - 5 * MINUTE),
      },
    ],
  },

  // ── Chat 2: Maya – Online, No unread ──────────────────────────────
  {
    id: "2",
    user: dummyProfiles[3],
    lastMessage: "Can't wait!",
    unread: false,
    unreadCount: 0,
    isOnline: true,
    messages: [
      // 2 days ago
      {
        id: "ma1",
        text: "K-pop and coding? We might be soulmates 😂",
        sender: "them",
        timestamp: new Date(NOW - 2 * DAY - 3 * HOUR),
        status: "read",
        reactions: [
          { emoji: "😂", sender: "user" },
          { emoji: "😂", sender: "them" },
        ],
      },
      {
        id: "ma2",
        text: "Haha I try my best! What groups do you listen to?",
        sender: "user",
        timestamp: new Date(NOW - 2 * DAY - 2.5 * HOUR),
        status: "read",
      },
      {
        id: "ma3",
        text: "BTS obviously, but also NewJeans and aespa",
        sender: "them",
        timestamp: new Date(NOW - 2 * DAY - 2 * HOUR),
        status: "read",
      },
      {
        id: "ma4",
        text: "NewJeans are so good! Super Shy is on repeat",
        sender: "user",
        timestamp: new Date(NOW - 2 * DAY - 1.5 * HOUR),
        status: "read",
        reactions: [{ emoji: "🎵", sender: "them" }],
      },
      // Yesterday – voice message
      {
        id: "ma4v",
        text: "",
        sender: "them",
        timestamp: new Date(NOW - 1 * DAY - 7 * HOUR),
        status: "read",
        type: "voice",
        voiceUri:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        voiceDuration: 18,
      },
      {
        id: "ma5",
        text: "Ok I made a playlist of all the best K-pop tracks",
        sender: "them",
        timestamp: new Date(NOW - 1 * DAY - 6 * HOUR),
        status: "read",
        replyTo: {
          id: "ma4",
          text: "NewJeans are so good! Super Shy is on repeat",
          senderName: "You",
        },
      },
      {
        id: "ma6",
        text: "Including some underrated gems 💎",
        sender: "them",
        timestamp: new Date(NOW - 1 * DAY - 6 * HOUR + MINUTE),
        status: "read",
      },
      {
        id: "ma7",
        text: "Yesss please share! I need new music",
        sender: "user",
        timestamp: new Date(NOW - 1 * DAY - 5 * HOUR),
        status: "read",
        reactions: [{ emoji: "❤️", sender: "them" }],
      },
      // Today
      {
        id: "ma8",
        text: "I'll send you the playlist! 🎵",
        sender: "them",
        timestamp: new Date(NOW - 1 * HOUR),
        status: "read",
      },
      {
        id: "ma9",
        text: "Can't wait!",
        sender: "user",
        timestamp: new Date(NOW - 50 * MINUTE),
        status: "delivered",
      },
    ],
  },

  // ── Chat 3: Sarah – Offline, No unread, Long conversation ─────────
  {
    id: "3",
    user: dummyProfiles[0],
    lastMessage: "Absolutely! Saturday morning works 🥾",
    unread: false,
    unreadCount: 0,
    isOnline: false,
    lastActive: new Date(NOW - 3 * HOUR),
    messages: [
      // 3 days ago
      {
        id: "s1",
        text: "Your hiking photos are amazing! Where was that?",
        sender: "them",
        timestamp: new Date(NOW - 3 * DAY - 8 * HOUR),
        status: "read",
      },
      {
        id: "s2",
        text: "Thanks! That was Breakneck Ridge, about an hour north of the city",
        sender: "user",
        timestamp: new Date(NOW - 3 * DAY - 7.5 * HOUR),
        status: "read",
      },
      {
        id: "s3",
        text: "I've been wanting to go there forever!",
        sender: "them",
        timestamp: new Date(NOW - 3 * DAY - 7 * HOUR),
        status: "read",
        reactions: [{ emoji: "🏔️", sender: "user" }],
      },
      {
        id: "s4",
        text: "It's gorgeous. The scramble section is intense though 😅",
        sender: "user",
        timestamp: new Date(NOW - 3 * DAY - 6.5 * HOUR),
        status: "read",
      },
      // Image message – hiking photo
      {
        id: "s4img",
        text: "",
        sender: "user",
        timestamp: new Date(NOW - 3 * DAY - 6.2 * HOUR),
        status: "read",
        type: "image",
        imageUri:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
      },
      // Voice message – user describing the trail
      {
        id: "s4v",
        text: "",
        sender: "user",
        timestamp: new Date(NOW - 3 * DAY - 6 * HOUR),
        status: "read",
        type: "voice",
        voiceUri:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        voiceDuration: 23,
      },
      // 2 days ago
      {
        id: "s5",
        text: "I love a good challenge! Any other trails you'd recommend?",
        sender: "them",
        timestamp: new Date(NOW - 2 * DAY - 4 * HOUR),
        status: "read",
        replyTo: {
          id: "s4v",
          text: "🎤 Voice message",
          senderName: "You",
        },
      },
      {
        id: "s6",
        text: "Harriman State Park is great for a full day trip",
        sender: "user",
        timestamp: new Date(NOW - 2 * DAY - 3.5 * HOUR),
        status: "read",
      },
      {
        id: "s7",
        text: "And Bear Mountain if you want something easier but still scenic",
        sender: "user",
        timestamp: new Date(NOW - 2 * DAY - 3.5 * HOUR + MINUTE),
        status: "read",
      },
      {
        id: "s8",
        text: "We should totally plan a hike together!",
        sender: "them",
        timestamp: new Date(NOW - 2 * DAY - 3 * HOUR),
        status: "read",
        reactions: [
          { emoji: "🥾", sender: "user" },
          { emoji: "❤️", sender: "them" },
        ],
      },
      // Yesterday
      {
        id: "s9",
        text: "I'm so down! When are you free?",
        sender: "user",
        timestamp: new Date(NOW - 1 * DAY - 6 * HOUR),
        status: "read",
        replyTo: {
          id: "s8",
          text: "We should totally plan a hike together!",
          senderName: "Sarah",
        },
      },
      {
        id: "s10",
        text: "This weekend maybe? Saturday morning?",
        sender: "them",
        timestamp: new Date(NOW - 1 * DAY - 5 * HOUR),
        status: "read",
      },
      {
        id: "s11",
        text: "Absolutely! Saturday morning works 🥾",
        sender: "user",
        timestamp: new Date(NOW - 1 * DAY - 4.5 * HOUR),
        status: "read",
        reactions: [{ emoji: "🎉", sender: "them" }],
      },
    ],
  },

  // ── Chat 4: Emily – Offline recently, 1 unread ────────────────────
  {
    id: "4",
    user: dummyProfiles[2],
    lastMessage: "Surpriseee 🎉 I found the best taco spot",
    unread: true,
    unreadCount: 1,
    isOnline: false,
    lastActive: new Date(NOW - 45 * MINUTE),
    messages: [
      // Today
      {
        id: "e1",
        text: "Love the sarcasm in your bio haha",
        sender: "them",
        timestamp: new Date(NOW - 6 * HOUR),
        status: "read",
      },
      {
        id: "e2",
        text: "Sarcasm is my love language 😏",
        sender: "user",
        timestamp: new Date(NOW - 5.5 * HOUR),
        status: "read",
        reactions: [{ emoji: "😂", sender: "them" }],
      },
      {
        id: "e3",
        text: "Same! So what's your go-to spontaneous adventure?",
        sender: "them",
        timestamp: new Date(NOW - 5 * HOUR),
        status: "read",
      },
      {
        id: "e4",
        text: "Driving to a random town and finding the best food spot",
        sender: "user",
        timestamp: new Date(NOW - 4.5 * HOUR),
        status: "read",
        replyTo: {
          id: "e3",
          text: "Same! So what's your go-to spontaneous adventure?",
          senderName: "Emily",
        },
      },
      {
        id: "e5",
        text: "Ok but that's literally my thing too",
        sender: "them",
        timestamp: new Date(NOW - 4 * HOUR),
        status: "read",
        reactions: [
          { emoji: "🤝", sender: "user" },
          { emoji: "🤝", sender: "them" },
        ],
      },
      // Voice message from user
      {
        id: "e5v",
        text: "",
        sender: "user",
        timestamp: new Date(NOW - 3.8 * HOUR),
        status: "read",
        type: "voice",
        voiceUri:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        voiceDuration: 8,
      },
      {
        id: "e6",
        text: "We might need to test this theory then 🗺️",
        sender: "user",
        timestamp: new Date(NOW - 3.5 * HOUR),
        status: "delivered",
      },
      // Voice message from them
      {
        id: "e6v",
        text: "",
        sender: "them",
        timestamp: new Date(NOW - 1 * HOUR),
        type: "voice",
        voiceUri:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        voiceDuration: 15,
      },
      {
        id: "e7",
        text: "Surpriseee 🎉 I found the best taco spot",
        sender: "them",
        timestamp: new Date(NOW - 30 * MINUTE),
        replyTo: {
          id: "e5v",
          text: "🎤 Voice message",
          senderName: "You",
        },
      },
      // Image message – taco spot photo
      {
        id: "e7img",
        text: "",
        sender: "them",
        timestamp: new Date(NOW - 28 * MINUTE),
        type: "image",
        imageUri:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1980&auto=format&fit=crop",
      },
    ],
  },

  // ── Chat 5: Olivia – Offline, Old conversation ────────────────────
  {
    id: "5",
    user: dummyProfiles[4],
    lastMessage: "Anything high energy! EDM, hip hop, pop",
    unread: false,
    unreadCount: 0,
    isOnline: false,
    lastActive: new Date(NOW - 2 * DAY),
    messages: [
      // 3 days ago
      {
        id: "o1",
        text: "Your playlist must be fire 🔥",
        sender: "them",
        timestamp: new Date(NOW - 3 * DAY - 2 * HOUR),
        status: "read",
      },
      {
        id: "o2",
        text: "Haha it's a mix of everything honestly",
        sender: "user",
        timestamp: new Date(NOW - 3 * DAY - 1.5 * HOUR),
        status: "read",
      },
      // Voice message – sharing a song snippet
      {
        id: "o2v",
        text: "",
        sender: "user",
        timestamp: new Date(NOW - 3 * DAY - 1.3 * HOUR),
        status: "read",
        type: "voice",
        voiceUri:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        voiceDuration: 10,
        reactions: [{ emoji: "🔥", sender: "them" }],
      },
      {
        id: "o3",
        text: "Love that! I need good workout playlists",
        sender: "them",
        timestamp: new Date(NOW - 3 * DAY - 1 * HOUR),
        status: "read",
        replyTo: {
          id: "o2v",
          text: "🎤 Voice message",
          senderName: "You",
        },
      },
      {
        id: "o4",
        text: "I'll put one together for you! What's your vibe?",
        sender: "user",
        timestamp: new Date(NOW - 3 * DAY - 45 * MINUTE),
        status: "read",
      },
      {
        id: "o5",
        text: "Anything high energy! EDM, hip hop, pop",
        sender: "them",
        timestamp: new Date(NOW - 3 * DAY - 30 * MINUTE),
        status: "read",
        reactions: [{ emoji: "🎶", sender: "user" }],
      },
    ],
  },
];

export const dummyNewMatches: OnboardingData[] = [
  dummyProfiles[4], // Olivia
  dummyProfiles[2], // Emily
  dummyProfiles[0], // Sarah
];
