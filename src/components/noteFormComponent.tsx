import React, { useState } from "react";
import { NoteData } from "../models/NoteData";
import BackendService from "../services/BackendService";

interface NoteFormProps {
  initialNote: NoteData;
  index: number | null;
  isEdit: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const NoteFormComponent: React.FC<NoteFormProps> = ({ initialNote, index, isEdit, onSubmit, onCancel }) => {
  const [note, setNote] = useState<NoteData>(initialNote);

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isEdit && index !== null) {
      await BackendService.updateNoteData(index, note);
    } else {
      await BackendService.postNoteData(note);
      setNote({title: '', content: ''});
    }
    onSubmit();
  };

  const handleCancel = () => {
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleNoteChange}
        />
      </div>
      <div>
        <textarea
          name="content"
          placeholder="Content"
          value={note.content}
          onChange={handleNoteChange}
        />
      </div>
      <section>
      {
        isEdit ? (<button onClick={()=> handleCancel()}>Cancel</button>) : (<></>)
      }
      <button type="submit">{isEdit ? "Update Note" : "Submit Note"}</button>
      </section>
    </form>
  );
};

export default NoteFormComponent;
