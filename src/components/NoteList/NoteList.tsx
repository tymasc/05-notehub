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
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{ note.title }</h2>
            <p className={css.content}>{ note.content }</p>
            <div className={css.footer}>
              <span className={css.tag}>{ note.tag }</span>
              <button className={css.button} onClick={() => { console.log("deleting note:", note); onDelete(note.id) }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
