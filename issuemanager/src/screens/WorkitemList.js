import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import { fetchWorkitems,deleteWorkitem } from "../redux/workitemSlice";

const WorkitemList = ({ projectId }) => {
  const dispatch = useDispatch();
  const { workitems, status, error } = useSelector((state) => state.workitems);
  const navigation = useNavigation();
  // Fetch projects on component mount
  useEffect(() => {
    dispatch(fetchWorkitems(projectId));
  }, [dispatch]);

  // Handle delete project
  const handleDelete = (id) => {
    dispatch(deleteWorkitem(id))
      .unwrap() // Unwrap the promise
      .then(() => alert("Workitem deleted successfully!"))
      .catch((err) => alert(`Error: ${err}`));
  };

  if (status === "loading") {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (workitems.length === 0) {
    return <Text style={styles.emptyText}>No workitem found!</Text>;
  }

  return (
    <FlatList
      data={workitems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.projectItem}>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text>Status: {item.assigneduser}</Text>
          </View>
          <View style={styles.actions}>
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
  selectButton: {
    backgroundColor: "#007CDD",
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

export default WorkitemList;
