import React from 'react';
import { Card, Space, Typography, Statistic } from 'antd';
import { FileSearchOutlined, BulbOutlined, MessageOutlined } from '@ant-design/icons';
import styles from '@/app/page.module.css';

const { Text } = Typography;

interface EvidenceStatisticProps {
  documents: number;
  insights: number;
  comments: number;
}

const EvidenceStatistic: React.FC<EvidenceStatisticProps> = ({
  documents,
  insights,
  comments,
}) => {
  return (
    <Card className={styles.statisticCard}>
      <Space size="large">
        <Statistic
          title={<Text type="secondary">Documents</Text>}
          value={documents}
          prefix={<FileSearchOutlined />}
        />
        <Statistic
          title={<Text type="secondary">Insights</Text>}
          value={insights}
          prefix={<BulbOutlined />}
        />
        <Statistic
          title={<Text type="secondary">Comments</Text>}
          value={comments}
          prefix={<MessageOutlined />}
        />
      </Space>
    </Card>
  );
};

export default EvidenceStatistic; 