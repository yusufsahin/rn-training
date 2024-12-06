import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as blogService from "./blogService";

export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, thunkAPI) => {
    try {
      return await blogService.fetchAllBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (blog, thunkAPI) => {
    try {
      return await blogService.createBlog(blog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBlogById = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, blog }, thunkAPI) => {
    try {
      return await blogService.updateBlog(id, blog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchBlogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //addBlog
      .addCase(addBlog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs.push(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateBlogById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateBlogById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.blogs.findIndex(
          (blog) => blog.id === action.payload.id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlogById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteBlog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetState } = blogSlice.actions;
export default blogSlice.reducer;
