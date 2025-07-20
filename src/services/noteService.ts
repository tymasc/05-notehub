import axios from "axios";
import { NoteTags, Note } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  results: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response = await instance.get("", { params });
  return response.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: NoteTags;
}): Promise<Note> => {
  const response = await instance.post("", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete(`/${id}`);
  return response.data;
};
