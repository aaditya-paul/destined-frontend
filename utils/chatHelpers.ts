import { Message } from "@/context/types";

// ─── Time Formatting ────────────────────────────────────────────────

/**
 * Format a timestamp for the chat list view.
 * Shows: "Now", "5m", "2h", "Yesterday", "Mon", "Feb 15"
 */
export function formatChatListTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const diffDays = Math.floor(
    (today.getTime() - messageDay.getTime()) / 86400000,
  );

  if (diffMins < 1) return "Now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffDays === 0) return `${diffHours}h`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)
    return date.toLocaleDateString("en-US", { weekday: "short" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Format a timestamp for display inside a message bubble.
 */
export function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Date Separators ────────────────────────────────────────────────

export function getDateSeparatorText(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor((today.getTime() - msgDay.getTime()) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)
    return date.toLocaleDateString("en-US", { weekday: "long" });
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function isDifferentDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() !== d2.getFullYear() ||
    d1.getMonth() !== d2.getMonth() ||
    d1.getDate() !== d2.getDate()
  );
}

// ─── Message Grouping ───────────────────────────────────────────────

export type MessagePosition = "single" | "first" | "middle" | "last";

/**
 * Determine the visual grouping position of a message (chronological order).
 */
export function getMessagePosition(
  messages: Message[],
  index: number,
): MessagePosition {
  const current = messages[index];
  const prev = index > 0 ? messages[index - 1] : null;
  const next = index < messages.length - 1 ? messages[index + 1] : null;

  const sameSenderAsPrev =
    prev != null &&
    prev.sender === current.sender &&
    !isDifferentDay(prev.timestamp, current.timestamp);
  const sameSenderAsNext =
    next != null &&
    next.sender === current.sender &&
    !isDifferentDay(next.timestamp, current.timestamp);

  if (!sameSenderAsPrev && !sameSenderAsNext) return "single";
  if (!sameSenderAsPrev && sameSenderAsNext) return "first";
  if (sameSenderAsPrev && sameSenderAsNext) return "middle";
  return "last";
}

// ─── Processed Chat Data for FlatList ───────────────────────────────

export type ChatListItem =
  | {
      type: "message";
      data: Message;
      position: MessagePosition;
      showTimestamp: boolean;
    }
  | { type: "separator"; text: string; id: string };

/**
 * Build an array of items for an inverted FlatList.
 * Includes date separators and message grouping metadata.
 * Returns newest-first for use with `inverted={true}`.
 */
export function buildChatListData(messages: Message[]): ChatListItem[] {
  if (messages.length === 0) return [];

  // Sort chronologically (oldest → newest)
  const sorted = [...messages].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  const items: ChatListItem[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const msg = sorted[i];
    const prev = i > 0 ? sorted[i - 1] : null;

    // Insert date separator when the day changes
    if (!prev || isDifferentDay(prev.timestamp, msg.timestamp)) {
      items.push({
        type: "separator",
        text: getDateSeparatorText(msg.timestamp),
        id: `sep-${msg.timestamp.toISOString().slice(0, 10)}`,
      });
    }

    const position = getMessagePosition(sorted, i);
    const isLastInGroup = position === "last" || position === "single";

    items.push({
      type: "message",
      data: msg,
      position,
      showTimestamp: isLastInGroup,
    });
  }

  // Reverse for inverted FlatList (newest at index 0 = bottom of screen)
  return items.reverse();
}

/**
 * Format "last active" time as a relative string.
 */
export function formatLastActive(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Active now";
  if (diffMins < 60) return `Active ${diffMins}m ago`;
  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 24) return `Active ${diffHours}h ago`;
  return "Active recently";
}
