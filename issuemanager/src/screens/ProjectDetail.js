import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import WorkitemList from './WorkitemList';

const ProjectDetail = () => {
   const {currentProject}=useSelector((state)=>state.projects);
   const navigation= useNavigation();

    return (
    <View>
      <Text>ProjectDetail</Text>
        <Text>Title: {currentProject.title}</Text>
        <Text>Description: {currentProject.description}</Text>
        <Text>Status: {currentProject.status}</Text>
        <Text>Start Date: {currentProject.startDate}</Text>
        <Text>End Date: {currentProject.endDate}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('CreateWorkitem')}>
        <Text>Create workitem</Text>

        <WorkitemList projectId={currentProject.id}/>
        </TouchableOpacity>
    </View>
  )
}

export default ProjectDetail

const styles = StyleSheet.create({})