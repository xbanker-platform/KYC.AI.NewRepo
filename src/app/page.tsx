'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Row, Col, Card, Button, Space, Typography } from 'antd';
import { EyeOutlined, MessageOutlined, CheckOutlined } from '@ant-design/icons';
import Editor from '@/components/Editor';
import CategoryTabs from '@/components/CategoryTabs';
import IssueList from '@/components/IssueList';
import StoryList from '@/components/StoryList';
import CheckProcess from '@/components/CheckProcess';
import DataFetchingContainer from '@/components/DataFetchingContainer';
import { dataManager } from '@/data';
import { Issue } from '@/data/types';

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('SOW');
  const [activeCompany, setActiveCompany] = useState(1);
  const [expandedIssues, setExpandedIssues] = useState<number[]>([1]);
  const [categories] = useState(dataManager.getCategories());
  const [issueActions] = useState(dataManager.getStandardIssueActions(handleIssueAction));
  const [actionStatuses, setActionStatuses] = useState<Record<number, string>>({});
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [checkModalVisible, setCheckModalVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedStoryId, setSelectedStoryId] = useState<number | undefined>(undefined);

  // Select the first story by default when component mounts or category changes
  useEffect(() => {
    const stories = dataManager.getStoriesByCategory(activeCategory);
    if (stories.length > 0) {
      setSelectedStoryId(stories[0].id);
      // Reset expanded issues when changing stories
      setExpandedIssues([]);
      // Trigger a refresh to load the story's issues
      setRefreshTrigger(prev => prev + 1);
    }
  }, [activeCategory]);

  const fetchIssues = useCallback(async (): Promise<{issues: Issue[], storyTitle?: string, storyId?: number, issueIds?: number[]}> => {
    // Add a small delay to simulate network latency (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (selectedStoryId) {
      // If a story is selected, load its specific issues and include the story info
      const story = dataManager.getStoryById(selectedStoryId);
      const issues = dataManager.getIssuesForStory(selectedStoryId);
      return { 
        issues, 
        storyTitle: story?.title,
        storyId: selectedStoryId,
        issueIds: story?.issueIds
      };
    } else {
      // If no story is selected, load all issues for the category
      return { issues: dataManager.getIssuesByCategory(activeCategory) };
    }
  }, [activeCategory, selectedStoryId]);

  const handleCheck = () => {
    // Show the check process modal
    setCheckModalVisible(true);
  };

  const handleCloseCheckModal = () => {
    setCheckModalVisible(false);
    // Trigger a refresh of statistics
    setRefreshTrigger(prev => prev + 1);
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
    const updatedIssue = dataManager.updateIssue(issueId, { state: newState });
    // Trigger a refresh after updating state
    setRefreshTrigger(prev => prev + 1);
  };

  const toggleExpand = (issueId: number) => {
    if (expandedIssues.includes(issueId)) {
      setExpandedIssues(expandedIssues.filter(id => id !== issueId));
    } else {
      setExpandedIssues([...expandedIssues, issueId]);
    }
  };

  const handleSelectStory = (storyId: number) => {
    // Always set the selected story ID, never deselect
    setSelectedStoryId(storyId);
    
    // Reset expanded issues when changing stories
    setExpandedIssues([]);
    
    // Trigger a refresh to load the story's issues
    setRefreshTrigger(prev => prev + 1);
  };

  // Reset story selection when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Don't need to reset selectedStoryId here as the useEffect will set it
    // Reset expanded issues when changing categories
    setExpandedIssues([]);
  };

  // Render content for IssueList when data is successfully fetched
  const renderIssueListContent = (data: {issues: Issue[], storyTitle?: string, storyId?: number, issueIds?: number[]}) => {
    return (
      <IssueList
        issues={data.issues}
        expandedIssues={expandedIssues}
        issueActions={issueActions}
        activeDropdownId={activeDropdownId}
        onToggleExpand={toggleExpand}
        onIssueAction={handleIssueAction}
        setActiveDropdownId={setActiveDropdownId}
        onUpdateIssueState={updateIssueState}
        ownerName="Xiamen Limbach"
      />
    );
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
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>

              {/* Story List */}
              <div style={{ marginBottom: '16px' }}>
                <StoryList 
                  categoryId={activeCategory}
                  onSelectStory={handleSelectStory}
                  selectedStoryId={selectedStoryId}
                />
              </div>

              <div style={{ flex: 1, overflow: 'hidden' }}>
                {/* Using DataFetchingContainer to handle all states */}
                <DataFetchingContainer<{issues: Issue[], storyTitle?: string, storyId?: number, issueIds?: number[]}>
                  fetchFn={fetchIssues}
                  renderSuccess={renderIssueListContent}
                  loadingMessage="Loading issues..."
                  emptyMessage="No issues found for this selection"
                  errorTitle="Failed to load issues"
                  key={refreshTrigger} // Re-fetch when refreshTrigger changes
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
