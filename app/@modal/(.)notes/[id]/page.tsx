import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface NotePreviewPageProps {
  params: Promise<{ id: string }>; 
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const { id } = await params; 

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn:() => fetchNoteById(id),
  }
  )

    ;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}
