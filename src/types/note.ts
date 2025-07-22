export type NoteTags = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTags;
  createdAt: string;
  updatedAt: string;
}
