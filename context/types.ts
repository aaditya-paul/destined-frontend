export interface PollData {
  question: string;
  options: { label: string }[];
  correctAnswerIndex: number | null;
}

export type Gender = "Man" | "Woman" | "Non-binary" | "Prefer not to say" | "";
export type LookingFor = "Men" | "Women" | "Everyone" | "";
export type DatingPreference =
  | "Long-term relationship"
  | "Short-term fun"
  | "Figuring it out"
  | "New friends"
  | "";

export interface OnboardingData {
  // Basic Identity
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  lookingFor: LookingFor;
  datingPreference: DatingPreference;
  location: string;
  height: string;
  jobTitle: string;
  school: string;

  // Bio & Interests (The Narrative)
  bio: string;
  interests: string[];
  poll: PollData;
  voiceNoteDuration: string | null; // For layout purposes
  voiceNoteUri?: string | null; // Actual file path

  // Visuals
  images: (ImageItem | undefined)[];

  // Interaction
  receivedCompliment?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "them";
  timestamp: Date;
}

export interface Chat {
  id: string;
  user: OnboardingData;
  lastMessage: string;
  unread: boolean;
  messages: Message[];
}

export interface ImageItem {
  uri: string;
  prompt?: string;
}

export interface OnboardingContextType {
  data: OnboardingData;
  updateData: (partial: Partial<OnboardingData>) => void;
  resetData: () => void;
}
