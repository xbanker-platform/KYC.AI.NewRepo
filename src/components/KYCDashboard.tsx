import React from 'react';
import { Layout, Row, Col, Space } from 'antd';
import CategoryCard from './CategoryCard';
import EvidenceStatistic from './EvidenceStatistic';
import IssueList from './IssueList';
import Checker from './Checker';
import styles from '@/app/page.module.css';

const { Content } = Layout;

interface Category {
  id: number;
  title: string;
}

interface KYCDashboardProps {
  categories: Category[];
  activeCategory: number;
  issues: any[];
  expandedIssues: number[];
  issueActions: Record<number, string>;
  activeDropdownId: number | null;
  onCategoryClick: (id: number) => void;
  onToggleExpand: (id: number) => void;
  onIssueAction: (id: number, action: string) => void;
  setActiveDropdownId: (id: number | null) => void;
  onCheck: () => void;
}

const KYCDashboard: React.FC<KYCDashboardProps> = ({
  categories,
  activeCategory,
  issues,
  expandedIssues,
  issueActions,
  activeDropdownId,
  onCategoryClick,
  onToggleExpand,
  onIssueAction,
  setActiveDropdownId,
  onCheck,
}) => {
  return (
    <Content className={styles.dashboardContent}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space size="middle">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  isActive={category.id === activeCategory}
                  onClick={onCategoryClick}
                />
              ))}
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <EvidenceStatistic
              documents={10}
              insights={5}
              comments={3}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space style={{ width: '100%' }} direction="vertical">
              <Checker onCheck={onCheck} />
              <IssueList
                issues={issues}
                expandedIssues={expandedIssues}
                issueActions={issueActions}
                activeDropdownId={activeDropdownId}
                onToggleExpand={onToggleExpand}
                onIssueAction={onIssueAction}
                setActiveDropdownId={setActiveDropdownId}
              />
            </Space>
          </Col>
        </Row>
      </Space>
    </Content>
  );
};

export default KYCDashboard; 