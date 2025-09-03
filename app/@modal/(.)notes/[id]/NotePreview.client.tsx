'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorMessage />;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <button className={css.backBtn} onClick={() => router.back()}>
              Back
            </button>
          </div>
          <div className={css.content}>{data.content}</div>
          <div className={css.date}>
            Created: {new Date(data.createdAt).toLocaleString()}
          </div>
          {data.tag && <span className={css.tag}>{data.tag}</span>}
        </div>
      </div>
    </Modal>
  );
}
