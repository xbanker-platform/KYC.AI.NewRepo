import React, { useState } from 'react';
import { Typography, Button, Progress, Dropdown } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { Issue, IssueAction } from '@/data/types';
import styles from '../app/page.module.css';
import CorroborationIssueCard from './CorroborationIssueCard';

const { Text } = Typography;

interface IssueListProps {
  issues: Issue[];
  expandedIssues: number[];
  issueActions?: IssueAction[];
  activeDropdownId: number | null;
  onToggleExpand: (id: number) => void;
  onIssueAction: (id: number, action: string) => void;
  setActiveDropdownId: (id: number | null) => void;
  onUpdateIssueState: (issueId: number, newState: 'open' | 'solved' | 'dismissed') => void;
  ownerName?: string;
  storyTitle?: string;
  storyId?: number;
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
  ownerName,
  storyTitle,
  storyId,
}) => {
  const [activeState, setActiveState] = useState<'all' | 'open' | 'solved' | 'dismissed'>('all');

  // Calculate maturity progress
  const calculateMaturityProgress = () => {
    if (issues.length === 0) return 0;
    const solvedIssues = issues.filter(issue => issue.state === 'solved').length;
    return Math.round((solvedIssues / issues.length) * 100);
  };

  const maturityProgress = calculateMaturityProgress();

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
      case 'dismissed': return '#9e9e9e';
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
      // For corroboration issues, use the specialized component
      if (issue.category === 'CORR') {
        return (
          <CorroborationIssueCard
            key={issue.id}
            issue={issue}
            isExpanded={expandedIssues.includes(issue.id)}
            onToggleExpand={onToggleExpand}
            onUpdateIssueState={onUpdateIssueState}
          />
        );
      }
      
      // Standard issue card rendering for non-corroboration issues
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
            marginBottom: '12px',
            border: '1px solid #e8e8e8',
            borderLeft: `4px solid ${stateColor}`,
            borderRadius: '6px',
            overflow: 'hidden',
            backgroundColor: 'white',
            transition: 'all 0.2s ease'
          }}
        >
          {/* Issue Header */}
          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
            onClick={() => onToggleExpand(issue.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                backgroundColor: stateColor, 
                color: 'white', 
                width: '22px', 
                height: '22px', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {issue.badge || 
                 (issue.state === 'open' ? '2' : 
                  issue.state === 'solved' ? '✓' : 
                  'G')}
              </div>
              <Text style={{ fontSize: '15px', fontWeight: 'bold', color: '#333' }}>
                {issue.title}
              </Text>
            </div>
            <Button 
              type="text"
              style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              icon={isExpanded ? <UpOutlined style={{ fontSize: '12px' }} /> : <DownOutlined style={{ fontSize: '12px' }} />}
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(issue.id);
              }}
            />
          </div>
          
          {/* Issue Details */}
          {isExpanded && (
            <div style={{ padding: '0 16px 16px', backgroundColor: 'white', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ color: '#666', marginTop: '12px', fontSize: '14px' }}>
                {issue.description}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Text style={{ marginRight: '8px' }}>Materiality</Text>
                <Text strong style={{ color: '#52c41a' }}>{issue.materiality}%</Text>
                <div style={{ flex: 1, marginLeft: '8px' }}>
                  <Progress percent={issue.materiality} status="active" strokeColor={stateColor} />
                </div>
              </div>

              <div>
                <div style={{ marginTop: '12px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Missing requirements:</div>
                  <ul style={{ paddingLeft: '20px', color: '#666', listStyleType: 'disc', margin: '0' }}>
                    {issue.requirements.map((req, index) => (
                      <li key={index} style={{ marginBottom: '6px' }}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Considerations</div>
                  <ul style={{ paddingLeft: '20px', color: '#666', listStyleType: 'disc', margin: '0' }}>
                    {issue.considerations.map((con, index) => (
                      <li key={index} style={{ marginBottom: '6px' }}>{con}</li>
                    ))}
                  </ul>
                </div>

                {/* Action buttons row */}
                <div style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  marginTop: '20px',
                  borderTop: '1px solid #e0e0e0',
                  paddingTop: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ 
                    width: 'calc(50% - 6px)', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '6px',
                    padding: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ marginRight: '8px', fontSize: '16px' }}>📂</span>
                      <Text strong>Upload Document</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Upload supporting documents for verification
                    </Text>
                  </div>
                  
                  <div style={{ 
                    width: 'calc(50% - 6px)', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '6px',
                    padding: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ marginRight: '8px', fontSize: '16px' }}>💡</span>
                      <Text strong>Get Suggestions</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      AI-powered recommendations for risk mitigation
                    </Text>
                  </div>
                  
                  <div style={{ 
                    width: 'calc(50% - 6px)', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '6px',
                    padding: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ marginRight: '8px', fontSize: '16px' }}>🔍</span>
                      <Text strong>AI Search</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Profile intelligence with AI assistance
                    </Text>
                  </div>
                  
                  <div style={{ 
                    width: 'calc(50% - 6px)', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '6px',
                    padding: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ marginRight: '8px', fontSize: '16px' }}>📋</span>
                      <Text strong>Search Rules</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Find relevant compliance rules
                    </Text>
                  </div>
                </div>

                {/* Bottom controls section */}
                <div style={{ 
                  display: 'flex', 
                  marginTop: '16px',
                  gap: '8px',
                  alignItems: 'center'
                }}>
                  {/* AI Assistant input with chat icon */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#f6f3ff',
                    borderRadius: '6px',
                    padding: '6px 10px'
                  }}>
                    <span style={{ color: '#722ed1', fontSize: '16px', marginRight: '6px' }}>💬</span>
                    <input 
                      placeholder="Ask AI Assistant..."
                      style={{
                        flex: 1,
                        border: 'none',
                        backgroundColor: 'transparent',
                        padding: '4px 0',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                    
                    {/* Send button */}
                    <Button 
                      type="primary" 
                      style={{ 
                        backgroundColor: '#722ed1', 
                        borderColor: '#722ed1',
                        borderRadius: '6px',
                        height: '28px',
                        fontSize: '13px',
                        padding: '0 12px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      size="small"
                    >
                      Send <span style={{ marginLeft: '3px' }}>&gt;</span>
                    </Button>
                  </div>

                  {/* State dropdown */}
                  <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                    <Button 
                      style={{ 
                        borderColor: '#e8e8e8',
                        backgroundColor: '#fff',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        width: '100px',
                        justifyContent: 'space-between',
                        height: '28px'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span style={{ color: stateColor, fontSize: '13px', fontWeight: 'medium' }}>
                        {getStateLabel(issue.state)}
                      </span>
                      <DownOutlined style={{ fontSize: '10px', color: '#888' }} />
                    </Button>
                  </Dropdown>
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
      padding: '12px 8px 8px 8px', 
      border: '1px solid #e0e0e0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ flex: 1, overflow: 'auto', paddingRight: '4px' }}>
        {/* Maturity Progress Section */}
        <div style={{ 
          marginBottom: '12px', 
          padding: '10px',
          backgroundColor: '#f9f9f9',
          borderRadius: '6px',
          border: '1px solid #e9e9e9'
        }}>
          {/* Owner Review Header with Story Title */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '8px'
          }}>
            <div style={{ 
              width: '22px', 
              height: '22px', 
              borderRadius: '50%', 
              backgroundColor: '#000', 
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 'bold',
              marginRight: '6px'
            }}>
              O
            </div>
            <Text style={{ fontWeight: 'bold', fontSize: '14px', flex: 1 }}>
              {storyTitle ? `${storyTitle} - ${ownerName}` : `Owner Review: ${ownerName}`}
            </Text>
          </div>
          
          {/* Progress bar */}
          <Progress 
            percent={maturityProgress} 
            status={maturityProgress === 100 ? "success" : "active"} 
            strokeColor={maturityProgress === 100 ? "#52c41a" : "#ff4d4f"} 
            strokeWidth={8}
            trailColor="#f0f0f0"
            showInfo={false}
          />
          
          {/* Progress information */}
          <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Incomplete parts text */}
            {maturityProgress < 100 && (
              <div style={{ fontSize: '12px', color: '#ff7a45' }}>
                <Text>Incomplete: </Text>
                {Array.from(new Set(issues.filter(issue => issue.state === 'open').map(issue => issue.category))).map((category, index, arr) => (
                  <Text key={category}>
                    {category}{index < arr.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </div>
            )}
            
            <Text style={{ color: maturityProgress === 100 ? "#52c41a" : "#ff4d4f", fontWeight: 'bold', fontSize: '14px' }}>
              {maturityProgress}% Complete
            </Text>
          </div>
        </div>
        
        {renderIssues()}
      </div>
    </div>
  );
};

export default IssueList; 