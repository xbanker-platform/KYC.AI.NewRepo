import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { FileTextOutlined, LinkOutlined } from '@ant-design/icons';
import { SupportItem } from './CorroborationSupportCard';
import { CORR_STORY_TITLE_MAP } from './CorrCategoryStoryList';

const { Text } = Typography;

interface CorrCategoryViewProps {
  supportingDocs?: SupportItem[];
  mentionedLinks?: SupportItem[];
  storyTitle?: string;
  storyId?: number;
}

const CorrCategoryView: React.FC<CorrCategoryViewProps> = ({
  supportingDocs = [],
  mentionedLinks = [],
  storyTitle,
  storyId
}) => {
  // Determine the type based on the storyTitle/storyId
  const getTypeFromTitle = () => {
    if (!storyId) return null;
    const title = CORR_STORY_TITLE_MAP[storyId];
    if (title === 'Supported Docs') return 'docs';
    if (title === 'Mentioned Links') return 'links';
    return null;
  };

  // Set the selected type directly based on the story
  const [selectedType, setSelectedType] = useState<'docs' | 'links' | null>(getTypeFromTitle());

  // Update selected type when storyId changes
  useEffect(() => {
    setSelectedType(getTypeFromTitle());
  }, [storyId]);

  const handleCardClick = (type: 'docs' | 'links') => {
    setSelectedType(type);
  };

  // If we have a selected type (from story selection), render the content directly
  if (selectedType === 'docs') {
    return (
      <Card 
        style={{ 
          borderRadius: '6px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ padding: '8px' }}>
          <Text strong>Supported Docs</Text>
          <div style={{ color: '#888', marginTop: '8px' }}>
            Supported Docs component will be implemented here
          </div>
        </div>
      </Card>
    );
  }
  
  if (selectedType === 'links') {
    return (
      <Card 
        style={{ 
          borderRadius: '6px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ padding: '8px' }}>
          <Text strong>Mentioned Links</Text>
          <div style={{ color: '#888', marginTop: '8px' }}>
            Mentioned Links component will be implemented here
          </div>
        </div>
      </Card>
    );
  }

  // Otherwise, render the card selection view
  return (
    <Row gutter={[16, 16]}>
      {/* Supported Docs Card */}
      <Col xs={24} sm={24} md={12}>
        <Card
          hoverable
          style={{ 
            width: '100%',
            borderRadius: '6px',
            border: '1px solid #f0f0f0',
            position: 'relative',
            cursor: 'pointer'
          }}
          bodyStyle={{ padding: '16px' }}
          onClick={() => handleCardClick('docs')}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FileTextOutlined style={{ fontSize: '18px', color: '#1677ff', marginRight: '12px' }} />
            <div>
              <Text strong>Supported Docs</Text>
              <div style={{ fontSize: '14px', color: '#888' }}>
                Documents that support the claims
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '22px', height: '22px', backgroundColor: '#722ed1', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
            {supportingDocs.length || 2}
          </div>
        </Card>
      </Col>

      {/* Mentioned Links Card */}
      <Col xs={24} sm={24} md={12}>
        <Card
          hoverable
          style={{ 
            width: '100%',
            borderRadius: '6px',
            border: '1px solid #f0f0f0',
            backgroundColor: '#fff7e6',
            position: 'relative',
            cursor: 'pointer'
          }}
          bodyStyle={{ padding: '16px' }}
          onClick={() => handleCardClick('links')}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LinkOutlined style={{ fontSize: '18px', color: '#fa8c16', marginRight: '12px' }} />
            <div>
              <Text strong>Mentioned Links</Text>
              <div style={{ fontSize: '14px', color: '#888' }}>
                Links mentioned in the documentation
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '22px', height: '22px', backgroundColor: '#722ed1', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
            {mentionedLinks.length || 3}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default CorrCategoryView; 