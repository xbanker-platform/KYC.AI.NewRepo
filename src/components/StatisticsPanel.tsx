import React from 'react';
import { Card, Space, Typography, Progress } from 'antd';
import { BarChartOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import styles from '@/app/page.module.css';

const { Text } = Typography;

interface StatisticsPanelProps {
  kycQuality: number;
  corroboration: number;
  risk: 'Low' | 'Medium' | 'High';
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  kycQuality,
  corroboration,
  risk
}) => {
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