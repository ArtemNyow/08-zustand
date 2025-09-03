import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes, NotesResponse } from "@/lib/api";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ page?: string }>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || "All";

  return {
    title: `Notes tagged with ${tag} | NoteHub`,
    description: `Browse notes filtered by ${tag} tag.`,
    openGraph: {
      title: `Notes tagged with ${tag} | NoteHub`,
      description: `Browse notes filtered by ${tag} tag.`,
      url: `/notes/filter/${tag}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}


export default async function NotesPage({ params, searchParams }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] && slug[0] !== "All" ? slug[0] : "";

  const page = searchParams ? Number((await searchParams).page ?? 1) : 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<NotesResponse>({
    queryKey: ["notes", page, tag],
    queryFn: () => fetchNotes(tag, page, 12),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} initialPage={page} />
    </HydrationBoundary>
  );
}
