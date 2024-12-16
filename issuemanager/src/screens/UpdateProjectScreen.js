import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import ProjectForm from '../components/ProjectForm';
import { updateProject } from '../redux/projectSlice';

const UpdateProjectScreen = ({route,navigation}) => {

    const {project}=route.params;
    const dispatch= useDispatch();
    const handleUpdate=async(data)=>{
        console.log(data);
        dispatch(updateProject(data))
        .then(()=>{
            alert('Project updated successfully!');
            navigation.navigate('Home');
        })
        .catch((error)=>alert(`Error: ${error}`));
    };
    return <ProjectForm initialData={project} isEdit={true} onSubmit={handleUpdate} />;
}

export default UpdateProjectScreen