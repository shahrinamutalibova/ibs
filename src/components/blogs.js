import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd';

const { TextArea } = Input;
const { Meta } = Card;

const BlogPostPage = () => {
  const [blogPosts, setBlogPosts] = useState(
    JSON.parse(localStorage.getItem('blogPosts')) || []
  );
  const [blogPostInfo, setBlogPostInfo] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  const handleDelete = (index) => {
    const updatedCourseList = blogPosts.filter((_, i) => i !== index);
    setBlogPosts(updatedCourseList);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogPostInfo({ ...blogPostInfo, [name]: value });
  };

  const addBlogPost = () => {
    if (!blogPostInfo.title || !blogPostInfo.content) {
      alert("Please fill in the title and content.");
      return;
    }
    const updatedBlogPosts = [...blogPosts, blogPostInfo];
    setBlogPosts(updatedBlogPosts);
    setBlogPostInfo({ title: '', content: '', imageUrl: '' }); 

    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogPosts));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create a Blog Post</h2>
      <Input
        placeholder="Title"
        style={{ marginBottom: '10px' }}
        value={blogPostInfo.title}
        name="title"
        onChange={handleInputChange}
      />
      <TextArea
        placeholder="Content"
        rows={4}
        style={{ marginBottom: '10px' }}
        value={blogPostInfo.content}
        name="content"
        onChange={handleInputChange}
      />
      <Input
        placeholder="Image URL (optional)"
        style={{ marginBottom: '10px' }}
        value={blogPostInfo.imageUrl}
        name="imageUrl"
        onChange={handleInputChange}
      />
      <Button style={{background:"#FEC200",color:"white"}} onClick={addBlogPost}>
        Submit Blog Post
      </Button>
      <div className='blogs' style={{ marginTop: '20px' }}>
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            hoverable
            style={{ width: '30%', marginTop: '16px' }}
            cover={post.imageUrl && <img alt="Blog post cover" src={post.imageUrl} />}
            actions={[
                <Button style={{color:"blue",border:"1px solid blue"}}>Edit</Button>,
              <Button style={{color:"red",border:"1px solid red"}} onClick={() => handleDelete(index)}>Delete</Button>
            ]}
          >
            <Meta title={post.title} description={post.content} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPostPage;