import css from "./NoteList.module.css";
import { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li className={css.listItem}>
            <h2 className={css.title}>Note title</h2>
            <p className={css.content}>Note content</p>
            <div className={css.footer}>
              <span className={css.tag}>Note tag</span>
              <button className={css.button} onClick={() => onDelete(note._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
