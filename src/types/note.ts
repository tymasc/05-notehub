export type NoteTags = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  _id: string;
  title: string;
  content: string;
  tag: NoteTags;
}
