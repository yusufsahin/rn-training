import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNote, fetchNotes, deleteNote, updateNote } from "./noteSlice";

const Notes = () => {
  const dispatch = useDispatch();
  const { notes, status, error } = useSelector((state) => state.note);
  const [noteText, setNoteText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleSaveNote = () => {
    if (!noteText.trim()) {
      Alert.alert("Uyarı", "Not içeriği boş olamaz.");
      return;
    }
  
    if (isEditing) {
      dispatch(updateNote({ id: currentNoteId, title: noteText.trim() }));
      Alert.alert("Note Updated", "Note has been updated successfully");
      setIsEditing(false);
      setCurrentNoteId(null);
    } else {
      dispatch(addNote({ title: noteText.trim() }));
      Alert.alert("Note Added", "Note has been added successfully");
    }
  
    setNoteText(""); // Reset the input field
  };
  
  const handleEditNote = (id, title) => {
    setNoteText(title);
    setIsEditing(true);
    setCurrentNoteId(id);
  };

  const handleDeleteNote = (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          dispatch(deleteNote(id));
          Alert.alert("Note Deleted", "Note has been deleted successfully");
        },
        style: "destructive",
      },
    ]);
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
      <Text style={styles.header}>Notlar</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a note..."
          value={noteText}
          onChangeText={setNoteText}
        />
        <TouchableOpacity
          style={[
            styles.button,
            isEditing ? styles.updateButton : styles.addButton,
          ]}
          onPress={handleSaveNote}
        >
          <Text style={styles.buttonText}>
            {isEditing ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEditNote(item.id, item.title)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteNote(item.id)}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz bir not eklenmedi.</Text>
        }
      />
    </View>
  );
};

export default Notes;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9f9f9",
    },
    header: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#333",
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderColor: "#ddd",
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      backgroundColor: "#fff",
    },
    button: {
      marginLeft: 10,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    addButton: {
      backgroundColor: "#28a745",
    },
    updateButton: {
      backgroundColor: "#007bff",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    noteItem: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: "#fff",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    noteTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionButton: {
      padding: 10,
      borderRadius: 5,
    },
    editButton: {
      backgroundColor: "#007bff",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
    },
    actionText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    emptyText: {
      textAlign: "center",
      color: "#aaa",
      marginTop: 20,
      fontSize: 16,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    statusText: {
      fontSize: 16,
      color: "#666",
    },
  });