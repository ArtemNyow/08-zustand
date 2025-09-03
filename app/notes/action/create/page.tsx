
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note in NoteHub. Save drafts and manage your notes easily.',

  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note in NoteHub. Save drafts and manage your notes easily.',
    url: 'https://08-zustand-eta-seven.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
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