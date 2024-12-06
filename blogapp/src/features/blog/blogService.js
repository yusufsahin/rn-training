import api from "../../app/api/apiBuilder";


export const fetchAllBlogs = async () => {
    const response = await api.get("/posts");
    return response.data;
}

export const fetchBlog = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
}

export const createBlog = async (blog) => {
    const response = await api.post("/posts", blog);
    return response.data;
}

export const updateBlog = async (id,blog) => {        
    const response = await api.put(`/posts/${id}`, blog);
    return response.data;
}

export const deleteBlog = async (id) => {     
    const response = await api.delete(`/posts/${id}`);
    return id;
}