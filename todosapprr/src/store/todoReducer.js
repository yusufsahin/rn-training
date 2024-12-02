import {
    FETCH_TODOS_PENDING,
FETCH_TODOS_FULFILLED
,FETCH_TODOS_REJECTED,
CREATE_TODO_PENDING,
CREATE_TODO_FULFILLED,
CREATE_TODO_REJECTED
} from './actionTypes';

const initialState = {
    todos: [], // Initialize as an empty array
    loading: false,
    error: null,
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TODOS_FULFILLED:
            return {
                ...state,
                loading: false,
                todos: action.payload, // Add fetched todos
            };
        case FETCH_TODOS_REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload, // Capture error message
            };
        case CREATE_TODO_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_TODO_FULFILLED:
            return {
                ...state,
                loading: false,
                todos: [...state.todos, action.payload], // Add new todo to the list
            };
        case CREATE_TODO_REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload, // Capture error message
            };
        default:
            return state;
    }
};

export default todoReducer;
