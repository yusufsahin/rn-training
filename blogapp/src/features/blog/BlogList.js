import React, { useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs,deleteBlog } from './blogSlice';

const BlogList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => dispatch(deleteBlog(id));

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditBlog', { blog: item })}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (status === 'loading') return <Text>Loading...</Text>;
  if (status === 'failed') return <Text>Error: {error}</Text>;

  return (
    <View>
     
    <TouchableOpacity onPress={() => navigation.navigate('EditBlog')}>
          <Text style={styles.editButton}>Create</Text>
        </TouchableOpacity>
    <FlatList
      data={blogs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  title: { fontSize: 18, fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  editButton: { color: '#4CAF50', fontWeight: 'bold' },
  deleteButton: { color: '#F44336', fontWeight: 'bold' },
});

export default BlogList;
