import { StyleSheet, TextInput, View ,Button} from 'react-native'
import React, { useEffect,useState } from 'react'

const TodoInput = ({onAddTodo,editTodo,onCancelEdit}) => {

    const [input, setInput] = useState('');

    useEffect(() => {
        if (editTodo) {
          setInput(editTodo.title);
        } 
    }, [editTodo]);

    const handleSubmit = () => {
        onAddTodo(input);
        setInput('');
    }

  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder={editTodo? 'Edit Todo' : 'Enter Todo'} value={input} onChangeText={(text)=>setInput(text)}/>
      <Button title={editTodo ? 'Update' : 'Add'} onPress={handleSubmit} />
      {editTodo && (
        <Button title="Cancel" onPress={() => { setInput(''); onCancelEdit();}} color="red"/>
      )}
    </View>
  )
}

export default TodoInput;

const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: 'gray',
      flex: 1,
      marginRight: 10,
      padding: 8,
    },
  });
  