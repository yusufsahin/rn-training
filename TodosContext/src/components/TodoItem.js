import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const TodoItem = ({todo,onToggle,onEdit,onDelete}) => {
  return (
    <View style={styles.container}>
        <Text style={[styles.title, todo.completed && styles.completed]}>{todo.title}</Text>
        <View style={styles.actions}>
            <Button title="Edit" onPress={()=>onEdit(todo)}>Edit</Button>
            <Button title="Delete" onPress={()=>onDelete(todo.id)} color="red">Delete</Button>
      </View>
    </View>
  )
}

export default TodoItem;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    title: { fontSize: 16 },
    completed: { textDecorationLine: 'line-through', color: '#aaa' },
    actions: { flexDirection: 'row', gap: 8 },
  });