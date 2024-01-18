import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const PostPage = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem('posts')) || []
  );
  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });

  // Every time the posts state changes, this effect will run and update localStorage.
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // This function will handle the title and content inputs.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // This function will be triggered when the 'Add Post' button is clicked.
  const addPost = () => {
    if (!newPost.title || !newPost.content) {
      alert("Please fill in both title and content.");
      return;
    }
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    setNewPost({ title: '', content: '' }); // Reset for next post

    // No need to explicitly call localStorage.setItem here since it will
    // be called by the effect hook whenever posts array is updated.
  };

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <h2>Create Post</h2>
        <Input
          placeholder="Post Title"
          style={{ marginBottom: '10px' }}
          value={newPost.title}
          name="title"
          onChange={handleInputChange}
        />
        <TextArea
          placeholder="Post Content"
          rows={4}
          style={{ marginBottom: '10px' }}
          value={newPost.content}
          name="content"
          onChange={handleInputChange}
        />
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={addPost}
        >
          Add Post
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {posts.map((post, index) => (
          <Card title={post.title} key={index} style={{ marginBottom: '10px' }}>
            <p>{post.content}</p>
          </Card>
        ))}
      </div>
   </div>
  );
};

export default PostPage;