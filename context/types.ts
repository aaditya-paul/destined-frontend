export interface PollData {
  question: string;
  options: { label: string; percent: string }[];
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
  voiceNoteDuration: string | null; // For now just a duration string to simulate presence

  // Visuals
  images: (ImageItem | undefined)[];
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
