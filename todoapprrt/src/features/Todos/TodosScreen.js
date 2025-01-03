import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./todoSlice";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledInput from "../../app/ui/ControlledInput";

// Validation Schema
const schema = yup.object({
  todoTitle: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
});

const TodosScreen = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  const [editingTodo, setEditingTodo] = useState(null);

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { todoTitle: "" },
  });

  // Fetch todos on mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Add or Update Todo
  const handleAddOrUpdateTodo = (data) => {
    if (editingTodo) {
      // Update existing todo
      const updatedTodo = { ...editingTodo, title: data.todoTitle.trim() };
      dispatch(updateTodo({ id: editingTodo.id, updatedTodo }))
        .then(() => {
          Alert.alert("Success", "Todo updated successfully");
          setEditingTodo(null);
          reset();
        })
        .catch(() => Alert.alert("Error", "Failed to update todo"));
    } else {
      // Add new todo
      const newTodo = { title: data.todoTitle.trim(), completed: false };
      dispatch(createTodo(newTodo))
        .then(() => {
          Alert.alert("Success", "Todo added successfully");
          reset();
        })
        .catch(() => Alert.alert("Error", "Failed to add todo"));
    }
  };

  // Delete Todo
  const handleDeleteTodo = (id) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          dispatch(deleteTodo(id))
            .then(() => Alert.alert("Success", "Todo deleted successfully"))
            .catch(() => Alert.alert("Error", "Failed to delete todo")),
      },
    ]);
  };

  // Toggle Completion
  const toggleCompletion = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    dispatch(updateTodo({ id: todo.id, updatedTodo }))
      .then(() => console.log("Completion toggled"))
      .catch(() => Alert.alert("Error", "Failed to toggle completion"));
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
      <Text style={styles.title}>Todos</Text>

      {/* Add/Update Todo Form */}
      <View style={styles.inputContainer}>
        <ControlledInput
          name="todoTitle"
          control={control}
          placeholder={editingTodo ? "Edit todo" : "Add a new todo"}
          style={styles.input}
          errorMessage={
            // Pass validation error for this field
            control.getFieldState("todoTitle", control._formState)?.error?.message
          }
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleSubmit(handleAddOrUpdateTodo)}
        >
          <Text style={styles.addButtonText}>
            {editingTodo ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Todos List */}
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
                  setValue("todoTitle", item.title);
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
      />
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
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  toggleButton: {
    marginRight: 10,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButtonText: {
    color: "red",
  },
});
