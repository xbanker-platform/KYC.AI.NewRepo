import React from 'react';
import { Card, Typography, Space, Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from '@/app/page.module.css';

const { Text, Title } = Typography;

interface IssueCardProps {
  id: number;
  title: string;
  description: string;
  severity: string;
  isExpanded: boolean;
  action?: string;
  onToggle: (id: number) => void;
  onAction: (id: number, action: string) => void;
  activeDropdownId: number | null;
  setActiveDropdownId: (id: number | null) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({
  id,
  title,
  description,
  severity,
  isExpanded,
  action,
  onToggle,
  onAction,
  activeDropdownId,
  setActiveDropdownId,
}) => {
  const actionItems = [
    { key: 'solve', label: 'Solve' },
    { key: 'dismiss', label: 'Dismiss' },
    { key: 'helpful', label: 'Helpful' },
    { key: 'notHelpful', label: 'Not Helpful' },
    { key: 'feedback', label: 'Feedback' },
  ];

  const getActionColor = (action?: string) => {
    switch (action) {
      case 'solve': return '#52c41a';
      case 'helpful': return '#1890ff';
      case 'feedback': return '#722ed1';
      case 'notHelpful': return '#faad14';
      case 'dismiss': return '#ff4d4f';
      default: return '#666';
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id);
  };

  return (
    <Card 
      className={styles.issueCard}
      onClick={handleCardClick}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Title level={5}>{title}</Title>
          <Dropdown
            menu={{
              items: actionItems.map(item => ({
                ...item,
                onClick: () => {
                  onAction(id, item.key);
                  setActiveDropdownId(null);
                },
              })),
            }}
            open={activeDropdownId === id}
            onOpenChange={(open) => setActiveDropdownId(open ? id : null)}
            trigger={['click']}
          >
            <Button
              type="text"
              style={{ color: getActionColor(action) }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {action ? actionItems.find(item => item.key === action)?.label : 'Action'} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        {isExpanded && (
          <>
            <Text type="secondary">{description}</Text>
            <Text type="danger">Severity: {severity}</Text>
          </>
        )}
      </Space>
    </Card>
  );
};

export default IssueCard; 