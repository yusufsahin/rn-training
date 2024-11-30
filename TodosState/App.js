import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, Text, View,FlatList } from 'react-native';
import TodoList from './src/components/TodoList';
import TodoInput from './src/components/TodoInput';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const App=()=> {
const [todos, setTodos] = useState([]);
const [loading, setLoading] = useState(true);
const [editTodo, setEditTodo] = useState(null);

const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}?_limit=10`);
    setTodos(response.data);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
}

useEffect(() => {
  fetchTodos();
}, []);
const addTodoHandler = async (todoText) => {
  try {
    const response = await axios.post(API_URL, {
      title: todoText,
      completed: false,
    });
    setTodos((prevTodos) => [
      { id: response.data.id, title: todoText, completed: false },
      ...prevTodos,
    ]);
  } catch (error) {
    console.error('Error adding todo:', error);
    Alert.alert('Error', 'Could not add todo.');
  }
};

// Update a todo
const updateTodoHandler = async (todoText) => {
  if (!editTodo) return;

  try {
    await axios.put(`${API_URL}/${editTodo.id}`, {
      ...editTodo,
      title: todoText,
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editTodo.id ? { ...todo, title: todoText } : todo
      )
    );
    setEditTodo(null);
  } catch (error) {
    console.error('Error updating todo:', error);
    Alert.alert('Error', 'Could not update todo.');
  }
};

const deleteTodoHandler =async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  } catch (error) {
    console.error('Error deleting todo:', error);
    Alert.alert('Error', 'Could not delete todo.');
  } 
};
const handleAddOrUpdate = (todoText) => {
  if (editTodo) {
    updateTodoHandler(todoText);
  } else {
    addTodoHandler(todoText);
  }
};
  return (
    <View style={styles.screen}>
      
      {loading ? (<ActivityIndicator size="large" color="#0000ff"/>) : (
        <>
        <TodoInput onAddTodo={handleAddOrUpdate}
            editTodo={editTodo}
            onCancelEdit={() => setEditTodo(null)}
          />
        <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoList
                id={item.id}
                text={item.title}
                onDelete={deleteTodoHandler}
                onEdit={() => setEditTodo(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
});

export default App;