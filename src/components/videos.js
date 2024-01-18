import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd'; 

const { TextArea } = Input;

const VideoUploadPage = () => {
  const [videos, setVideos] = useState(
    JSON.parse(localStorage.getItem('videos')) || []
  );
  const [videoInfo, setVideoInfo] = useState({
    title: '',
    description: '',
    url: ''
  });

  useEffect(() => {
    localStorage.setItem('videos', JSON.stringify(videos));
  }, [videos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoInfo({ ...videoInfo, [name]: value });
  };
  const addVideo = () => {
    if (!videoInfo.title || !videoInfo.description || !videoInfo.url) {
      alert("Please fill in all fields.");
      return;
    }
    const newVideos = [...videos, videoInfo];
    setVideos(newVideos);
    setVideoInfo({ title: '', description: '', url: '' }); 
    
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Video Information</h2>
      <Input
        placeholder="Video Title"
        style={{ marginBottom: '10px' }}
        value={videoInfo.title}
        name="title"
        onChange={handleInputChange}
      />
      <TextArea
        placeholder="Video Description"
        rows={4}
        style={{ marginBottom: '10px' }}
        value={videoInfo.description}
        name="description"
        onChange={handleInputChange}
      />
      <Input
        placeholder="Video URL"
        style={{ marginBottom: '10px' }}
        value={videoInfo.url}
        name="url"
        onChange={handleInputChange}
      />
      <Button type="primary" style={{ background: "#FEC200"}} onClick={addVideo}>
        Upload Video
      </Button>
      <div style={{ marginTop: '20px' ,width:"30%"}}>
        {videos.map((video, index) => (
          <Card key={index} title={video.title} style={{ marginBottom: '10px' }}>
            <p>{video.description}</p>
            <video width="100%" controls src={video.url} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoUploadPage;
