import React from 'react';
import { Space, Button } from 'antd';
import styles from '@/app/page.module.css';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <Space size="middle" wrap className={styles.categoryTabs}>
      {categories.map(category => (
        <Button
          key={category.id}
          type={category.id === activeCategory ? 'primary' : 'default'}
          className={`${styles.categoryTab} ${category.id === activeCategory ? styles.activeTab : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name} ({category.count})
        </Button>
      ))}
    </Space>
  );
};

export default CategoryTabs; 