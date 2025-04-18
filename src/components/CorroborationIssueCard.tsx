import React from 'react';
import { Typography, Button, Progress, Dropdown } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { Issue } from '@/data/types';

const { Text } = Typography;

interface CorroborationIssueCardProps {
  issue: Issue;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  onUpdateIssueState: (issueId: number, newState: 'open' | 'solved' | 'dismissed') => void;
}

const CorroborationIssueCard: React.FC<CorroborationIssueCardProps> = ({
  issue,
  isExpanded,
  onToggleExpand,
  onUpdateIssueState,
}) => {
  // Get state label
  const getStateLabel = (state: string) => {
    switch (state) {
      case 'open': return 'Open';
      case 'solved': return 'Verified';
      case 'dismissed': return 'Rejected';
      default: return 'Verify';
    }
  };

  // Get state color - using blue for corroboration
  const stateColor = '#1890ff';

  // Dropdown items for state change
  const items = [
    {
      key: 'open',
      label: 'Open',
      onClick: () => onUpdateIssueState(issue.id, 'open')
    },
    {
      key: 'solve',
      label: 'Verify',
      onClick: () => onUpdateIssueState(issue.id, 'solved')
    },
    {
      key: 'dismiss',
      label: 'Reject',
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
        backgroundColor: '#f0f7ff',
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
          backgroundColor: '#f0f7ff',
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
            C
          </div>
          <div>
            <Text style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', display: 'block' }}>
              {issue.title}
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Corroboration Story
            </Text>
          </div>
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
        <div style={{ padding: '0 16px 16px', backgroundColor: '#f0f7ff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ color: '#666', marginTop: '12px', fontSize: '14px' }}>
            {issue.description}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Text style={{ marginRight: '8px' }}>Materiality</Text>
            <Text strong style={{ color: stateColor }}>{issue.materiality}%</Text>
            <div style={{ flex: 1, marginLeft: '8px' }}>
              <Progress percent={issue.materiality} status="active" strokeColor={stateColor} />
            </div>
          </div>

          <div>
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Corroboration requirements:</div>
              <ul style={{ paddingLeft: '20px', color: '#666', listStyleType: 'disc', margin: '0' }}>
                {issue.requirements.map((req, index) => (
                  <li key={index} style={{ marginBottom: '6px' }}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Verification considerations</div>
              <ul style={{ paddingLeft: '20px', color: '#666', listStyleType: 'disc', margin: '0' }}>
                {issue.considerations.map((con, index) => (
                  <li key={index} style={{ marginBottom: '6px' }}>{con}</li>
                ))}
              </ul>
            </div>

            {/* Special Action buttons row for corroboration */}
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
                padding: '12px',
                backgroundColor: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>🔎</span>
                  <Text strong>Verify Sources</Text>
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Check source reliability and authenticity
                </Text>
              </div>
              
              <div style={{ 
                width: 'calc(50% - 6px)', 
                border: '1px solid #e0e0e0', 
                borderRadius: '6px',
                padding: '12px',
                backgroundColor: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>📊</span>
                  <Text strong>Cross-reference Data</Text>
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Compare with other reliable data sources
                </Text>
              </div>
              
              <div style={{ 
                width: 'calc(50% - 6px)', 
                border: '1px solid #e0e0e0', 
                borderRadius: '6px',
                padding: '12px',
                backgroundColor: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>📱</span>
                  <Text strong>Request Additional Data</Text>
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Contact client for supplementary information
                </Text>
              </div>
              
              <div style={{ 
                width: 'calc(50% - 6px)', 
                border: '1px solid #e0e0e0', 
                borderRadius: '6px',
                padding: '12px',
                backgroundColor: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>⚖️</span>
                  <Text strong>Regulatory Check</Text>
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Verify compliance with regulatory requirements
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
                backgroundColor: '#e6f7ff',
                borderRadius: '6px',
                padding: '6px 10px'
              }}>
                <span style={{ color: stateColor, fontSize: '16px', marginRight: '6px' }}>💬</span>
                <input 
                  placeholder="Ask about verification..."
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
                    backgroundColor: stateColor, 
                    borderColor: stateColor,
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
};

export default CorroborationIssueCard; 