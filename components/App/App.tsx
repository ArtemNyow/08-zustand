import { keepPreviousData, useQuery,  } from "@tanstack/react-query";

import Loader from "../Loader/Loader";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { useState, useEffect } from "react";
import SearchBox from "../SearchBox/SearchBox";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
import { fetchNotes, NotesResponse } from "@/lib/api";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(debouncedSearch, page, perPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong.");
    } else if (data && data.notes.length === 0) {
      toast.error("No notes found.");
    }
  }, [isError, data]);

  return (
    <div className={css.app}>
      <Toaster position="top-center" />

      <header className={css.toolbar}>
        <SearchBox onChange={setSearch} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

     {!isLoading && !isError && (
  <NoteList notes={data?.notes ?? []} />
)}
     {isModalOpen && (
  <Modal onClose={() => setModalOpen(false)}>
    <NoteForm onCancel={() => setModalOpen(false)} />
  </Modal>
)}
    </div>
  );
}

