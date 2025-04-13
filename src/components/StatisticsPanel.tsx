import React from 'react';
import { Card, Space, Typography, Progress, Skeleton, Result, Button } from 'antd';
import { BarChartOutlined, CheckCircleOutlined, WarningOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from '@/app/page.module.css';
import { useDataFetching } from '@/hooks/useDataFetching';
import { dataManager, Statistics } from '@/data';

const { Text } = Typography;

interface StatisticsPanelProps {
  refreshTrigger?: number;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ refreshTrigger = 0 }) => {
  // Function to fetch statistics data
  const fetchStatistics = async (): Promise<Statistics> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return dataManager.getStatistics();
  };

  // Use our data fetching hook
  const { data, status, error, refetch } = useDataFetching<Statistics>(fetchStatistics);

  // Get risk color based on risk level
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return '#52c41a';
      case 'medium':
        return '#faad14';
      case 'high':
        return '#ff4d4f';
      default:
        return '#52c41a';
    }
  };

  // If data is still loading, show skeleton
  if (status === 'loading') {
    return (
      <Space size="large" className={styles.statisticsPanel}>
        <Card className={styles.statCard}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
        <Card className={styles.statCard}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
        <Card className={styles.statCard}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
      </Space>
    );
  }

  // If there was an error fetching data, show error
  if (status === 'error') {
    return (
      <Result
        status="error"
        title="Failed to load statistics"
        subTitle={error?.message || "An error occurred while loading the statistics"}
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={refetch}>
            Try Again
          </Button>
        }
      />
    );
  }

  // If no data is available, show empty state
  if (status === 'empty' || !data) {
    return (
      <Result
        status="info"
        title="No Statistics Available"
        subTitle="Statistics data is not available at the moment"
        extra={
          <Button type="primary" onClick={refetch}>
            Refresh
          </Button>
        }
      />
    );
  }

  // Show statistics data
  const { kycQuality, corroboration, risk } = data;

  return (
    <Space size="large" className={styles.statisticsPanel}>
      <Card className={styles.statCard}>
        <Space align="start">
          <BarChartOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
          <div>
            <Text type="secondary">Overall KYC Quality</Text>
            <div className={styles.statValue}>
              <Text strong style={{ fontSize: '24px', color: '#722ed1' }}>{kycQuality}%</Text>
              <Progress 
                percent={kycQuality} 
                showInfo={false} 
                strokeColor="#722ed1"
                size="small"
              />
              <Text type="secondary">Good Quality Rate: {kycQuality}%</Text>
            </div>
          </div>
        </Space>
      </Card>

      <Card className={styles.statCard}>
        <Space align="start">
          <CheckCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <div>
            <Text type="secondary">Corroboration</Text>
            <div className={styles.statValue}>
              <Text strong style={{ fontSize: '24px', color: '#1890ff' }}>{corroboration}</Text>
              <Progress 
                percent={(corroboration / 100) * 100} 
                showInfo={false} 
                strokeColor="#1890ff"
                size="small"
              />
              <Text type="secondary">置信水平</Text>
            </div>
          </div>
        </Space>
      </Card>

      <Card className={styles.statCard}>
        <Space align="start">
          <WarningOutlined style={{ fontSize: '24px', color: getRiskColor(risk) }} />
          <div>
            <Text type="secondary">Risk</Text>
            <div className={styles.statValue}>
              <Text strong style={{ fontSize: '24px', color: getRiskColor(risk) }}>{risk}</Text>
              <Text type="secondary">风险评估</Text>
            </div>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default StatisticsPanel; 