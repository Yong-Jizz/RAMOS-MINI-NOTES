import { createContext, useContext, useState, ReactNode } from "react";

type Note = {
  id: string;
  title: string;
  category: string;
};

type NotesContextType = {
  notes: Note[];
  addNote: (note: Note) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Study React Native", category: "School" },
    { id: "2", title: "Buy groceries", category: "Personal" },
    { id: "3", title: "Workout", category: "Health" },
  ]);

  const addNote = (note: Note) => {
    setNotes((prev) => [...prev, note]);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used inside provider");
  return context;
};