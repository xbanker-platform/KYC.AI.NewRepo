'use client';

import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Space, List, Tag, Radio, Divider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import DataFetchingContainer from '@/components/DataFetchingContainer';
import { Issue } from '@/data/types';
import { 
  fetchIssuesSuccess, 
  fetchIssuesEmpty, 
  fetchIssuesError 
} from '@/services/mockApi';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Group, Button: RadioButton } = Radio;

// Demo scenarios
type Scenario = 'success' | 'empty' | 'error' | 'custom';

export default function DataFetchingDemoPage() {
  // Track the current demo scenario
  const [scenario, setScenario] = useState<Scenario>('success');
  // Force update to trigger refetching
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Select the fetch function based on the scenario
  const getFetchFunction = () => {
    switch (scenario) {
      case 'success':
        return fetchIssuesSuccess;
      case 'empty':
        return fetchIssuesEmpty;
      case 'error':
        return fetchIssuesError;
      case 'custom':
        // Simulate a very slow request that eventually succeeds
        return () => new Promise<Issue[]>((resolve) => {
          setTimeout(() => {
            resolve([{
              id: 999,
              title: 'Custom Scenario Issue',
              description: 'This is a custom test scenario with a 5-second delay',
              severity: 'Medium',
              status: 'success',
              companyId: 1,
              materiality: 60,
              requirements: ['Custom requirement 1', 'Custom requirement 2'],
              considerations: ['Custom consideration'],
              category: 'SOW',
              state: 'open'
            }]);
          }, 5000);
        });
      default:
        return fetchIssuesSuccess;
    }
  };

  // Render issues when successfully fetched
  const renderIssues = (issues: Issue[]) => (
    <List
      itemLayout="horizontal"
      dataSource={issues}
      renderItem={(issue) => (
        <List.Item>
          <List.Item.Meta
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{issue.title}</span>
                <Tag color={
                  issue.severity === 'High' ? 'red' :
                  issue.severity === 'Medium' ? 'orange' : 'green'
                }>
                  {issue.severity}
                </Tag>
              </div>
            }
            description={issue.description}
          />
        </List.Item>
      )}
    />
  );

  return (
    <Layout>
      <Content style={{ padding: '24px', minHeight: '100vh' }}>
        <Title level={2}>Data Fetching Demo</Title>
        <Text>This page demonstrates the different states handled by the DataFetchingContainer component.</Text>
        
        <Divider />
        
        <Space direction="vertical" style={{ width: '100%', marginBottom: '24px' }}>
          <Title level={4}>Select Scenario</Title>
          <Group 
            value={scenario} 
            onChange={(e) => setScenario(e.target.value)}
            style={{ marginBottom: '16px' }}
          >
            <RadioButton value="success">Success</RadioButton>
            <RadioButton value="empty">Empty</RadioButton>
            <RadioButton value="error">Error</RadioButton>
            <RadioButton value="custom">Slow Request (5s)</RadioButton>
          </Group>
          
          <Button 
            type="primary" 
            icon={<ReloadOutlined />} 
            onClick={() => setUpdateTrigger(prev => prev + 1)}
          >
            Force Refetch
          </Button>
        </Space>
        
        <Card title="Issue List" key={updateTrigger}>
          <DataFetchingContainer<Issue[]>
            fetchFn={getFetchFunction()}
            renderSuccess={renderIssues}
            loadingMessage="Loading issues..."
            emptyMessage="No issues found"
            errorTitle="Failed to load issues"
          />
        </Card>
      </Content>
    </Layout>
  );
} 