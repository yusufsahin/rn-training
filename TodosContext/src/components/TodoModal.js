import { Button, StyleSheet, TextInput, View } from "react-native";
import React,{useState} from "react";

const TodoModal = ({ isEdit, initialValue, onSave, onClose }) => {
  const [title, setTitle] = useState(initialValue || "");

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title can not be empty");
      return;
    }
    onSave(title);
    onClose();
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={isEdit ? "Edit Todo" : "New Todo"}
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Button title={isEdit ? "Update" : "Add"} onPress={handleSave} />
      <Button title="Cancel" onPress={onClose} color="red" />
    </View>
  );
};

export default TodoModal;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
});
