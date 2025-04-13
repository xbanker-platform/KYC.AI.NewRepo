'use client';

import React from 'react';
import { Layout, Typography, Card, Space, Button } from 'antd';
import Link from 'next/link';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function DemoIndex() {
  return (
    <Layout>
      <Content style={{ padding: '24px', minHeight: '100vh' }}>
        <Title level={2}>Data Fetching Demos</Title>
        <Paragraph>
          These demos showcase different ways to handle data fetching states in React components.
        </Paragraph>
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card title="Basic Demo - DataFetchingContainer">
            <Paragraph>
              This demo shows how to use the DataFetchingContainer component with default UI elements.
              It handles loading, success, empty, and error states with a clean, reusable interface.
            </Paragraph>
            <Link href="/demo/data-fetching" passHref>
              <Button type="primary">View Demo</Button>
            </Link>
          </Card>
          
          <Card title="Advanced Demo - useDataFetching Hook">
            <Paragraph>
              This demo shows how to use the useDataFetching hook directly with custom UI components.
              It provides more flexibility for handling each state with your own custom UI.
            </Paragraph>
            <Link href="/demo/custom-data-fetching" passHref>
              <Button type="primary">View Demo</Button>
            </Link>
          </Card>
        </Space>
        
        <Card title="Documentation" style={{ marginTop: '24px' }}>
          <Paragraph>
            For more information about the data fetching solution, check out the documentation:
          </Paragraph>
          <ul>
            <li>useDataFetching hook - Manages data fetching states</li>
            <li>DataFetchingContainer component - Ready-to-use container with built-in UI</li>
            <li>mockApi service - Simulates API calls with different outcomes</li>
          </ul>
        </Card>
      </Content>
    </Layout>
  );
} 