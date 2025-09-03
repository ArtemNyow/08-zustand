import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };


export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: "Note not found | NoteHub",
      description: "The requested note does not exist.",
      openGraph: {
        title: "Note not found | NoteHub",
        description: "The requested note does not exist.",
        url: `/notes/${id}`,
        images: [
          "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        ],
      },
    };
  }

  return {
    title: `${note.title} | NoteHub`,
    description: note.content.slice(0, 150),
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 150),
      url: `/notes/${id}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
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
