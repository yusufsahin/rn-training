import axiosInstance from '../libs/axiosIntance';
import { FETCH_TODOS_FULFILLED,FETCH_TODOS_PENDING,FETCH_TODOS_REJECTED
    ,CREATE_TODO_PENDING,CREATE_TODO_FULFILLED,CREATE_TODO_REJECTED
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