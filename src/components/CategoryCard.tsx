import React from 'react';
import { Card } from 'antd';
import styles from '@/app/page.module.css';

interface CategoryCardProps {
  id: number;
  title: string;
  isActive: boolean;
  onClick: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  isActive,
  onClick,
}) => {
  return (
    <Card
      className={`${styles.categoryCard} ${isActive ? styles.activeCard : ''}`}
      onClick={() => onClick(id)}
      hoverable
    >
      <div className={styles.categoryTitle}>{title}</div>
    </Card>
  );
};

export default CategoryCard; 