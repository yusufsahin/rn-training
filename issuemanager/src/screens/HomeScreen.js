import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProjectList from './ProjectList'

const HomeScreen = ({navigation}) => {
  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <Button title="Create Project" onPress={() => navigation.navigate('CreateProject')} />
      <ProjectList onEdit={(project)=>navigation.navigate("UpdateProject", { project })}/>
    </SafeAreaView>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});