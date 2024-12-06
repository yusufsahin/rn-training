import React from 'react'
import { useDispatch } from 'react-redux';
import BlogForm from './BlogForm';
import { addBlog, updateBlogById } from './blogSlice';

const EditBlog = ({route,navigation}) => {

    const { blog } = route.params || {};
    const dispatch=useDispatch();

    const handleSubmit = (values) => {

        if(blog?.id){
            dispatch(updateBlogById({ id: blog.id, blog: values }));  }
        else{     
            dispatch(addBlog(values));
        }
        navigation.goBack();
    };

  return <BlogForm initialValues={blog} onSubmit={handleSubmit} />;
}

export default EditBlog;

