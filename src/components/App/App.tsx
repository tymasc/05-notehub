import css from "./App.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService";
import { useDebounce } from "../../hooks/useDebounce";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";

export default function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, refetch } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: (previousData) => previousData,
  });

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    refetch();
  };
  const results = data?.results ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        {totalPages > 1 && (
          <Pagination pageCount={totalPages} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {results.length > 0 && (
        <NoteList notes={results} onDelete={handleDelete} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccsess={() => {
              setIsModalOpen(false);
              refetch();
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
