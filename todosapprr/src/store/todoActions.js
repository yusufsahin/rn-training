import axiosInstance from '../libs/axiosIntance';
import { FETCH_TODOS_FULFILLED,FETCH_TODOS_PENDING,FETCH_TODOS_REJECTED } from './actionTypes';

export const fetchTodos=()=> async (dispatch) => {
    dispatch({type: FETCH_TODOS_PENDING});
    try { 
        const response = await axiosInstance.get('/todos');
        dispatch({type: FETCH_TODOS_FULFILLED, payload: response.data});
    } catch (error) {
        dispatch({type: FETCH_TODOS_REJECTED, payload: error.message});
    }
}