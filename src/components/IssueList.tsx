import React, { useState } from 'react';
import { Space, Card, Typography, Button, Progress, Tag, Dropdown, Menu } from 'antd';
import { QuestionCircleOutlined, CheckCircleFilled, WarningOutlined, RightOutlined, CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import type { Issue, IssueAction } from '@/data/types';
import styles from '../app/page.module.css';
import { useDataFetching } from '@/hooks/useDataFetching';
import { dataManager } from '@/data';
import DataFetchingContainer from './DataFetchingContainer';

const { Text } = Typography;

interface IssueListProps {
  categoryId?: string;
  expandedIssues: number[];
  issueActions: IssueAction[];
  activeDropdownId: number | null;
  onToggleExpand: (id: number) => void;
  onIssueAction: (id: number, action: string) => void;
  setActiveDropdownId: (id: number | null) => void;
  onUpdateIssueState: (issueId: number, newState: 'open' | 'solved' | 'dismissed') => void;
}

const IssueList: React.FC<IssueListProps> = ({
  categoryId,
  expandedIssues,
  issueActions,
  activeDropdownId,
  onToggleExpand,
  onIssueAction,
  setActiveDropdownId,
  onUpdateIssueState,
}) => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [activeState, setActiveState] = useState<'all' | 'open' | 'solved' | 'dismissed'>('all');
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  // Function to fetch issues based on category and state
  const fetchIssues = async (): Promise<Issue[]> => {
    // If a specific category is provided, filter by that category
    let issues = categoryId 
      ? dataManager.getIssuesByCategory(categoryId) 
      : dataManager.getIssues();
    
    // If a specific state is selected (not 'all'), filter by that state
    if (activeState !== 'all') {
      issues = issues.filter(issue => issue.state === activeState);
    }
    
    // Sort issues by state if in 'all' view
    if (activeState === 'all') {
      issues = [...issues].sort((a, b) => {
        const stateOrder = { open: 1, solved: 2, dismissed: 3 };
        return stateOrder[a.state as keyof typeof stateOrder] - stateOrder[b.state as keyof typeof stateOrder];
      });
    }
    
    return issues;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'warning':
        return <QuestionCircleOutlined style={{ color: '#722ed1' }} />;
      case 'success':
        return <CheckCircleFilled style={{ color: '#52c41a' }} />;
      case 'neutral':
        return <QuestionCircleOutlined style={{ color: '#d9d9d9' }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'warning':
        return '#722ed1';
      case 'success':
        return '#52c41a';
      default:
        return '#666';
    }
  };

  // Get current state label for the button
  const getStateLabel = (state: string) => {
    switch (state) {
      case 'open': return 'Open';
      case 'solved': return 'Solved';
      case 'dismissed': return 'Dismissed';
      default: return 'Solve';
    }
  };

  // Render state filter buttons
  const renderStateButtons = () => {
    return (
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <Button
          style={{ 
            backgroundColor: activeState === 'all' ? '#f0f0f0' : 'white',
            borderColor: '#e0e0e0',
            color: '#333',
            borderRadius: '20px'
          }}
          onClick={() => setActiveState('all')}
        >
          All Issues
        </Button>
        <Button
          style={{ 
            backgroundColor: activeState === 'open' ? '#f0f0f0' : 'white',
            borderColor: '#e0e0e0',
            color: '#333',
            borderRadius: '20px'
          }}
          onClick={() => setActiveState('open')}
        >
          Open
        </Button>
        <Button
          style={{ 
            backgroundColor: activeState === 'solved' ? '#f0f0f0' : 'white',
            borderColor: '#e0e0e0',
            color: '#333',
            borderRadius: '20px'
          }}
          onClick={() => setActiveState('solved')}
        >
          Solved
        </Button>
        <Button
          style={{ 
            backgroundColor: activeState === 'dismissed' ? '#f0f0f0' : 'white',
            borderColor: '#e0e0e0',
            color: '#333',
            borderRadius: '20px'
          }}
          onClick={() => setActiveState('dismissed')}
        >
          Dismissed
        </Button>
      </div>
    );
  };

  // Render issue cards horizontally
  const renderIssueCards = (issues: Issue[]) => {
    return (
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        flexWrap: 'wrap', 
        marginBottom: '20px'
      }}>
        {issues.map(issue => {
          const isSelected = selectedIssue?.id === issue.id;
          // Set border color based on state
          let borderColor = '#722ed1'; // Default purple for open
          if (issue.state === 'solved') borderColor = '#52c41a';
          if (issue.state === 'dismissed') borderColor = '#ff4d4f';
          
          return (
            <div
              key={`issue-card-${issue.id}`}
              onClick={() => setSelectedIssue(isSelected ? null : issue)}
              style={{
                width: 'calc(33.33% - 11px)',
                height: '150px',
                border: '1px solid #e6e6e6',
                borderLeft: `4px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '16px',
                position: 'relative',
                cursor: 'pointer',
                backgroundColor: isSelected ? '#f5f8ff' : 'white',
                transition: 'all 0.3s ease',
                marginBottom: '12px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '8px', 
                fontSize: '16px',
                color: '#333',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {issue.title}
              </div>
              <div style={{ 
                color: '#666', 
                fontSize: '14px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                height: '42px',
                marginBottom: '16px'
              }}>
                {issue.description || ''}
              </div>
              {issue.badge && (
                <div style={{ 
                  position: 'absolute', 
                  bottom: '16px', 
                  right: '16px',
                  background: '#f0f0f0',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#722ed1',
                  fontWeight: 'bold'
                }}>
                  {issue.badge}
                </div>
              )}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                fontSize: '12px',
                color: borderColor
              }}>
                {issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render issue details section when an issue is selected
  const renderIssueDetails = () => {
    if (!selectedIssue) return null;

    // Determine the state-specific colors
    const getStateColor = (state: string) => {
      switch (state) {
        case 'open': return '#722ed1';
        case 'solved': return '#52c41a';
        case 'dismissed': return '#ff4d4f';
        default: return '#722ed1';
      }
    };

    const handleStateChange = (newState: 'open' | 'solved' | 'dismissed') => {
      if (selectedIssue) {
        onUpdateIssueState(selectedIssue.id, newState);
        // Update the selected issue with the new state
        setSelectedIssue({...selectedIssue, state: newState});
      }
    };

    const stateColor = getStateColor(selectedIssue.state);

    // Use new dropdown API compatible with current Ant Design
    const items = [
      {
        key: 'open',
        label: 'Open',
        onClick: () => handleStateChange('open')
      },
      {
        key: 'solve',
        label: 'Solve',
        onClick: () => handleStateChange('solved')
      },
      {
        key: 'dismiss',
        label: 'Dismiss',
        onClick: () => handleStateChange('dismissed')
      }
    ];

    return (
      <div style={{ 
        marginTop: '20px', 
        padding: '0',
        background: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #e9e9e9',
        overflow: 'hidden'
      }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '16px 24px',
            borderBottom: detailsExpanded ? '1px solid #e9e9e9' : 'none',
            backgroundColor: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              backgroundColor: stateColor, 
              color: 'white', 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px'
            }}>
              {selectedIssue.badge || <QuestionCircleOutlined style={{ fontSize: '14px' }} />}
            </div>
            <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {selectedIssue.title}
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button 
              type="text"
              icon={detailsExpanded ? <UpOutlined /> : <DownOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setDetailsExpanded(!detailsExpanded);
              }}
              style={{ marginRight: '8px' }}
            />
            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
              <Button style={{ 
                borderColor: '#e8e8e8',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                padding: '4px 15px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                {selectedIssue.state === 'open' ? 'Solve' : getStateLabel(selectedIssue.state)} <DownOutlined style={{ fontSize: '10px', marginLeft: '5px', color: '#888' }} />
              </Button>
            </Dropdown>
          </div>
        </div>
        
        {detailsExpanded && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Text style={{ marginRight: '10px' }}>Materiality</Text>
              <Text strong style={{ color: '#52c41a' }}>{selectedIssue.materiality}%</Text>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                <Progress percent={selectedIssue.materiality} status="active" strokeColor={stateColor} />
              </div>
            </div>

            <div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Missing requirements:</div>
                <ul style={{ paddingLeft: '20px', color: '#666', listStyleType: 'disc' }}>
                  {selectedIssue.requirements.map((req, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Considerations</div>
                <ul style={{ paddingLeft: '20px', color: '#666', listStyleType: 'disc' }}>
                  {selectedIssue.considerations.map((con, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>{con}</li>
                  ))}
                </ul>
              </div>

              {/* Action buttons row */}
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginTop: '30px',
                borderTop: '1px solid #e0e0e0',
                paddingTop: '20px',
                flexWrap: 'wrap'
              }}>
                {/* Default action buttons */}
                <Button 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    height: '40px'
                  }}
                  icon={<span style={{ marginRight: '8px' }}>📂</span>}
                >
                  Upload Document
                </Button>
                <Button 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    height: '40px'
                  }}
                  icon={<span style={{ marginRight: '8px' }}>💡</span>}
                >
                  Get Suggestions
                </Button>
                <Button 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    height: '40px'
                  }}
                  icon={<span style={{ marginRight: '8px' }}>🔍</span>}
                >
                  AI Search
                </Button>
                <Button 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    height: '40px'
                  }}
                  icon={<span style={{ marginRight: '8px' }}>📋</span>}
                >
                  Search Rules
                </Button>

                {/* Issue-specific actions */}
                <div className={styles.issueActions}>
                  {issueActions.map((action, index) => (
                    <Button
                      key={index}
                      type={action.type}
                      onClick={() => action.onClick(selectedIssue.id)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* AI Assistant input */}
              <div style={{ 
                display: 'flex', 
                marginTop: '20px',
                gap: '10px'
              }}>
                <input 
                  placeholder="Ask AI Assistant..."
                  style={{
                    flex: 1,
                    borderRadius: '4px',
                    border: '1px solid #d9d9d9',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                />
                <Button 
                  type="primary" 
                  style={{ 
                    backgroundColor: '#722ed1', 
                    borderColor: '#722ed1',
                    borderRadius: '4px'
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render all content with data fetching container
  const renderIssueListContent = (issues: Issue[]) => {
    if (issues.length === 0) {
      return (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 0',
          color: '#52c41a',
          fontSize: '18px',
          fontWeight: 'bold',
          flex: 1
        }}>
          Congratulations, no issues found
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderIssueCards(issues)}
        {renderIssueDetails()}
      </div>
    );
  };

  return (
    <div className={styles.issueListContainer} style={{ 
      background: 'white', 
      borderRadius: '8px', 
      padding: '16px', 
      border: '1px solid #e0e0e0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {renderStateButtons()}
      
      <DataFetchingContainer<Issue[]>
        fetchFn={fetchIssues}
        renderSuccess={renderIssueListContent}
        loadingMessage="Loading issues..."
        emptyMessage="No issues found"
        errorTitle="Failed to load issues"
      />
    </div>
  );
};

export default IssueList; 