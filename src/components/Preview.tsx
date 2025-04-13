import React from 'react';
import { Card, Typography, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import styles from '@/app/page.module.css';

const { Text } = Typography;

interface PreviewProps {
  content: string;
  onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({
  content,
  onClose,
}) => {
  return (
    <Card
      className={styles.previewCard}
      extra={
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={onClose}
        >
          Close Preview
        </Button>
      }
    >
      <Text>{content}</Text>
    </Card>
  );
};

export default Preview; 