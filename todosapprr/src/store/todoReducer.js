import {
    FETCH_TODOS_PENDING,
FETCH_TODOS_FULFILLED
,FETCH_TODOS_REJECTED
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
        default:
            return state;
    }
};

export default todoReducer;
