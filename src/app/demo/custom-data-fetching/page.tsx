'use client';

import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Space, Table, Tag, Alert, Skeleton, Empty, Result } from 'antd';
import { ReloadOutlined, WarningOutlined } from '@ant-design/icons';
import { useDataFetching } from '@/hooks/useDataFetching';
import { Issue } from '@/data/types';
import { fetchIssuesSuccess, fetchIssuesEmpty, fetchIssuesError } from '@/services/mockApi';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// Demo scenarios
type Scenario = 'success' | 'empty' | 'error';

export default function CustomDataFetchingDemo() {
  // Track the current demo scenario
  const [scenario, setScenario] = useState<Scenario>('success');
  // Store fetch function based on scenario
  const [fetchFn, setFetchFn] = useState(() => fetchIssuesSuccess);

  // Select the fetch function based on scenario
  const switchScenario = (newScenario: Scenario) => {
    setScenario(newScenario);
    
    switch (newScenario) {
      case 'success':
        setFetchFn(() => fetchIssuesSuccess);
        break;
      case 'empty':
        setFetchFn(() => fetchIssuesEmpty);
        break;
      case 'error':
        setFetchFn(() => fetchIssuesError);
        break;
    }
  };

  // Use our custom hook
  const { data, status, error, refetch, reset } = useDataFetching<Issue[]>(fetchFn);

  // Table columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color={
          category === 'SOW' ? 'purple' :
          category === 'UBO' ? 'blue' :
          category === 'RISK' ? 'red' :
          'green'
        }>
          {category}
        </Tag>
      ),
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={
          severity === 'High' ? 'red' :
          severity === 'Medium' ? 'orange' :
          'green'
        }>
          {severity}
        </Tag>
      ),
    }
  ];

  // Render content based on status
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div style={{ padding: '20px' }}>
            <Skeleton active paragraph={{ rows: 10 }} />
            <Alert 
              message="Loading issues..." 
              description="Please wait while we retrieve the data." 
              type="info" 
              showIcon
              style={{ marginTop: '16px' }}
            />
          </div>
        );
      
      case 'success':
        return (
          <>
            <Paragraph>
              <Text strong>Successfully loaded {data?.length} issues.</Text>
            </Paragraph>
            <Table 
              dataSource={data || []} 
              columns={columns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </>
        );
      
      case 'empty':
        return (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No issues found"
          >
            <Button type="primary" onClick={refetch}>Refresh</Button>
          </Empty>
        );
      
      case 'error':
        return (
          <Result
            status="error"
            title="Fetch Failed"
            subTitle={error?.message || "An unknown error occurred"}
            icon={<WarningOutlined style={{ color: 'red' }} />}
            extra={[
              <Button type="primary" key="retry" onClick={refetch}>
                Retry
              </Button>,
              <Button key="reset" onClick={reset}>
                Reset
              </Button>
            ]}
          />
        );
      
      case 'idle':
      default:
        return (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Button type="primary" onClick={refetch}>Fetch Data</Button>
          </div>
        );
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '24px', minHeight: '100vh' }}>
        <Title level={2}>Custom Data Fetching Demo</Title>
        <Text>
          This demo shows how to use the useDataFetching hook directly with custom UI components.
        </Text>
        
        <Space style={{ margin: '24px 0' }}>
          <Button 
            type={scenario === 'success' ? 'primary' : 'default'} 
            onClick={() => switchScenario('success')}
          >
            Success
          </Button>
          <Button 
            type={scenario === 'empty' ? 'primary' : 'default'} 
            onClick={() => switchScenario('empty')}
          >
            Empty
          </Button>
          <Button 
            type={scenario === 'error' ? 'primary' : 'default'} 
            onClick={() => switchScenario('error')}
          >
            Error
          </Button>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={() => {
              reset();
              setTimeout(refetch, 0);
            }}
          >
            Reset & Refetch
          </Button>
        </Space>
        
        <Card title={`Issues (Status: ${status})`}>
          {renderContent()}
        </Card>
        
        <Card title="Current State" style={{ marginTop: '24px' }}>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '4px' }}>
            {JSON.stringify({ 
              status, 
              error: error?.message, 
              dataCount: data?.length || 0 
            }, null, 2)}
          </pre>
        </Card>
      </Content>
    </Layout>
  );
} 