import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos,updateTodo,createTodo,deleteTodo } from "./todoSlice";
//import { createTodo, fetchTodos, updateTodo,deleteTodo } from "../store/todoActions";


const TodosScreen = () => {
  const dispatch = useDispatch();

  // Use fallback values to prevent accessing undefined
  const { todos, loading, error } = useSelector((state) => state.todos);

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if(newTodoTitle.trim() === '') {
        alert('Please enter a todo title');    
        return;
    }

    const newTodo = {
      title: newTodoTitle,
      completed: false,
    };
    dispatch(createTodo(newTodo));
    setNewTodoTitle('');
  };

  const handleUpdateTodo = () => {
    if (editingTitle.trim() === '') {
        alert('Please enter a todo title');
        return;
    }

    const updatedTodo = { ...editingTodo, title: editingTitle }; // Create the updated todo
    dispatch(updateTodo({ id: editingTodo.id, updatedTodo })); // Dispatch with correct parameters

    setEditingTodo(null); // Clear editing state
    setEditingTitle('');  // Clear input
};


  const handleDeleteTodo = (id) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => dispatch(deleteTodo(id)) },
  ]);
  };

  const toggleCompletion = (todo) => {
    dispatch(updateTodo({ id: todo.id, updatedTodo: { ...todo, completed: !todo.completed } }));
};

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Todos List</Text>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Add a new Todo"
                value={newTodoTitle}
                onChangeText={setNewTodoTitle}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>

        {todos.length > 0 ? (
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.todoContainer,
                            item.completed ? styles.completedTodo : styles.incompleteTodo,
                        ]}
                    >
                        {editingTodo?.id === item.id ? (
                            <View style={styles.editingContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={editingTitle}
                                    onChangeText={setEditingTitle}
                                />
                                <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTodo}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setEditingTodo(null)}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.todoRow}>
                                <Text style={styles.todoText}>{item.title}</Text>
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity
                                        style={styles.toggleButton}
                                        onPress={() => toggleCompletion(item)}
                                    >
                                        <Text>{item.completed ? "Unmark" : "Complete"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => {
                                            setEditingTodo(item);
                                            setEditingTitle(item.title);
                                        }}
                                    >
                                        <Text>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDeleteTodo(item.id)}
                                    >
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                )}
            />
        ) : (
            <Text style={styles.noTodos}>No todos available.</Text>
        )}
    </View>
);
};

export default TodosScreen;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9f9f9",
  },
  center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#333",
  },
  inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
  },
  input: {
      flex: 1,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      backgroundColor: "#fff",
  },
  addButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
  },
  addButtonText: {
      color: "#fff",
      fontWeight: "bold",
  },
  todoContainer: {
      marginBottom: 10,
      padding: 15,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
  },
  completedTodo: {
      backgroundColor: "#D4EDDA",
  },
  incompleteTodo: {
      backgroundColor: "#FFF3CD",
  },
  todoText: {
      fontSize: 16,
      color: "#333",
  },
  noTodos: {
      fontSize: 16,
      textAlign: "center",
      color: "#888",
      marginTop: 20,
  },
  editingContainer: {
      flexDirection: "row",
      alignItems: "center",
  },
  saveButton: {
      backgroundColor: "#4CAF50",
      padding: 10,
      borderRadius: 5,
      marginLeft: 10,
  },
  saveButtonText: {
      color: "#fff",
  },
  cancelButton: {
      backgroundColor: "#f44336",
      padding: 10,
      borderRadius: 5,
      marginLeft: 10,
  },
  cancelButtonText: {
      color: "#fff",
  },
  buttonGroup: {
      flexDirection: "row",
      marginLeft: "auto",
  },
  toggleButton: {
      paddingHorizontal: 10,
  },
  editButton: {
      paddingHorizontal: 10,
  },
  deleteButton: {
      paddingHorizontal: 10,
  },
  deleteButtonText: {
      color: "red",
  },
});
