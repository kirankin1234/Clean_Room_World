import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  LoginOutlined,
  MessageOutlined,
  AppstoreOutlined, 
  FolderOpenOutlined, 
  ShoppingOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import './Sidebar.css'; // Importing separate CSS file

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const menuItems = [
    { key: 'dashboard', icon: <HomeOutlined />, label: 'Dashboard', onClick: () => navigate('/admin/dashboard') },
    { key: 'category', icon: <AppstoreOutlined />, label: 'Category', onClick: () => navigate('/admin/category') },
    { key: 'subcategory', icon: <FolderOpenOutlined />, label: 'Subcategories', onClick: () => navigate('/admin/Subcategory') },
    { key: 'product', icon: <ShoppingOutlined />, label: 'Product', onClick: () => navigate('/admin/product') },
    { key: 'users', icon: <UserOutlined />, label: 'Users', onClick: () => navigate('/admin/users') },
    { key: 'orders', icon: <ShoppingCartOutlined />, label: 'Orders History', onClick: () => navigate('/admin/orders') },
    { key: 'interested', icon: <HistoryOutlined />, label: 'Interested Users', onClick: () => navigate('/admin/interested') },
    { key: 'inquiries', icon: <MessageOutlined />, label: 'Inquiries', onClick: () => navigate('/admin/inquiries') },
  ];

  return (
    <Layout className="main-layout">
      <Sider className="sidebar">
        <div className="sidebar-header">Admin Panel</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          className="sidebar-menu"
        />
      </Sider>
      <Layout>
        <Header className="header">
        <div className="header-title" style={{ color: "#7C444F" }}>
         {isAuthenticated ? "Welcome, Admin" : "Please Login"}
        </div>

          <Space className="header-actions">
            {isAuthenticated ? (
              <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button type="primary" icon={<LoginOutlined />} onClick={handleLogin}>
                Login
              </Button>
            )}
          </Space>
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
