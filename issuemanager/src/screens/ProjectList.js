import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects,deleteProject } from "../redux/projectSlice";

const ProjectList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);

  // Fetch projects on component mount
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Handle delete project
  const handleDelete = (id) => {
    dispatch(deleteProject(id))
      .unwrap()
      .then(() => alert("Project deleted successfully!"))
      .catch((err) => alert(`Error: ${err}`));
  };

  if (status === "loading") {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (projects.length === 0) {
    return <Text style={styles.emptyText}>No projects found!</Text>;
  }

  return (
    <FlatList
      data={projects}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.projectItem}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Start: {item.start_date}</Text>
            <Text>End: {item.end_date}</Text>
            <Text>Manager: {item.project_manager}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onEdit(item)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  projectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  actions: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#FF4D4D",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#555",
  },
});

export default ProjectList;
