import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from '@/app/page.module.css';

interface CheckerProps {
  onCheck: () => void;
  isLoading?: boolean;
}

const Checker: React.FC<CheckerProps> = ({ onCheck, isLoading = false }) => {
  return (
    <Button
      type="primary"
      icon={<CheckCircleOutlined />}
      onClick={onCheck}
      loading={isLoading}
      className={styles.checkerButton}
    >
      Check
    </Button>
  );
};

export default Checker; 