import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../service/api";


export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
    try {
        const response = await axiosInstance.get("/projects");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createProject = createAsyncThunk("projects/createProject", async (data) => {
    try {
        const response = await axiosInstance.post("/projects", data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}  );

export const updateProject = createAsyncThunk("projects/updateProject", async (data) => {
    try {
        const response = await axiosInstance.put(`/projects/${data.id}`, data);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
} );
export const deleteProject = createAsyncThunk("projects/deleteProject", async (id) => {
    try {
        const response = await axiosInstance.delete(`/projects/${id}`);
        return id;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
}
);

const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchProjects.pending, (state) => {
            state.status = "loading";
        }); 
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(createProject.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.projects.push(action.payload);
            state.status = "success";
        });
        builder.addCase(createProject.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload
        });
        builder.addCase(updateProject.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(updateProject.fulfilled, (state, action) => {
            const index = state.projects.findIndex((project) => project.id === action.payload.id);
            state.projects[index] = action.payload;
            state.status = "success";
        });
        builder.addCase(updateProject.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(deleteProject.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.projects = state.projects.filter((project) => project.id !== action.payload);
            state.status = "success";
        });
        builder.addCase(deleteProject.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload
        });
    
    },
});

export default projectSlice.reducer;

{/*
    {
  "id": 1,
  "title": "New Website",
  "status": "Active",
  "start_date": "2023-12-01T00:00:00.000Z",
  "end_date": "2023-12-31T00:00:00.000Z",
  "project_manager":username 
}
status -> initail, active, completed * react-hook-form
    */  }