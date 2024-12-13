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
import { Formik } from "formik";
import * as yup from "yup";

// Validation Schema
const validationSchema = yup.object({
  todoTitle: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
});

const Todos = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Add or Update Todo
  const handleAddOrUpdateTodo = async (values, { resetForm }) => {
    try {
      if (editingTodo) {
        const updatedTodo = { ...editingTodo, title: values.todoTitle.trim() };
        await dispatch(updateTodo({ id: editingTodo.id, updatedTodo })).unwrap();
        Alert.alert("Success", "Todo updated successfully");
        setEditingTodo(null);
      } else {
        const newTodo = { title: values.todoTitle.trim(), completed: false };
        await dispatch(createTodo(newTodo)).unwrap();
        Alert.alert("Success", "Todo added successfully");
      }
      resetForm();
    } catch (err) {
      Alert.alert("Error", "Failed to save todo. Please try again.");
    }
  };

  // Delete Todo
  const handleDeleteTodo = (id) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await dispatch(deleteTodo(id)).unwrap();
            Alert.alert("Success", "Todo deleted successfully");
          } catch {
            Alert.alert("Error", "Failed to delete todo. Please try again.");
          }
        },
      },
    ]);
  };

  // Toggle Completion
  const toggleCompletion = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await dispatch(updateTodo({ id: todo.id, updatedTodo })).unwrap();
    } catch {
      Alert.alert("Error", "Failed to toggle completion.");
    }
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

      {/* Formik for Add/Update Todo */}
      <Formik
        initialValues={{ todoTitle: editingTodo ? editingTodo.title : "" }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleAddOrUpdateTodo}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={editingTodo ? "Edit todo" : "Add a new todo"}
              value={values.todoTitle}
              onChangeText={handleChange("todoTitle")}
              onBlur={handleBlur("todoTitle")}
            />
            {touched.todoTitle && errors.todoTitle && (
              <Text style={styles.errorText}>{errors.todoTitle}</Text>
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>
                {editingTodo ? "Update" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

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
                onPress={() => setEditingTodo(item)}
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

export default Todos;

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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
});
