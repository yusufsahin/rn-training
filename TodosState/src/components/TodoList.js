import React from 'react'

import { StyleSheet, Text, View,Button } from 'react-native';

const TodoList = ({ id, text, onDelete, onEdit }) => {
  return (
    <View style={styles.todoItem}>
      <Text>{text}</Text>
      <View style={styles.actions}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={() => onDelete(id)} color="red"/>
      </View>
    </View>
    
  )
}
const styles = StyleSheet.create({
    todoItem: {
      padding: 15,
      marginVertical: 8,
      backgroundColor: '#00ffff',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    actions: {
      flexDirection: 'row',
      gap: 10,
    },
  });
  
export default TodoList
