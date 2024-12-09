import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../../app/api/firebase";

const notesCollectionRef = collection(db, "notes");

// Fetch All Notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(notesCollectionRef);
      const notes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return notes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create Note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (note, thunkAPI) => {
    try {
      const docRef = await addDoc(notesCollectionRef, note);
      return { id: docRef.id, ...note };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, title }, thunkAPI) => {
    try {
      const noteDocRef = doc(db, "notes", id);
      await updateDoc(noteDocRef, { title }); // Update only the title field
      return { id, title }; // Return updated data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId, thunkAPI) => {
    try {
      const noteDocRef = doc(db, "notes", noteId);
      await deleteDoc(noteDocRef);
      return noteId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.notes = action.payload;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(addNote.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.notes.push(action.payload);
    });
    builder.addCase(addNote.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(updateNote.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        // Replace the note at the found index
        state.notes[index] = action.payload;
      }
    });

    builder.addCase(updateNote.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(deleteNote.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.filter((note) => note.id !== action.payload); // Remove the deleted note
      });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default noteSlice.reducer;
