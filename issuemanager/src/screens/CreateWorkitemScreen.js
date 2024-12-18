import { View, Text } from "react-native";
import React from "react";

import { useDispatch } from "react-redux";
import { createWorkitem } from "../redux/workitemSlice";
import WorkitemForm from "../components/WorkitemForm";
import { useSelector } from "react-redux";

const CreateWorkitemScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { currentProject } = useSelector((state) => state.projects);

  const handleCreateWorkitem = async (data) => {
    dispatch(createWorkitem({...data,projectId:currentProject.id}))
      .then(() => {
        alert("Workitem created successfully!");
        navigation.navigate("ProjectDetail");
      })
      .catch((error) => alert(`Error: ${error}`));
  };
  return <WorkitemForm onSubmit={handleCreateWorkitem} />;
};

export default CreateWorkitemScreen;
