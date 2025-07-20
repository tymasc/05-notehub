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
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, perPage, search } = params;

  const queryParams: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search?.trim()) {
    queryParams.search = search;
  }

  const response = await instance.get("", { params: queryParams });
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
