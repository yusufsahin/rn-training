import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../service/api";



export const fetchWorkitems = createAsyncThunk("workitems/fetchWorkitems", async (projectId) => {
    try {
        const response = await axiosInstance.get(`/workitems/?projectId=${projectId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createWorkitem = createAsyncThunk("workitems/createWorkitem", async (data) => {
    try {
        const response = await axiosInstance.post("/workitems", data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateWorkitem = createAsyncThunk("workitems/updateWorkitem", async (data) => {
    try {
        const response = await axiosInstance.put(`/workitems/${data.id}`, data);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteWorkitem = createAsyncThunk("workitems/deleteWorkitem", async (id) => {
    try {
        const response = await axiosInstance.delete(`/workitems/${id}`);
        return id;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
}
);
const workitemSlice = createSlice({
    name: "workitems",
    initialState: {
        workitems: [],
        status: null,
        error: null,
        currentWorkitem: null,
    },
    reducers: {
        setWorkitem: (state, action) => {
            state.workitems = action.payload;
        },
    },
    extraReducers: (builder) => {
          builder.addCase(fetchWorkitems.pending, (state) => {
                    state.status = "loading";
                }); 
                builder.addCase(fetchWorkitems.fulfilled, (state, action) => {
                    state.workitems = action.payload;
                    state.status = "success";
                });
                builder.addCase(fetchWorkitems.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                });
                builder.addCase(createWorkitem.pending, (state) => {
                    state.status = "loading";
                });
                builder.addCase(createWorkitem.fulfilled, (state, action) => {
                    state.workitems.push(action.payload);
                    state.status = "success";
                });
                builder.addCase(createWorkitem.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                });
                builder.addCase(updateWorkitem.pending, (state) => {
                    state.status = "loading";
                });
                builder.addCase(updateWorkitem.fulfilled, (state, action) => {
                    state.workitems = state.workitems.map((workitem) => {
                        if (workitem.id === action.payload.id) {
                            return action.payload;
                        }
                        return workitem;
                    });
                    state.status = "success";
                });
                builder.addCase(updateWorkitem.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                });
                builder.addCase(deleteWorkitem.pending, (state) => {
                    state.status = "loading";
                });
                builder.addCase(deleteWorkitem.fulfilled, (state, action) => {
                    state.workitems = state.workitems.filter((workitem) => workitem.id !== action.payload);
                    state.status = "success";
                });
                builder.addCase(deleteWorkitem.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                });
    }

});
export const { setWorkitem } = workitemSlice.actions;
export default workitemSlice.reducer;