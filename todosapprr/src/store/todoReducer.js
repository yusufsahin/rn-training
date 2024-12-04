import {
    CREATE_TODO_FULFILLED,
    CREATE_TODO_PENDING,
    CREATE_TODO_REJECTED,
    DELETE_TODO_FULFILLED,
    DELETE_TODO_PENDING,
    DELETE_TODO_REJECTED,
    FETCH_TODOS_FULFILLED,
    FETCH_TODOS_PENDING,
    FETCH_TODOS_REJECTED,
    UPDATE_TODO_FULFILLED,
    UPDATE_TODO_PENDING,
    UPDATE_TODO_REJECTED
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
        case UPDATE_TODO_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_TODO_FULFILLED:
            return {
                ...state,
                loading: false,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
                ),
            };
        case UPDATE_TODO_REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload, // Capture error message
            };
        case DELETE_TODO_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_TODO_FULFILLED:
            return {
                ...state,
                loading: false,
                todos: state.todos.filter((todo) => todo.id !== action.payload), // Remove deleted todo
            };
        case DELETE_TODO_REJECTED:
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
