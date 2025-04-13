'use client';

import React from 'react';
import { Layout, Row, Col, Card, Typography, Breadcrumb } from 'antd';
import DataManagementPanel from '@/components/DataManagementPanel';

const { Content } = Layout;
const { Title } = Typography;

export default function AdminPage() {
  return (
    <Layout>
      <Content style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Breadcrumb style={{ marginBottom: '16px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Data Management</Breadcrumb.Item>
        </Breadcrumb>
        
        <Title level={2} style={{ marginBottom: '24px' }}>Admin Dashboard</Title>
        
        <Row gutter={24}>
          <Col span={24}>
            <DataManagementPanel />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
} 