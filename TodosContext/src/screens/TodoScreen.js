import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { TodoContext } from '../context/TodoContext';
import TodoItem from '../components/TodoItem';
import TodoModal from '../components/TodoModal';

const TodoScreen = () => {
  const { state, getTodos, addTodo, deleteTodo, toggleTodo, updateTodo } =
    useContext(TodoContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  const handleAdd = () => {
    setEditMode(false);
    setModalVisible(true);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setEditMode(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        keyExtractor={(todo) => String(todo.id)}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onEdit={handleEdit}
            onDelete={deleteTodo}
          />
        )}
      />
      <Button title="Add Todo" onPress={handleAdd} />

      <Modal visible={isModalVisible} animationType="slide">
        <TodoModal
          isEdit={isEditMode}
          initialValue={isEditMode ? editingTodo.title : ''}
          onSave={isEditMode ? (title) => updateTodo(editingTodo.id, title) : addTodo}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default TodoScreen;
