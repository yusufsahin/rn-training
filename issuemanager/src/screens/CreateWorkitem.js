import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const CreateWorkitem = () => {
  const { currentProject } = useSelector((state) => state.projects);
  const token = useSelector((state) => state.auth.token);

  const handleCreateWorkitem = async (projectId) => {
    if (!projectId) {
      Alert.alert("Error", "No current project selected.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.4:3000/workitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: "workitem 1",
          assigneduser: "suedoe",
          projectId: projectId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create workitem.");
      }

      const data = await response.json();
      Alert.alert("Success", `Workitem created with ID: ${data.id}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Workitem</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => handleCreateWorkitem(currentProject?.id)}
      >
        <Text style={styles.buttonText}>
          Create Workitem for {currentProject?.id || "No Project Selected"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateWorkitem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
