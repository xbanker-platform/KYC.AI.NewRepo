'use client';

import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Button, 
  Space, 
  Card, 
  Divider,
  Row,
  Col,
  Input,
  List
} from 'antd';
import { 
  BoldOutlined, 
  ItalicOutlined, 
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  UndoOutlined,
  RedoOutlined,
  CodeOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  MessageOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UploadOutlined,
  FileSearchOutlined,
  BulbOutlined,
  SendOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';
import Navbar from '@/components/Navbar';
import { categories, companies, issues } from '@/data/mockData';

const { Title, Text } = Typography;
const { Content } = Layout;

export default function ProfilePage() {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [activeCompany, setActiveCompany] = useState<number>(1);
  const [expandedIssues, setExpandedIssues] = useState<number[]>([1]);

  const toggleExpand = (issueId: number) => {
    if (expandedIssues.includes(issueId)) {
      setExpandedIssues(expandedIssues.filter(id => id !== issueId));
    } else {
      setExpandedIssues([...expandedIssues, issueId]);
    }
  };

  const filteredIssues = issues.filter(issue => issue.companyId === activeCompany);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />
      <Content style={{ padding: '20px' }}>
        <Row gutter={16}>
          {/* Left Panel - Editor */}
          <Col span={10}>
            <Card style={{ marginBottom: '16px', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Title level={4} style={{ margin: 0 }}>Mr Deng&apos;s Profile</Title>
                <Button type="text" icon={<EyeOutlined />}>Preview</Button>
              </div>
              
              <div style={{ 
                padding: '8px', 
                background: '#f7f7f7', 
                borderRadius: '4px',
                display: 'flex',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <Button type="text" icon={<BoldOutlined />} />
                <Button type="text" icon={<ItalicOutlined />} />
                <Button type="text">H₂</Button>
                <Button type="text" icon={<OrderedListOutlined />} />
                <Button type="text" icon={<UnorderedListOutlined />} />
                <Button type="text" icon={<CodeOutlined />} />
                <Button type="text" icon={<LinkOutlined />} />
                <Button type="text" icon={<PictureOutlined />} />
                <Button type="text" icon={<UndoOutlined />} />
                <Button type="text" icon={<RedoOutlined />} />
              </div>
              
              <div style={{ height: '500px', background: '#fff', border: '1px solid #eee', borderRadius: '4px' }}>
                {/* Editor content would go here */}
              </div>
            </Card>
          </Col>
          
          {/* Right Panel - Checker */}
          <Col span={14}>
            <Card style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Title level={4} style={{ margin: 0 }}>Checker</Title>
                <Space>
                  <Button type="text" style={{ color: '#52c41a' }} icon={<CheckCircleOutlined />}>Check</Button>
                  <Button type="text" style={{ color: '#722ed1' }} icon={<MessageOutlined />}>Assistant</Button>
                </Space>
              </div>
            </Card>
            
            <Card style={{ marginBottom: '16px' }}>
              <Space size="middle" wrap>
                {categories.map(category => (
                  <Button 
                    key={category.id}
                    type={Number(category.id) === activeCategory ? 'primary' : 'default'}
                    style={{
                      background: Number(category.id) === activeCategory ? '#1e293b' : '#f0f0f0',
                      color: Number(category.id) === activeCategory ? '#fff' : '#1e293b',
                      border: 'none'
                    }}
                    onClick={() => setActiveCategory(Number(category.id))}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </Space>
            </Card>
            
            <Card style={{ marginBottom: '16px' }}>
              <List
                dataSource={companies}
                renderItem={(company) => (
                  <Card 
                    style={{ 
                      marginBottom: '8px', 
                      border: Number(company.id) === activeCompany ? '1px solid #722ed1' : '1px solid #f0f0f0',
                      background: Number(company.id) === activeCompany ? '#f9f0ff' : '#fff',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onClick={() => setActiveCompany(Number(company.id))}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <div>{company.name}</div>
                        <Text type="secondary">{company.period}</Text>
                      </div>
                      {company.verified && (
                        <CheckCircleFilled style={{ color: '#52c41a', fontSize: '20px' }} />
                      )}
                    </div>
                    {company.badge && (
                      <div style={{ 
                        position: 'absolute', 
                        top: -10, 
                        right: -10,
                        width: '24px',
                        height: '24px',
                        borderRadius: '12px',
                        background: '#722ed1',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        {company.badge}
                      </div>
                    )}
                  </Card>
                )}
              />
            </Card>
            
            {filteredIssues.map((issue) => {
              const isExpanded = expandedIssues.includes(issue.id);
              
              return (
                <Card key={issue.id} style={{ marginBottom: '16px' }}>
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      cursor: 'pointer' 
                    }}
                    onClick={() => toggleExpand(issue.id)}
                  >
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginRight: '12px' 
                    }}>
                      {issue.status === 'warning' && <QuestionCircleOutlined style={{ color: '#722ed1' }} />}
                      {issue.status === 'success' && <CheckCircleFilled style={{ color: '#52c41a' }} />}
                      {issue.status === 'neutral' && <QuestionCircleOutlined style={{ color: '#d9d9d9' }} />}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <Text 
                        style={{ 
                          color: issue.status === 'warning' ? '#722ed1' : 
                                issue.status === 'success' ? '#52c41a' : '#666',
                          fontWeight: 500
                        }}
                      >
                        {issue.title}
                      </Text>
                    </div>
                    
                    <div>
                      {isExpanded ? <UpOutlined /> : <DownOutlined />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div style={{ marginTop: '16px', marginLeft: '36px' }}>
                      <Text strong>Missing requirements:</Text>
                      <ul style={{ color: '#666', paddingLeft: '20px' }}>
                        {issue.requirements.map((req, index) => (
                          <li key={index} style={{ marginBottom: '8px' }}>
                            <Text>{req}</Text>
                          </li>
                        ))}
                      </ul>
                      
                      <Divider style={{ margin: '16px 0' }} />
                      
                      <Text strong>Considerations</Text>
                      <ul style={{ color: '#666', paddingLeft: '20px' }}>
                        {issue.considerations.map((consideration, index) => (
                          <li key={index} style={{ marginBottom: '8px' }}>
                            <Text>{consideration}</Text>
                          </li>
                        ))}
                      </ul>
                      
                      <Divider style={{ margin: '16px 0' }} />
                      
                      <Row gutter={16}>
                        <Col span={12}>
                          <Card size="small" style={{ textAlign: 'center' }}>
                            <Space direction="vertical" size="small">
                              <UploadOutlined style={{ fontSize: '20px', color: '#333' }} />
                              <div>
                                <Text strong>Upload Document</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  Upload supporting documents for verification
                                </Text>
                              </div>
                            </Space>
                          </Card>
                        </Col>
                        <Col span={12}>
                          <Card size="small" style={{ textAlign: 'center' }}>
                            <Space direction="vertical" size="small">
                              <BulbOutlined style={{ fontSize: '20px', color: '#333' }} />
                              <div>
                                <Text strong>Get Suggestions</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  AI-powered recommendations for risk mitigation
                                </Text>
                              </div>
                            </Space>
                          </Card>
                        </Col>
                      </Row>
                      
                      <Row gutter={16} style={{ marginTop: '16px' }}>
                        <Col span={12}>
                          <Card size="small" style={{ textAlign: 'center' }}>
                            <Space direction="vertical" size="small">
                              <SearchOutlined style={{ fontSize: '20px', color: '#333' }} />
                              <div>
                                <Text strong>AI Search</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  Profile intelligence with AI assistance
                                </Text>
                              </div>
                            </Space>
                          </Card>
                        </Col>
                        <Col span={12}>
                          <Card size="small" style={{ textAlign: 'center' }}>
                            <Space direction="vertical" size="small">
                              <FileSearchOutlined style={{ fontSize: '20px', color: '#333' }} />
                              <div>
                                <Text strong>Search Rules</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  Find relevant compliance rules
                                </Text>
                              </div>
                            </Space>
                          </Card>
                        </Col>
                      </Row>
                      
                      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
                        <Input 
                          placeholder="Ask AI Assistant..." 
                          style={{ flex: 1, marginRight: '8px' }}
                          suffix={<MessageOutlined style={{ color: '#722ed1' }} />}
                        />
                        <Button 
                          type="primary" 
                          style={{ 
                            background: 'linear-gradient(to right, #722ed1, #a855f7)',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          Send <SendOutlined style={{ marginLeft: '5px' }} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
} 