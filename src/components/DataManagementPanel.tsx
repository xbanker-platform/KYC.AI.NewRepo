import React, { useState, useEffect } from 'react';
import { Card, Button, Tabs, Table, Space, Typography, Badge, Tag, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { dataManager, Issue, Company, Category } from '../data';
import { useDataFetching } from '@/hooks/useDataFetching';
import DataFetchingContainer from './DataFetchingContainer';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

interface DataManagementPanelProps {
  activeTab?: string;
}

const DataManagementPanel: React.FC<DataManagementPanelProps> = ({ activeTab = "1" }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [form] = Form.useForm();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch functions
  const fetchIssues = async (): Promise<Issue[]> => {
    return dataManager.getIssues();
  };

  const fetchCompanies = async (): Promise<Company[]> => {
    return dataManager.getCompanies();
  };

  const fetchCategories = async (): Promise<Category[]> => {
    return dataManager.getCategories();
  };

  // Handle tab change
  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  // Handle issue deletion
  const handleDeleteIssue = (id: number) => {
    confirm({
      title: 'Are you sure you want to delete this issue?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        dataManager.deleteIssue(id);
        setRefreshTrigger(prev => prev + 1);
      },
    });
  };

  // Handle issue edit
  const handleEditIssue = (issue: Issue) => {
    setEditingIssue(issue);
    form.setFieldsValue({
      title: issue.title,
      description: issue.description,
      severity: issue.severity,
      category: issue.category,
      state: issue.state,
    });
    setIsModalVisible(true);
  };

  // Handle create new issue
  const handleNewIssue = () => {
    setEditingIssue(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Handle form submit
  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      if (editingIssue) {
        // Update existing issue
        dataManager.updateIssue(editingIssue.id, {
          ...values,
          materiality: values.materiality ? parseInt(values.materiality) : editingIssue.materiality,
        });
      } else {
        // Create new issue
        dataManager.addIssue({
          ...values,
          companyId: 1, // Default to first company
          status: 'warning',
          materiality: values.materiality ? parseInt(values.materiality) : 50,
          requirements: [],
          considerations: [],
        });
      }
      setIsModalVisible(false);
      setRefreshTrigger(prev => prev + 1);
    });
  };

  // Issue columns for table
  const issueColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color={
          category === 'SOW' ? 'purple' :
          category === 'UBO' ? 'blue' :
          category === 'RISK' ? 'red' :
          'green'
        }>
          {category}
        </Tag>
      ),
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={
          severity === 'High' ? 'red' :
          severity === 'Medium' ? 'orange' :
          'green'
        }>
          {severity}
        </Tag>
      ),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (state: string) => (
        <Badge status={
          state === 'open' ? 'processing' :
          state === 'solved' ? 'success' :
          'default'
        } text={state.charAt(0).toUpperCase() + state.slice(1)} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Issue) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditIssue(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteIssue(record.id)}
          />
        </Space>
      ),
    },
  ];

  // Company columns for table
  const companyColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      render: (verified: boolean) => (
        <Badge status={verified ? 'success' : 'error'} text={verified ? 'Yes' : 'No'} />
      ),
    },
  ];

  // Category columns for table
  const categoryColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  // Render functions for each data type
  const renderIssuesTable = (issues: Issue[]) => (
    <>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Title level={5}>Issues Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleNewIssue}>
          New Issue
        </Button>
      </div>
      <Table
        dataSource={issues}
        columns={issueColumns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        size="small"
      />
    </>
  );

  const renderCompaniesTable = (companies: Company[]) => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Title level={5}>Companies</Title>
      </div>
      <Table
        dataSource={companies}
        columns={companyColumns}
        rowKey="id"
        pagination={false}
        size="small"
      />
    </>
  );

  const renderCategoriesTable = (categories: Category[]) => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Title level={5}>Categories</Title>
      </div>
      <Table
        dataSource={categories}
        columns={categoryColumns}
        rowKey="id"
        pagination={false}
        size="small"
      />
    </>
  );

  return (
    <Card title="Data Management" style={{ width: '100%' }}>
      <Tabs activeKey={currentTab} onChange={handleTabChange}>
        <TabPane tab="Issues" key="1">
          <DataFetchingContainer<Issue[]>
            fetchFn={fetchIssues}
            renderSuccess={renderIssuesTable}
            key={`issues-${refreshTrigger}`}
          />
        </TabPane>
        <TabPane tab="Companies" key="2">
          <DataFetchingContainer<Company[]>
            fetchFn={fetchCompanies}
            renderSuccess={renderCompaniesTable}
            key={`companies-${refreshTrigger}`}
          />
        </TabPane>
        <TabPane tab="Categories" key="3">
          <DataFetchingContainer<Category[]>
            fetchFn={fetchCategories}
            renderSuccess={renderCategoriesTable}
            key={`categories-${refreshTrigger}`}
          />
        </TabPane>
      </Tabs>

      {/* Issue Edit/Create Modal */}
      <Modal
        title={editingIssue ? "Edit Issue" : "Create New Issue"}
        open={isModalVisible}
        onOk={handleFormSubmit}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the issue title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select>
              {dataManager.getCategories().map(category => (
                <Option key={category.id} value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="severity"
            label="Severity"
            rules={[{ required: true, message: 'Please select a severity level' }]}
          >
            <Select>
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'Please select a state' }]}
          >
            <Select>
              <Option value="open">Open</Option>
              <Option value="solved">Solved</Option>
              <Option value="dismissed">Dismissed</Option>
            </Select>
          </Form.Item>
          <Form.Item name="materiality" label="Materiality (%)">
            <Input type="number" min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DataManagementPanel; 