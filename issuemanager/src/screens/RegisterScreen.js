import { StyleSheet, Text, View,TouchableOpacity, Alert} from 'react-native'
import React from 'react'

import { register } from '../service/authService';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen = ({navigation}) => {

  const handleRegister= async(data)=>{
  
    const {username,email,password} = data;
    const  response= await register({username,email,password});
    Alert.alert('Success', 'Account created successfully'); 

   
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register an account</Text>
      <RegisterForm onSubmit={handleRegister}/>

      <View style={styles.linkContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
});
