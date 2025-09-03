'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import css from './NotesPage.module.css';
import { fetchNotes, NotesResponse } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
  initialTag?: string;
  initialPage?: number;
}

export default function NotesClient({ initialTag = '', initialPage = 1 }: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const perPage = 12;
  const tag = initialTag === 'All' ? '' : initialTag;

  const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', page, tag, debouncedSearch],
    queryFn: () => fetchNotes(tag, page, perPage, debouncedSearch),
    refetchOnWindowFocus: false,
  });

  // скидаємо сторінку при зміні пошуку
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (isError) toast.error('Something went wrong.');
    else if (!isLoading && data?.notes.length === 0) toast.error('No notes found.');
  }, [isError, data, isLoading]);

  return (
    <div className={css.app}>
      <Toaster position="top-center" />

      <header className={css.toolbar}>
        <SearchBox onChange={setSearch} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}

        <button className={css.button} onClick={() => setCreateModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && <NoteList notes={data?.notes ?? []} />}

      {isCreateModalOpen && (
        <Modal onClose={() => setCreateModalOpen(false)}>
          <NoteForm onCancel={() => setCreateModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
