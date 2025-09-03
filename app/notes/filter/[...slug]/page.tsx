import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes, NotesResponse } from "@/lib/api";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ page?: string }>;
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
