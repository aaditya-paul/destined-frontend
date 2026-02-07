export const MICROCOPY = {
  splash: {
    title: "Fewer profiles. Better conversations.",
    subtitle: "Dating, without the noise.",
    // cta: "Start Properly",
    cta: "Shoot your shot",
  },

  auth: {
    oneAccountNote: "One account. Real people only.",
    otpHelper: "This keeps bots out. Humans in.",
  },

  intent: {
    title: "Why are you here?",
    helper: "Be honest. It decides who you meet.",
    footer: "Mismatched intent = no chat",
    options: {
      longTerm: "Long-term",
      dating: "Dating",
      casual: "Casual",
      figuringOut: "Still figuring it out",
    },
  },

  basicInfo: {
    locationHelper: "Approximate, not creepy.",
    ageNote: "Age can’t be edited later.",
  },

  verification: {
    title: "Quick reality check",
    subtitle: "Real people feel safer here.",
    cameraHint: "Turn your head and say the word.",
    verifying: "Verifying… usually under a minute.",
  },

  interests: {
    title: "What do you actually enjoy?",
    helper: "Pick things you’d talk about at 2 AM.",
    limitNote: "Max 7. Quality over chaos.",
  },

  lifestyle: {
    title: "The practical stuff",
    helper: "Deal-breakers save time.",
  },

  prompts: {
    title: "Say something worth replying to",
    helper: "Short beats clever.",
    emptyState: "This is why people match you.",
    examples: [
      "A perfect Sunday looks like…",
      "I won’t tolerate…",
      "Something I’m proud of…",
      "Unpopular opinion…",
    ],
  },

  voiceIntro: {
    title: "Let them hear you",
    helper: "15 seconds. No scripts.",
    skipWarning: "Profiles with voice get more replies.",
  },

  photos: {
    title: "Put a face to the words",
    rules: "Clear face. Recent. No group puzzles.",
    emptyState: "Yes, photos matter. Just not first.",
  },

  profilePreview: {
    title: "This is how you appear",
    cta: "Ready to be seen?",
  },

  home: {
    title: "Today’s picks",
    subtitle: "Chosen for intent and compatibility.",
    actions: {
      pass: "Not my person",
      like: "I’m interested",
    },
  },

  discover: {
    title: "Explore",
    subtitle: "Less curated. Still limited.",
    endState: "That’s enough for today.",
  },

  match: {
    title: "Mutual interest",
    subtitle: "Start with something real.",
    cta: "Reply to a prompt",
  },

  chat: {
    emptyState: "Good conversations start somewhere.",
    firstMessageHint: "Reply to what caught your attention.",
    ghostNudge: "Silence counts too.",
  },

  rooms: {
    title: "Shared spaces",
    subtitle: "Talk first. Match later.",
    cta: "Move to private chat",
  },

  profileSelf: {
    highVisibility: "Your profile is getting attention.",
    lowVisibility: "Improve your prompts to be seen more.",
  },

  notifications: {
    match: "Someone chose you back.",
    message: "They replied thoughtfully.",
    reminder: "You have a conversation waiting.",
  },

  settings: {
    pause: "Disappear without deleting.",
    report: "Context helps us act fairly.",
    delete: "No hard feelings.",
  },

  onboarding: {
    basicIdentity: {
      title: "THE BASICS",
      subtitle: "Let's get you set up.",
      sections: {
        identification: "WHO ARE YOU?",
        vitals: "THE DEETS",
        background: "CONTEXT",
      },
      fields: {
        firstName: { label: "FIRST NAME", placeholder: "Aaditya" },
        lastName: { label: "LAST NAME", placeholder: "Paul" },
        dob: { label: "BDAY" },
        gender: { label: "GENDER", placeholder: "Select" },
        height: { label: "HEIGHT" },
        heightFt: { label: "FT" },
        heightIn: { label: "IN" },
        lookingFor: {
          label: "INTERESTED IN",
          placeholder: "Select preference",
        },
        datingPref: { label: "VIBE", placeholder: "What's the move?" },
        location: { label: "WHERE U AT?", placeholder: "City, Country" },
        job: { label: "WHAT DO U DO?", placeholder: "Hustle / Job" },
        school: { label: "EDUCATION", placeholder: "College / Uni" },
      },
      nextBtn: "CONTINUE",
      ageNote: "You must be at least 18 to join this community.",
    },
    bioInterests: {
      title: "VIBE CHECK",
      subtitle: "Pass the vibe check.",
      bio: {
        label: "BIO",
        placeholder: "Yap session starts here... (keep it real)",
      },
      interests: {
        label: "YOUR INTERESTS",
        error: "SELECT AT LEAST 3 ATTRIBUTES.",
      },
      audio: {
        label: "VOICE NOTE",
        heading: "SAY SOMETHING",
        hint: {
          default: "TAP TO YAP",
          recording: "RECORDING...",
          recorded: "AUDIO CAPTURED",
        },
      },
      mcq: {
        label: "GUESS GAME",
        question: {
          label: "ASK SOMETHING",
          placeholder: "Bet they can't guess this...",
        },
        options: { label: "OPTIONS" },
        hint: "Mark the answer. Let them guess.",
      },
      nextBtn: "CONTINUE",
      backBtn: "BACK",
      errors: {
        bio: "YOUR STORY NEEDS MORE DETAIL (MIN 20 CHARS).",
        interests: "SELECT AT LEAST 3 ATTRIBUTES.",
        mcqOptions: "ALL MCQ OPTIONS MUST BE FILLED.",
        mcqAnswer: "SELECT THE CORRECT ANSWER.",
      },
    },
    profileBuilder: {
      title: "THE LOOK",
      subtitle: "Pics or it didn't happen.",
      uploaded: "UPLOADED",
      guide: {
        title: "CHEAT SHEET",
        items: [
          "No blurry pics",
          "Just you pls",
          "Good lighting",
          "Not from 2015",
        ],
      },
      finishBtn: "READY",
      backBtn: "BACK",
      error: "Add at least 2 photos to stand out.",
    },
  },
};
