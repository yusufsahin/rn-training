import axiosInstance from '../libs/axiosIntance';
import { FETCH_TODOS_FULFILLED,FETCH_TODOS_PENDING,FETCH_TODOS_REJECTED
    ,CREATE_TODO_PENDING,CREATE_TODO_FULFILLED,CREATE_TODO_REJECTED,
    UPDATE_TODO_PENDING,
    UPDATE_TODO_FULFILLED,
    UPDATE_TODO_REJECTED,DELETE_TODO_PENDING,
    DELETE_TODO_FULFILLED,
    DELETE_TODO_REJECTED
 } from './actionTypes';

export const fetchTodos=()=> async (dispatch) => {
    dispatch({type: FETCH_TODOS_PENDING});
    try { 
        const response = await axiosInstance.get('/todos');
        dispatch({type: FETCH_TODOS_FULFILLED, payload: response.data});
    } catch (error) {
        dispatch({type: FETCH_TODOS_REJECTED, payload: error.message});
    }
}

export const createTodo = (todo) => async (dispatch) => {
    dispatch({type: CREATE_TODO_PENDING});
    try {
        const response = await axiosInstance.post('/todos', todo);
        dispatch({type: CREATE_TODO_FULFILLED, payload: response.data});
    } catch (error) {
        dispatch({type: CREATE_TODO_REJECTED, payload: error.message});
    }
}

export const updateTodo = (id,updatedTodo) => async (dispatch) => {
    dispatch({type: UPDATE_TODO_PENDING});
    try {
        const response = await axiosInstance.put(`/todos/${id}`, updatedTodo);
        dispatch({type: UPDATE_TODO_FULFILLED, payload: response.data});
    } catch (error) {
        dispatch({type: UPDATE_TODO_REJECTED, payload: error.message});
    }
}

export const deleteTodo = (id) => async (dispatch) => {
    dispatch({type: DELETE_TODO_PENDING});
    try {
        await axiosInstance.delete(`/todos/${id}`);
        dispatch({type: DELETE_TODO_FULFILLED, payload: id});
    } catch (error) {
        dispatch({type: DELETE_TODO_REJECTED, payload: error.message});
    }
}