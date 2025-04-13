'use client';

import { Layout, Typography, Button, Space } from 'antd';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;
const { Title } = Typography;

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      backgroundColor: '#fff', 
      padding: '0 50px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ margin: 0 }}>Next.js with Ant Design</Title>
      </div>
      
      <Space>
        <Link href="/">
          <Button 
            type={pathname === '/' ? 'primary' : 'default'} 
            icon={<HomeOutlined />}
          >
            Home
          </Button>
        </Link>
        <Link href="/profile">
          <Button 
            type={pathname === '/profile' ? 'primary' : 'default'} 
            icon={<UserOutlined />}
          >
            Profile Demo
          </Button>
        </Link>
      </Space>
    </Header>
  );
} 