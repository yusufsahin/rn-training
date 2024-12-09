import React, { useEffect,useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNote, fetchNotes } from "./noteSlice";

const Notes = () => {
  const dispatch = useDispatch();
  const { notes, status, error } = useSelector((state) => state.note);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleAddNote = () => {
    if (!newNoteTitle) return;
    dispatch(addNote({ title: newNoteTitle }));
    setNewNoteTitle("");
  };

  if (status === "loading") {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (status === "failed") {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notes</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Note"
          value={newNoteTitle}
          onChangeText={setNewNoteTitle}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      {notes.length > 0 ? (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              
            </View>
          )}
        />
      ) : (
        <Text>No Notes</Text>
      )}
    </View>
  );
};

export default Notes;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f5f5f5",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      backgroundColor: "#fff",
      marginRight: 10,
    },
    button: {
      backgroundColor: "#007bff",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    noteItem: {
      padding: 15,
      marginVertical: 10,
      backgroundColor: "#fff",
      borderRadius: 5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
    },
    noteTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    updateButton: {
      backgroundColor: "#28a745",
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
    },
  });
  