import React, { useState } from 'react';
import { Space, Card, Typography, Button, Progress, Tag, Dropdown } from 'antd';
import { QuestionCircleOutlined, CheckCircleFilled, DownOutlined, UpOutlined } from '@ant-design/icons';
import type { Issue, IssueAction } from '@/data/types';
import styles from '../app/page.module.css';
import { dataManager } from '@/data';

const { Text } = Typography;

interface IssueListProps {
  issues: Issue[];
  expandedIssues: number[];
  issueActions: IssueAction[];
  activeDropdownId: number | null;
  onToggleExpand: (id: number) => void;
  onIssueAction: (id: number, action: string) => void;
  setActiveDropdownId: (id: number | null) => void;
  onUpdateIssueState: (issueId: number, newState: 'open' | 'solved' | 'dismissed') => void;
}

const IssueList: React.FC<IssueListProps> = ({
  issues,
  expandedIssues,
  issueActions,
  activeDropdownId,
  onToggleExpand,
  onIssueAction,
  setActiveDropdownId,
  onUpdateIssueState,
}) => {
  const [activeState, setActiveState] = useState<'all' | 'open' | 'solved' | 'dismissed'>('all');

  // Get current state label for the button
  const getStateLabel = (state: string) => {
    switch (state) {
      case 'open': return 'Open';
      case 'solved': return 'Solved';
      case 'dismissed': return 'Dismissed';
      default: return 'Solve';
    }
  };

  // Get state color
  const getStateColor = (state: string) => {
    switch (state) {
      case 'open': return '#722ed1';
      case 'solved': return '#52c41a';
      case 'dismissed': return '#ff4d4f';
      default: return '#722ed1';
    }
  };

  // Filter issues based on active state if needed
  const displayedIssues = activeState === 'all' 
    ? issues 
    : issues.filter(issue => issue.state === activeState);
    
  // Sort by state if in 'all' view
  const sortedIssues = activeState === 'all'
    ? [...displayedIssues].sort((a, b) => {
        const stateOrder = { open: 1, solved: 2, dismissed: 3 };
        return stateOrder[a.state as keyof typeof stateOrder] - stateOrder[b.state as keyof typeof stateOrder];
      })
    : displayedIssues;

  // Render each issue as an expandable card
  const renderIssues = () => {
    return sortedIssues.map(issue => {
      const isExpanded = expandedIssues.includes(issue.id);
      const stateColor = getStateColor(issue.state);

      // Use new dropdown API compatible with current Ant Design
      const items = [
        {
          key: 'open',
          label: 'Open',
          onClick: () => onUpdateIssueState(issue.id, 'open')
        },
        {
          key: 'solve',
          label: 'Solve',
          onClick: () => onUpdateIssueState(issue.id, 'solved')
        },
        {
          key: 'dismiss',
          label: 'Dismiss',
          onClick: () => onUpdateIssueState(issue.id, 'dismissed')
        }
      ];

      return (
        <div 
          key={issue.id}
          style={{ 
            marginBottom: '16px',
            border: `1px solid #e9e9e9`,
            borderLeft: `4px solid ${stateColor}`,
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          {/* Issue Header */}
          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              backgroundColor: 'white',
              borderBottom: isExpanded ? '1px solid #e9e9e9' : 'none',
              cursor: 'pointer'
            }}
            onClick={() => onToggleExpand(issue.id)}
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
                {issue.badge || <QuestionCircleOutlined style={{ fontSize: '14px' }} />}
              </div>
              <div>
                <Text style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>
                  {issue.title}
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Text style={{ fontSize: '12px', color: stateColor }}>
                {getStateLabel(issue.state)}
              </Text>
              <Button 
                type="text"
                icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand(issue.id);
                }}
              />
              <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                <Button 
                  style={{ 
                    borderColor: '#e8e8e8',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 15px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {issue.state === 'open' ? 'Solve' : getStateLabel(issue.state)} <DownOutlined style={{ fontSize: '10px', marginLeft: '5px', color: '#888' }} />
                </Button>
              </Dropdown>
            </div>
          </div>
          
          {/* Issue Details */}
          {isExpanded && (
            <div style={{ padding: '24px', backgroundColor: '#f9f9f9' }}>
              <div style={{ color: '#666', marginBottom: '20px' }}>
                {issue.description}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Text style={{ marginRight: '10px' }}>Materiality</Text>
                <Text strong style={{ color: '#52c41a' }}>{issue.materiality}%</Text>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                  <Progress percent={issue.materiality} status="active" strokeColor={stateColor} />
                </div>
              </div>

              <div>
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Missing requirements:</div>
                  <ul style={{ paddingLeft: '20px', color: '#666', listStyleType: 'disc' }}>
                    {issue.requirements.map((req, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Considerations</div>
                  <ul style={{ paddingLeft: '20px', color: '#666', listStyleType: 'disc' }}>
                    {issue.considerations.map((con, index) => (
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
                        onClick={() => action.onClick(issue.id)}
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
    });
  };

  // Check if there are any issues to display
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
        No issues found
      </div>
    );
  }

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
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderIssues()}
      </div>
    </div>
  );
};

export default IssueList; 