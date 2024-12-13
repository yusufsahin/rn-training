import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const ControlledInput = ({name,control,placeholder,style,rules,defaultValue = "",errorMessage,}) => {
  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={style}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      },
      input: {
        flex: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        backgroundColor: "#fff",
      },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
