import React, { useState } from 'react';
import { Row, Col } from 'antd';
import StoryCard from './StoryCard';
import type { Story } from '@/data/types';
import { dataManager } from '@/data';
import styles from './StoryList.module.css';

interface StoryListProps {
  categoryId: string;
  onSelectStory: (storyId: number) => void;
  selectedStoryId?: number;
}

const StoryList: React.FC<StoryListProps> = ({ 
  categoryId, 
  onSelectStory,
  selectedStoryId 
}) => {
  const getStories = async (): Promise<Story[]> => {
    return dataManager.getStoriesByCategory(categoryId);
  };

  // Fetch stories
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const fetchedStories = await getStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [categoryId]);

  if (loading) {
    return <div>Loading stories...</div>;
  }

  if (stories.length === 0) {
    return <div>No stories found for this category.</div>;
  }

  return (
    <div className={styles.storyListContainer}>
      <Row gutter={[16, 16]} className={styles.storyGrid}>
        {stories.map(story => (
          <Col 
            key={story.id} 
            xs={24} 
            sm={12} 
            md={8} 
            lg={6} 
            xl={6}
            style={{ display: 'flex' }}
          >
            <StoryCard 
              story={story}
              onClick={() => onSelectStory(story.id)}
              isSelected={selectedStoryId === story.id}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StoryList; 