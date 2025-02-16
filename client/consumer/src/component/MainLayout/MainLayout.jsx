// import React from 'react';
// import { Layout, Menu } from 'antd';
// import {
//   HomeOutlined,
//   UserOutlined,
//   ShoppingCartOutlined,
//   HistoryOutlined,
// } from '@ant-design/icons';
// import { useNavigate, Outlet } from 'react-router-dom';

// const { Header, Sider, Content } = Layout;

// const MainLayout = () => {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       key: 'dashboard',
//       icon: <HomeOutlined />,
//       label: 'Dashboard',
//       onClick: () => navigate('/dashboard'),
//     },
//     {
//       key: 'users',
//       icon: <UserOutlined />,
//       label: 'Users',
//       onClick: () => navigate('/users'),
//     },
//     {
//       key: 'orders',
//       icon: <ShoppingCartOutlined />,
//       label: 'Orders',
//       onClick: () => navigate('/orders'),
//     },
//     {
//       key: 'interested',
//       icon: <HistoryOutlined />,
//       label: 'Interested Users',
//       onClick: () => navigate('/interested'),
//     },
//   ];

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider>
//         <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['dashboard']}
//           items={menuItems}
//         />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: '#fff' }} />
//         <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default MainLayout; 

import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';

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
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/admin/dashboard'),
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/admin/users'),
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: 'Orders',
      onClick: () => navigate('/admin/orders'),
    },
    {
      key: 'interested',
      icon: <HistoryOutlined />,
      label: 'Interested Users',
      onClick: () => navigate('/admin/interested'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 16px', 
          background: '#fff', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: '#1890ff', fontSize: '18px', fontWeight: 'bold' }}>
            {isAuthenticated ? 'Welcome, Admin' : 'Please Login'}
          </div>
          <Space>
            {isAuthenticated ? (
              <Button 
                type="primary" 
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button 
                // style={{paddingTop:'20px'}}
                type="primary"
                icon={<LoginOutlined />}
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </Space>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 