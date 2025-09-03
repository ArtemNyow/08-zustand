import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

export const fetchNotes = async (
  tag: string = "",
  page: number,
  perPage: number = 12,
  search: string = ""
): Promise<NotesResponse> => {
  const queryParams: { page: number; perPage: number; tag?: string; search?: string } = { page, perPage };
  if (tag) queryParams.tag = tag;
  if (search) queryParams.search = search; // додали пошук

  const response = await axios.get<NotesResponse>(BASE_URL, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params: queryParams,
  });

  return response.data;
};


export const createNote = async (note: Pick<Note, "title" | "content" | "tag">): Promise<Note> => {
  const response = await axios.post<Note>(
    BASE_URL,
    note,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};



export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization:`Bearer ${TOKEN}`,
    },
  })
  return response.data;
}

export const fetchTags = async (): Promise<string[]> => {
  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
     params: { page: 1 ,perPage:15 },
  });

  const notes = response.data.notes;
  const tagsSet = new Set<string>();

  notes.forEach((note: { tag: string }) => {
    if (note.tag) tagsSet.add(note.tag);
  });

  return ["All", ...Array.from(tagsSet)];
};