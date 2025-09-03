import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

type Props = { params: Promise<{ id: string }> };


export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  let note: Note | null = null;

  try {
    note = await fetchNoteById(id);
  } catch  {
    note = null;
  }

  const title = note ? note.title : "Note not found";
  const description = note
    ? note.content.slice(0, 160) 
    : "This note does not exist.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-eta-seven.vercel.app/notes/${id}`, 
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Preview",
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
