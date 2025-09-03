import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

type Props = { params: Promise<{ id: string }> };

export default async function NoteDetails({ params }: Props) {
  const { id } =  await params;

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
