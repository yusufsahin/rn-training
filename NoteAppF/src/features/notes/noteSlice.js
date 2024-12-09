import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs,addDoc, doc } from "firebase/firestore";
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
      const docRef= await addDoc(notesCollectionRef, note);
      return {id: docRef.id, ...note};
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
  },
});

export default noteSlice.reducer;
