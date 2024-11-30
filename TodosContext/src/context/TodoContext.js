import React,{ createContext, useReducer } from "react";
import jsonServer from "../api/jsonServer";


const TodoContext= createContext();

const todoReducer=(state,action)=>{

    switch(action.type){
        case 'get_todos':
            return action.payload;
        case 'add_todo':
            return [...state,action.payload];
        case 'delete_todo':
            return state.filter(todo=>todo.id!==action.payload);
        case 'toggle_todo':
            return state.map(todo=>todo.id===action.payload.id?action.payload:todo);
        case 'update_todo':
            return state.map(todo=>todo.id===action.payload.id?action.payload:todo);
        default:
            return state;
    }

};

const TodoProvider=({children})=>{

    const [state,dispatch]= useReducer(todoReducer,[]);

    const getTodos= async()=>{
        const response= await jsonServer.get('/todos');
        dispatch({type:'get_todos',payload:response.data});
    }

    const addTodo= async(title)=>{
        const response = await jsonServer.post('/todos',{title,completed:false});
        dispatch({type:'add_todo',payload:response.data});
    }

    const deleteTodo= async(id)=>{
        await jsonServer.delete(`/todos/${id}`);
        dispatch({type:'delete_todo',payload:id});
    }

    const toggleTodo=async(id)=>{
       const response= await jsonServer.put(`/todos/${id}`,{
        ...todo,completed:!todo.completed
       }); 
       dispatch({type:'toggle_todo',payload:response.data});
    }

    const updateTodo=async(id,title)=>{
        const response= await jsonServer.put(`/todos/${id}`,{title});
        dispatch({type:'update_todo',payload:response.data});
    }

    return <TodoContext.Provider value={{state,getTodos,addTodo,deleteTodo,toggleTodo,updateTodo}}>
        {children}
    </TodoContext.Provider>;
};

export {TodoProvider,TodoContext};