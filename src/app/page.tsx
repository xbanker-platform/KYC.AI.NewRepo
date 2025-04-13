'use client';

import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Space, Typography } from 'antd';
import { EyeOutlined, MessageOutlined, CheckOutlined } from '@ant-design/icons';
import Editor from '@/components/Editor';
import CategoryTabs from '@/components/CategoryTabs';
import StatisticsPanel from '@/components/StatisticsPanel';
import IssueList from '@/components/IssueList';
import CheckProcess from '@/components/CheckProcess';
import { dataManager } from '@/data';

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('SOW');
  const [activeCompany, setActiveCompany] = useState(1);
  const [expandedIssues, setExpandedIssues] = useState<number[]>([1]);
  const [issues, setIssues] = useState(dataManager.getIssues());
  const [categories] = useState(dataManager.getCategories());
  const [issueActions] = useState(dataManager.getStandardIssueActions(handleIssueAction));
  const [actionStatuses, setActionStatuses] = useState<Record<number, string>>({});
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [checkModalVisible, setCheckModalVisible] = useState(false);

  const handleCheck = () => {
    // Show the check process modal
    setCheckModalVisible(true);
  };

  const handleCloseCheckModal = () => {
    setCheckModalVisible(false);
  };

  function handleIssueAction(issueId: number, action: string) {
    setActionStatuses(prev => ({
      ...prev,
      [issueId]: action
    }));
    
    // Update issue state based on action
    if (action === 'approve') {
      updateIssueState(issueId, 'solved');
    } else if (action === 'reject') {
      updateIssueState(issueId, 'dismissed');
    }
    
    setActiveDropdownId(null);
  }

  const updateIssueState = (issueId: number, newState: 'open' | 'solved' | 'dismissed') => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId ? { ...issue, state: newState } : issue
      )
    );
  };

  const toggleExpand = (issueId: number) => {
    if (expandedIssues.includes(issueId)) {
      setExpandedIssues(expandedIssues.filter(id => id !== issueId));
    } else {
      setExpandedIssues([...expandedIssues, issueId]);
    }
  };

  return (
    <Layout style={{ background: '#f5f5f5' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        padding: '8px 16px', 
        background: 'white',
        borderBottom: '1px solid #e8e8e8'
      }}>
        <Space>
          <Button type="link" href="/admin">Admin Dashboard</Button>
        </Space>
      </div>
      <Content style={{ padding: '16px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Row gutter={16}>
          {/* Left Panel - Editor */}
          <Col span={10}>
            <Card 
              style={{ 
                border: '1px solid #e0e0e0', 
                height: 'calc(100vh - 52px)',
                display: 'flex',
                flexDirection: 'column'
              }}
              bodyStyle={{ 
                flex: 1, 
                padding: '16px', 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <Title level={4} style={{ margin: 0 }}>Mr Deng's Profile</Title>
                <Button type="text" icon={<EyeOutlined />}>Preview</Button>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <Editor />
              </div>
            </Card>
          </Col>

          {/* Right Panel - Checker */}
          <Col span={14}>
            <Card 
              style={{ 
                border: '1px solid #e0e0e0', 
                height: 'calc(100vh - 52px)'
              }}
              bodyStyle={{ 
                flex: 1, 
                padding: '16px', 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>Checker</Title>
                <Space>
                  <Button 
                    type="text" 
                    icon={<CheckOutlined style={{ color: '#52c41a' }} />} 
                    style={{ 
                      backgroundColor: '#f6ffed',
                      color: '#52c41a',
                      border: 'none',
                      padding: '4px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                    onClick={handleCheck}
                  >
                    Check
                  </Button>
                  <Button 
                    type="text"
                    icon={<MessageOutlined style={{ color: '#722ed1' }} />}
                    style={{ 
                      backgroundColor: '#f9f0ff',
                      color: '#722ed1',
                      border: 'none',
                      padding: '4px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    Assistant
                  </Button>
                </Space>
              </div>

              <div style={{ marginTop: '16px', marginBottom: '12px', display: 'flex', gap: '8px' }}>
                {categories.map(category => (
                  <Button
                    key={category.id}
                    style={{ 
                      borderRadius: '20px',
                      background: category.id === activeCategory ? '#000000' : '#e0e0e0',
                      color: category.id === activeCategory ? 'white' : 'black',
                      border: 'none',
                      padding: '4px 12px'
                    }}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>

              <div style={{ flex: 1, overflow: 'hidden' }}>
                <IssueList
                  issues={issues.filter(issue => issue.category === activeCategory)}
                  expandedIssues={expandedIssues}
                  issueActions={issueActions}
                  activeDropdownId={activeDropdownId}
                  onToggleExpand={toggleExpand}
                  onIssueAction={handleIssueAction}
                  setActiveDropdownId={setActiveDropdownId}
                  onUpdateIssueState={updateIssueState}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
      
      {/* Check Process Modal */}
      <CheckProcess 
        visible={checkModalVisible}
        onClose={handleCloseCheckModal}
      />
      
      {/* Fixed bottom border */}
      <div style={{ 
        height: '3px', 
        backgroundColor: '#d9d9d9', 
        width: '100%', 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        zIndex: 1000 
      }} />
    </Layout>
  );
}
