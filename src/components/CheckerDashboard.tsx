import React from 'react';
import { Card, Space, Typography } from 'antd';
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons';
import styles from '@/app/page.module.css';

const { Text } = Typography;

interface CheckTask {
  id: number;
  title: string;
  subtitle: string;
  status: 'pending' | 'processing' | 'completed';
}

interface CheckerDashboardProps {
  tasks: CheckTask[];
  currentTaskIndex: number;
}

const CheckerDashboard: React.FC<CheckerDashboardProps> = ({
  tasks,
  currentTaskIndex,
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {tasks.map((task, index) => (
        <Card key={task.id} className={styles.taskCard}>
          <Space align="start">
            {task.status === 'completed' ? (
              <CheckCircleFilled style={{ color: '#52c41a' }} />
            ) : task.status === 'processing' ? (
              <LoadingOutlined style={{ color: '#1890ff' }} />
            ) : (
              <div className={styles.emptyIcon} />
            )}
            <Space direction="vertical" size={0}>
              <Text strong>{task.title}</Text>
              <Text type="secondary">{task.subtitle}</Text>
            </Space>
          </Space>
        </Card>
      ))}
    </Space>
  );
};

export default CheckerDashboard; 