import React, { useState ,useEffect } from 'react';
import { Button, Input, Upload, Modal, Card } from 'antd';
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    name: '',
    price: '',
    description: '',
    image: '' 
  });
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    const savedCourseList = localStorage.getItem('courseList');
    if (savedCourseList) {
      setCourseList(JSON.parse(savedCourseList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courseList', JSON.stringify(courseList));
  }, [courseList]);

  const handleDelete = (index) => {
    const updatedCourseList = courseList.filter((_, i) => i !== index);
    setCourseList(updatedCourseList);
  };

  const handleOk = () => {
    setCourseList([...courseList, courseDetails]);
    setCourseDetails({ name: '', price: '', description: '', image: '' }); 
    setIsModalOpen(false);
  };

  const updateCourseDetail = (key, value) => {
    setCourseDetails({ ...courseDetails, [key]: value });
  };

  const handleImageChange = async info => {
    if (info.file.originFileObj) {
      try {
        const imageBase64 = await getBase64(info.file.originFileObj);
        updateCourseDetail('image', imageBase64);
      } catch (error) {
        console.log('Error converting file:', error);
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <div className='button'>
        <Button
          style={{ padding: "20px", display: "flex", alignItems: "center", background: "#FEC200" }}
          type="primary"
          onClick={() => setIsModalOpen(true)}>
          + Add Course
        </Button>

        <Modal
          title="Add Course"
          style={{ lineHeight: "30px" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        >
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false} 
            onChange={handleImageChange}
          >
            {courseDetails.image ? <img src={courseDetails.image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>

          <Input
            style={{ padding: "10px" }}
            placeholder='Course Name'
            value={courseDetails.name}
            onChange={(e) => updateCourseDetail('name', e.target.value)}
          />
          <Input
            style={{ padding: "10px", margin: "10px 0" }}
            placeholder='Price'
            value={courseDetails.price}
            onChange={(e) => updateCourseDetail('price', e.target.value)}
          />
          <Input
            style={{ padding: "10px" }}
            placeholder='Description'
            value={courseDetails.description}
            onChange={(e) => updateCourseDetail('description', e.target.value)}
          />
        </Modal>

      </div>
      <div style={{ marginTop: '20px' ,width:"100%",display:"flex",alignItems:"center",gap:"20px ",flexWrap:"wrap"}}>
      {courseList.map((course, index) => (
          <Card
            key={index}
            title={course.name}
            style={{ width: 250 }}
            cover={<img alt="example" src={course.image} />}
            actions={[
                <Button>Edit</Button>,
              <Button style={{color:"red",border:"1px solid red"}} onClick={() => handleDelete(index)}>Delete</Button>
            ]}
          >
            <p>Price: {course.price}</p>
            <p>Description: {course.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;
