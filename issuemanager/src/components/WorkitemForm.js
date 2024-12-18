import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  status: yup
    .string()
    .oneOf(["todo", "wip", "toverify", "completed"])
    .required("Status is required"),
  start_date: yup
    .date()
    .typeError("Start date must be a valid date (YYYY-MM-DD)")
    .required("Start date is required"),
  end_date: yup
    .date()
    .typeError("End date must be a valid date (YYYY-MM-DD)")
    .min(yup.ref("start_date"), "End date must be after start date")
    .required("End date is required"),
  assignTo: yup.string().required("AssignTo is required"),
});

const WorkitemForm = ({ initialData,onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      title: "",
      status: "initial",
      start_date: "",
      end_date: "",
      assignTo: "",
    },
  });

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Workitem Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter Workitem title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

      <Text style={styles.label}>Status</Text>
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.input}
          >
            <Picker.Item label="To Do" value="todo" />
            <Picker.Item label="WIP" value="wip" />
            <Picker.Item label="To Verify" value="toverify" />
            <Picker.Item label="Completed" value="completed" />
          </Picker>
        )}
      />
      {errors.status && <Text style={styles.errorText}>{errors.status.message}</Text>}

      <Text style={styles.label}>Start Date</Text>
      <Controller
        control={control}
        name="start_date"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.start_date && (
        <Text style={styles.errorText}>{errors.start_date.message}</Text>
      )}

      <Text style={styles.label}>End Date</Text>
      <Controller
        control={control}
        name="end_date"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.end_date && (
        <Text style={styles.errorText}>{errors.end_date.message}</Text>
      )}

      <Text style={styles.label}>Project Manager</Text>
      <Controller
        control={control}
        name="assignTo"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.project_manager && (
        <Text style={styles.errorText}>{errors.project_manager.message}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(submitHandler)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WorkitemForm;
