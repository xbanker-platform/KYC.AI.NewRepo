import React from 'react';
import { Card, Badge, Typography, Space } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { Story } from '@/data/types';
import styles from './StoryCard.module.css';

const { Text, Title } = Typography;

interface StoryCardProps {
  story: Story;
  onClick: () => void;
  isSelected?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onClick, isSelected = false }) => {
  return (
    <Card 
      className={`${styles.storyCard} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      hoverable
      bodyStyle={{ 
        padding: '12px', 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        borderLeft: isSelected ? '3px solid #1890ff' : 'none'
      }}
    >
      <div className={styles.storyHeader}>
        <Title level={5} className={styles.storyTitle}>{story.title}</Title>
        {story.verified && (
          <CheckCircleFilled className={styles.verifiedIcon} />
        )}
      </div>
      
      <Space direction="vertical" size={2} className={styles.storyInfo}>
        <Text type="secondary" className={styles.companyName} ellipsis>{story.company.name}</Text>
        <Text type="secondary" className={styles.period} ellipsis>{story.period}</Text>
      </Space>
      
      <Badge 
        count={story.issueIds.length} 
        className={styles.badge}
        style={{ 
          backgroundColor: story.issueIds.length > 0 ? '#ff4d4f' : '#d9d9d9',
          position: 'absolute',
          bottom: '8px',
          right: '8px'
        }}
        overflowCount={99}
      />
    </Card>
  );
};

export default StoryCard; 