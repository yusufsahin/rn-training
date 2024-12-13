import { StyleSheet, Text, View } from 'react-native'
import React, { use } from 'react'
import LoginForm from '../components/LoginForm'
import { useDispatch } from 'react-redux'
import { login } from '../service/authService'
import { setCredentials } from '../redux/authSlice'

const LoginScreen = () => {

    const dispatch = useDispatch();

    const handleLogin= async(data)=>{
        console.log(data);
      
        try{
        const  response= await login(data);
        dispatch(setCredentials(response));
        console.log(response);
        console.log('LoginScreen.js - handleLogin - data:', data);
        }catch(error){
            console.log('LoginScreen.js - handleLogin - error:', error);
        }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
      <LoginForm onSubmit={handleLogin}/>
    </View>
  )
}

export default LoginScreen

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
  });
  