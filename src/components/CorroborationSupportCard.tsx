import React, { useState } from 'react';
import { Typography, Button, Card } from 'antd';
import { DownOutlined, UpOutlined, FileTextOutlined, LinkOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

const { Text, Title } = Typography;

// Define types for the support data
export type SupportType = 'document' | 'link';

export interface SupportItem {
  id: string;
  title: string;
  type: SupportType;
  content: string; // Markdown content
  date?: string;
  source?: string;
}

interface CorroborationSupportCardProps {
  type: SupportType;
  items: SupportItem[];
  storyTitle?: string;
}

const CorroborationSupportCard: React.FC<CorroborationSupportCardProps> = ({
  type,
  items,
  storyTitle
}) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedItemId === id) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(id);
    }
  };

  const getIcon = (type: SupportType) => {
    return type === 'document' ? <FileTextOutlined /> : <LinkOutlined />;
  };

  const getTitle = (type: SupportType) => {
    return type === 'document' ? 'Supporting Documents' : 'Mentioned Links';
  };

  const getBgColor = (type: SupportType) => {
    return type === 'document' ? '#f0f7ff' : '#f9f0ff';
  };

  const getAccentColor = (type: SupportType) => {
    return type === 'document' ? '#1890ff' : '#722ed1';
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {getIcon(type)}
            <span style={{ marginLeft: '8px' }}>{getTitle(type)}</span>
            {storyTitle && <Text type="secondary" style={{ marginLeft: '12px', fontSize: '14px' }}>({storyTitle})</Text>}
          </div>
        }
        style={{ 
          backgroundColor: getBgColor(type),
          borderLeft: `4px solid ${getAccentColor(type)}`
        }}
        headStyle={{
          backgroundColor: getBgColor(type),
          borderBottom: '1px solid #e8e8e8'
        }}
        bodyStyle={{
          padding: '0'
        }}
      >
        {items.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
            No {type === 'document' ? 'documents' : 'links'} available.
          </div>
        ) : (
          items.map((item, index) => (
            <div 
              key={item.id} 
              style={{ 
                borderBottom: index === items.length - 1 ? 'none' : '1px solid #e8e8e8'
              }}
            >
              <div 
                style={{ 
                  padding: '12px 16px', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => toggleExpand(item.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      color: getAccentColor(type),
                      marginRight: '8px',
                      fontSize: '16px'
                    }}>
                      {getIcon(type)}
                    </div>
                    <Text strong>{item.title}</Text>
                  </div>
                  {item.source && (
                    <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '2px' }}>
                      Source: {item.source}
                    </Text>
                  )}
                </div>

                <Button 
                  type="text"
                  icon={expandedItemId === item.id ? <UpOutlined /> : <DownOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(item.id);
                  }}
                />
              </div>

              {expandedItemId === item.id && (
                <div style={{ 
                  padding: '0 16px 16px 16px',
                  backgroundColor: 'white',
                  border: '1px solid #e8e8e8',
                  borderRadius: '0 0 4px 4px',
                  margin: '0 12px 12px 12px'
                }}>
                  <div className="markdown-content" style={{ overflowX: 'auto' }}>
                    <ReactMarkdown>{item.content}</ReactMarkdown>
                  </div>

                  {item.date && (
                    <div style={{ 
                      marginTop: '12px', 
                      borderTop: '1px solid #f0f0f0', 
                      paddingTop: '8px', 
                      color: '#888',
                      fontSize: '12px',
                      textAlign: 'right'
                    }}>
                      Date: {item.date}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default CorroborationSupportCard; 