import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AliwangwangOutlined,
  BarChartOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom'; // useNavigate import qilindi
const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); 

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider style={{height:"100vh",background:"white"}} trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <img width={80} src="https://yt3.googleusercontent.com/jiOs_rZfG3_GKs7ZpeHloiHjJcCeYCEaZJpgiWzyiY6CYvXHaf2NA_b0oKogUQ5wGokiMGGf=s900-c-k-c0x00ffffff-no-rj" alt="" />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={({ key }) => navigate(key)} 
        items={[
          {
            key: '/dashboard',
            icon:  <BarChartOutlined />,
            label: 'Dashboard',
          },
          {
            key: '/courses',
            icon: <VideoCameraOutlined />,
            label: 'Kurslar',
          },
          {
            key: '/blogs',
            icon: <AliwangwangOutlined   />,
            label: 'Bloglar',
          },
          {
            key: '/posts',
            icon: <UploadOutlined />,
            label: 'Post yuklash',
          }, 
          {
            key: '/videos',
            icon: <VideoCameraOutlined />,
            label: 'Video Ma’lumot',
          },
          {
            key: '/users',
            icon: <UserOutlined />,
            label: 'Hodimlar',
          },
          {
            key: '7',
            icon: <LogoutOutlined />,
            label: 'Chiqish',
          },
        ]}
      />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: "#F5F5F5",
            borderRadius: borderRadiusLG,
            minHeight:280,
            overflow:"scroll"
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
