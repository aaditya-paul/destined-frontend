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

export const dummyChats: Chat[] = [
  {
    id: "1",
    user: dummyProfiles[1], // Jessica
    lastMessage: "Omg yes! FF7 Remake was so good.",
    unread: true,
    messages: [
      {
        id: "m1",
        text: "Finally someone who appreciates Final Fantasy!",
        sender: "them",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "m2",
        text: "Haha right? It's a classic.",
        sender: "user",
        timestamp: new Date(Date.now() - 80000000),
      },
      {
        id: "m3",
        text: "Omg yes! FF7 Remake was so good.",
        sender: "them",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      },
    ],
  },
  {
    id: "2",
    user: dummyProfiles[3], // Maya
    lastMessage: "I'll send you the playlist!",
    unread: false,
    messages: [
      {
        id: "m1",
        text: "K-pop and coding? We might be soulmates.",
        sender: "them",
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: "m2",
        text: "Haha I try my best! What groups do you like?",
        sender: "user",
        timestamp: new Date(Date.now() - 170000000),
      },
      {
        id: "m3",
        text: "I'll send you the playlist!",
        sender: "them",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      },
    ],
  },
];

export const dummyNewMatches: OnboardingData[] = [
  dummyProfiles[4], // Olivia
  dummyProfiles[2], // Emily
];
