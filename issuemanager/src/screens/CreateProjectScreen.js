import { View, Text } from "react-native";
import React from "react";
import ProjectForm from "../components/ProjectForm";
import { useDispatch } from "react-redux";
import { createProject } from "../redux/projectSlice";

const CreateProjectScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleCreateProject = async (data) => {
    dispatch(createProject(data))
      .then(() => {
        alert("Project created successfully!");
        navigation.navigate("Home");
      })
      .catch((error) => alert(`Error: ${error}`));
  };
  return <ProjectForm onSubmit={handleCreateProject} />;
};

export default CreateProjectScreen;
