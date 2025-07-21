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

  const handleDelete = async (id: number) => {
    await deleteNote(Number(id));
    refetch();
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination pageCount={totalPages} onPageChange={setPage} currentPage={page}/>
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} onDelete={handleDelete} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => {
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
