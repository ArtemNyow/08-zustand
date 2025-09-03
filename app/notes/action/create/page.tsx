
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub. Save drafts and manage your notes easily.",
  alternates: {
    canonical: "https://08-zustand-eta-seven.vercel.app/notes/action/create",
  },
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub. Save drafts and manage your notes easily.",
    url: "https://08-zustand-eta-seven.vercel.app/notes/action/create", 
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }
    ],
  },
};
export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}