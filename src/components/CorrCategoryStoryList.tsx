import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { FileTextOutlined, LinkOutlined } from '@ant-design/icons';
import { SupportItem } from './CorroborationSupportCard';
import styles from '../app/page.module.css';

const { Text } = Typography;

interface CorrCategoryStoryListProps {
  onSelectStory: (storyId: number) => void;
  selectedStoryId?: number;
  stories: Array<{id: number; title: string;}>;
}

// Custom title mapping for CORR stories when selected
export const CORR_STORY_TITLE_MAP: Record<number, string> = {};

const CorrCategoryStoryList: React.FC<CorrCategoryStoryListProps> = ({ 
  onSelectStory,
  selectedStoryId,
  stories
}) => {
  // Just use the first story for docs and second for links
  const docsStory = stories.length > 0 ? stories[0] : null;
  const linksStory = stories.length > 1 ? stories[1] : docsStory;

  // Set custom titles for stories
  if (docsStory) {
    CORR_STORY_TITLE_MAP[docsStory.id] = 'Supported Docs';
  }
  if (linksStory) {
    CORR_STORY_TITLE_MAP[linksStory.id] = 'Mentioned Links';
  }

  return (
    <div className={styles.storyListContainer}>
      <Row gutter={[16, 16]}>
        {/* Supported Docs Card */}
        <Col xs={24} md={12}>
          <Card
            hoverable
            style={{ 
              width: '100%',
              borderRadius: '6px',
              border: selectedStoryId === docsStory?.id ? '2px solid #1677ff' : '1px solid #f0f0f0',
              position: 'relative'
            }}
            bodyStyle={{ padding: '16px' }}
            onClick={() => docsStory && onSelectStory(docsStory.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FileTextOutlined style={{ fontSize: '18px', color: '#1677ff', marginRight: '8px' }} />
              <div>
                <Text strong>Supported Docs</Text>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  Documents that support the claims
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '22px', height: '22px', backgroundColor: '#722ed1', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              2
            </div>
          </Card>
        </Col>

        {/* Mentioned Links Card */}
        <Col xs={24} md={12}>
          <Card
            hoverable
            style={{ 
              width: '100%',
              borderRadius: '6px',
              border: selectedStoryId === linksStory?.id ? '2px solid #fa8c16' : '1px solid #f0f0f0',
              backgroundColor: '#fff7e6',
              position: 'relative'
            }}
            bodyStyle={{ padding: '16px' }}
            onClick={() => linksStory && onSelectStory(linksStory.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LinkOutlined style={{ fontSize: '18px', color: '#fa8c16', marginRight: '8px' }} />
              <div>
                <Text strong>Mentioned Links</Text>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  Links mentioned in the documentation
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '22px', height: '22px', backgroundColor: '#722ed1', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              3
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CorrCategoryStoryList; 