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

export interface MessageReaction {
  emoji: string;
  sender: "user" | "them";
}

export interface ReplyRef {
  id: string;
  text: string;
  senderName: string;
}

/** A single image or video inside a message. */
export interface MediaItem {
  uri: string;
  type: "image" | "video";
  caption?: string;
  /** Width in pixels (when available from picker). */
  width?: number;
  /** Height in pixels (when available from picker). */
  height?: number;
  /** Duration in seconds (video only). */
  duration?: number;
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "them";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
  type?: "text" | "image" | "voice" | "video" | "media";
  imageUri?: string;
  videoUri?: string;
  videoDuration?: number; // seconds
  /** Grouped media (photos + videos in one message). */
  media?: MediaItem[];
  /** Caption for a single-media message (kept for backwards compat). */
  caption?: string;
  voiceUri?: string;
  voiceDuration?: number; // seconds
  replyTo?: ReplyRef;
  reactions?: MessageReaction[];
  isDeleted?: boolean;
}

export interface Chat {
  id: string;
  user: OnboardingData;
  lastMessage: string;
  unread: boolean;
  unreadCount?: number;
  messages: Message[];
  isTyping?: boolean;
  isOnline?: boolean;
  lastActive?: Date;
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
