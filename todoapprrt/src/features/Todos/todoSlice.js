import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../app/libs/axiosIntance";

// Fetch all todos
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/todos");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Create a new todo
export const createTodo = createAsyncThunk(
    "todos/createTodo",
    async (newTodo, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/todos", newTodo);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Update an existing todo
export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async ({ id, updatedTodo }, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/todos/${id}`, updatedTodo);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


// Delete a todo
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(`/todos/${id}`);
            return id; // Return the deleted todo's ID
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Create the slice
const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    reducers: {}, // Reducers not required as we are using extraReducers for all operations
    extraReducers: (builder) => {
        builder
            // Fetch Todos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Todo
            .addCase(createTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload); // Add the new todo
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Todo
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo
                );
            });
            builder.addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Todo
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default todoSlice.reducer;
