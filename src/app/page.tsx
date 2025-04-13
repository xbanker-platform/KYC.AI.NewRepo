'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Typography, 
  Button, 
  Space, 
  Card, 
  Divider,
  Row,
  Col,
  Modal,
  Spin,
  Dropdown
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
  LoadingOutlined,
  FullscreenOutlined
} from '@ant-design/icons';
import { categories, companies, issues } from '@/data/mockData';

const { Title, Text } = Typography;
const { Content } = Layout;

// Define check tasks
const checkTasks = [
  {
    id: 1,
    title: 'Story Manager Initial',
    subtitle: '正在分析全文',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Story Manager Delta',
    subtitle: '正在分析文本变更',
    status: 'pending'
  },
  {
    id: 3,
    title: 'Entity Query',
    subtitle: '正在研究公司实体: 2c2p Company',
    status: 'pending'
  },
  {
    id: 4,
    title: 'Entity Query Person',
    subtitle: '正在搜索个人实体: wang yusheng',
    status: 'pending'
  },
  {
    id: 5,
    title: 'Links Processor',
    subtitle: '正在批量解析文件: 4 links',
    status: 'pending'
  },
  {
    id: 6,
    title: 'Images Processor',
    subtitle: '正在批量解析图片: 4 links',
    status: 'pending'
  },
  {
    id: 7,
    title: 'Story Analyst',
    subtitle: '正在重新分析: Mr Deng\'s Profile',
    status: 'pending'
  },
  {
    id: 8,
    title: 'Risk Analyst',
    subtitle: '',
    status: 'pending'
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [activeCompany, setActiveCompany] = useState(1);
  const [expandedIssues, setExpandedIssues] = useState<number[]>([1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState(checkTasks);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
  const [issueActions, setIssueActions] = useState<Record<number, string>>({});
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  
  const toggleExpand = (issueId: number) => {
    if (expandedIssues.includes(issueId)) {
      setExpandedIssues(expandedIssues.filter(id => id !== issueId));
    } else {
      setExpandedIssues([...expandedIssues, issueId]);
    }
  };

  const filteredIssues = issues.filter(issue => issue.companyId === activeCompany);

  const handleCheck = () => {
    setTasks(checkTasks.map(task => ({ ...task, status: 'pending' })));
    setIsModalOpen(true);
    setCurrentTaskIndex(-1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleIssueAction = (issueId: number, action: string) => {
    setIssueActions(prev => ({
      ...prev,
      [issueId]: action
    }));
    setActiveDropdownId(null);
  };

  const getActionColor = (action?: string) => {
    switch (action) {
      case 'solve':
        return '#52c41a'; // Green
      case 'helpful':
        return '#1890ff'; // Blue
      case 'feedback':
        return '#722ed1'; // Purple
      case 'notHelpful':
        return '#faad14'; // Yellow/Orange
      case 'dismiss':
        return '#ff4d4f'; // Red
      default:
        return '#666'; // Default gray
    }
  };

  const getActionName = (action?: string) => {
    switch (action) {
      case 'solve':
        return 'Solve';
      case 'dismiss':
        return 'Dismiss';
      case 'helpful':
        return 'Helpful';
      case 'notHelpful':
        return 'Not Helpful';
      case 'feedback':
        return 'Feedback';
      default:
        return 'Solve';
    }
  };

  // Effect to animate task checking
  useEffect(() => {
    if (isModalOpen && currentTaskIndex < tasks.length - 1) {
      const timer = setTimeout(() => {
        const newIndex = currentTaskIndex + 1;
        setCurrentTaskIndex(newIndex);
        
        // Update the status of the current task to 'processing'
        if (newIndex >= 0) {
          setTasks(prev => {
            const newTasks = [...prev];
            
            // First set the current task to processing
            if (newTasks[newIndex]) {
              newTasks[newIndex] = { ...newTasks[newIndex], status: 'processing' };
            }
            
            // Then set the previous task to completed if it exists
            if (newIndex > 0 && newTasks[newIndex - 1]) {
              newTasks[newIndex - 1] = { ...newTasks[newIndex - 1], status: 'completed' };
            }
            
            return newTasks;
          });
        }
      }, 600);
      
      return () => clearTimeout(timer);
    } else if (isModalOpen && currentTaskIndex === tasks.length - 1) {
      // Complete the last task after delay
      const timer = setTimeout(() => {
        setTasks(prev => {
          const newTasks = [...prev];
          newTasks[currentTaskIndex] = { ...newTasks[currentTaskIndex], status: 'completed' };
          return newTasks;
        });
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, currentTaskIndex, tasks.length]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>Checker</Title>
                <Space>
                  <Button 
                    type="text" 
                    style={{ color: '#52c41a' }} 
                    icon={<CheckCircleOutlined />}
                    onClick={handleCheck}
                  >
                    Check
                  </Button>
                  <Button type="text" style={{ color: '#722ed1' }} icon={<MessageOutlined />}>Assistant</Button>
                </Space>
              </div>
            </Card>
            
            {/* Categories */}
            <div style={{ marginBottom: '24px' }}>
              <Space size="middle" wrap>
                {categories.map(category => (
                  <Button 
                    key={category.id}
                    type={category.id === activeCategory ? 'primary' : 'default'}
                    style={{
                      background: category.id === activeCategory ? '#1e293b' : '#f0f0f0',
                      color: category.id === activeCategory ? '#fff' : '#1e293b',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '6px 16px',
                      height: 'auto',
                      fontWeight: 500,
                      fontSize: '14px'
                    }}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </Space>
            </div>
            
            {/* Companies */}
            <div style={{ marginBottom: '24px' }}>
              <Row gutter={[16, 16]}>
                {companies.map((company) => (
                  <Col span={12} key={company.id}>
                    <Card 
                      style={{ 
                        border: company.id === activeCompany ? '1px solid #722ed1' : '1px solid #f0f0f0',
                        borderRadius: '16px',
                        background: company.id === activeCompany ? '#f9f0ff' : '#fff',
                        position: 'relative',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                        height: '100%',
                        padding: 0
                      }}
                      styles={{
                        body: { 
                          padding: '16px 24px',
                          height: '100%'
                        }
                      }}
                      onClick={() => setActiveCompany(company.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ 
                            fontWeight: 500, 
                            fontSize: '16px', 
                            marginBottom: '4px',
                            color: '#333'
                          }}>
                            {company.name}
                          </div>
                          <Text type="secondary" style={{ fontSize: '14px' }}>{company.period}</Text>
                        </div>
                        {company.verified && (
                          <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            background: 'rgba(82, 196, 26, 0.1)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            boxShadow: '0 0 8px rgba(82, 196, 26, 0.2)'
                          }}>
                            <CheckCircleFilled style={{ color: '#52c41a', fontSize: '16px' }} />
                          </div>
                        )}
                      </div>
                      {company.badge && (
                        <div style={{ 
                          position: 'absolute', 
                          bottom: 4,
                          right: 4,
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#722ed1',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          {company.badge}
                        </div>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            
            {/* Issues */}
            {filteredIssues.map((issue) => {
              const isExpanded = expandedIssues.includes(issue.id);
              
              return (
                <div
                  key={issue.id}
                  style={{
                    marginBottom: '16px',
                    border: isExpanded ? '1px solid #e0e0e0' : 'none',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '16px',
                      background: '#fff',
                      cursor: 'pointer',
                      borderTopLeftRadius: isExpanded ? '8px' : '8px',
                      borderTopRightRadius: isExpanded ? '8px' : '8px',
                      borderBottomLeftRadius: isExpanded ? '0' : '8px',
                      borderBottomRightRadius: isExpanded ? '0' : '8px',
                    }}
                    onClick={() => toggleExpand(issue.id)}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      width: '100%' 
                    }}>
                      <div style={{ marginRight: '12px' }}>
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          borderRadius: '50%'
                        }}>
                          {issue.status === 'warning' && <QuestionCircleOutlined style={{ color: '#722ed1' }} />}
                          {issue.status === 'success' && <CheckCircleFilled style={{ color: '#52c41a' }} />}
                          {issue.status === 'neutral' && <QuestionCircleOutlined style={{ color: '#d9d9d9' }} />}
                        </div>
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <Text 
                          style={{ 
                            color: issue.status === 'warning' ? '#722ed1' : 
                                  issue.status === 'success' ? '#52c41a' : '#666',
                            fontWeight: 500,
                            fontSize: '16px'
                          }}
                        >
                          {issue.title}
                        </Text>
                      </div>
                      
                      <div>
                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: 'solve',
                                label: <span style={{ 
                                  color: '#52c41a', 
                                  fontWeight: 500,
                                  display: 'block',
                                  padding: '6px 8px',
                                  fontSize: '16px'
                                }}>Solve</span>,
                                onClick: () => handleIssueAction(issue.id, 'solve'),
                                style: { margin: '2px 0' }
                              },
                              {
                                key: 'dismiss',
                                label: <span style={{ 
                                  color: '#ff4d4f', 
                                  fontWeight: 500,
                                  display: 'block',
                                  padding: '6px 8px',
                                  fontSize: '16px'
                                }}>Dismiss</span>,
                                onClick: () => handleIssueAction(issue.id, 'dismiss'),
                                style: { margin: '2px 0' }
                              },
                              {
                                key: 'helpful',
                                label: <span style={{ 
                                  color: '#1890ff', 
                                  fontWeight: 500,
                                  display: 'block',
                                  padding: '6px 8px',
                                  fontSize: '16px'
                                }}>Helpful</span>,
                                onClick: () => handleIssueAction(issue.id, 'helpful'),
                                style: { margin: '2px 0' }
                              },
                              {
                                key: 'notHelpful',
                                label: <span style={{ 
                                  color: '#faad14', 
                                  fontWeight: 500,
                                  display: 'block',
                                  padding: '6px 8px',
                                  fontSize: '16px'
                                }}>Not Helpful</span>,
                                onClick: () => handleIssueAction(issue.id, 'notHelpful'),
                                style: { margin: '2px 0' }
                              },
                              {
                                key: 'feedback',
                                label: <span style={{ 
                                  color: '#722ed1', 
                                  fontWeight: 500,
                                  display: 'block',
                                  padding: '6px 8px',
                                  fontSize: '16px'
                                }}>Feedback</span>,
                                onClick: () => handleIssueAction(issue.id, 'feedback'),
                                style: { margin: '2px 0' }
                              }
                            ]
                          }}
                          trigger={['click']}
                          open={activeDropdownId === issue.id}
                          onOpenChange={(open) => {
                            if (open) {
                              setActiveDropdownId(issue.id);
                            } else {
                              setActiveDropdownId(null);
                            }
                          }}
                          dropdownRender={(menu) => (
                            <div style={{
                              backgroundColor: 'white',
                              border: '1px solid #f0f0f0',
                              borderRadius: '8px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              padding: '8px 0',
                              width: '180px'
                            }}>
                              {menu}
                            </div>
                          )}
                        >
                          <Button 
                            type="text"
                            style={{
                              border: '1px solid #F5E4D9',
                              borderRadius: '16px',
                              background: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px 16px',
                              gap: '4px',
                              color: getActionColor(issueActions[issue.id]),
                              fontSize: '14px',
                              height: 'auto',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {getActionName(issueActions[issue.id])} <DownOutlined style={{ fontSize: '9px', opacity: 0.7 }} />
                          </Button>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded issue content */}
                  {isExpanded && (
                    <div style={{ 
                      position: 'relative',
                      background: '#f9f0ff',
                      padding: '20px 20px 20px 40px',
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '4px',
                        height: '100%',
                        background: '#722ed1'
                      }} />
                    
                      <Text strong style={{ color: '#333', display: 'block', marginBottom: '12px' }}>Missing requirements:</Text>
                      <ul style={{ color: '#666', paddingLeft: '10px', listStyleType: 'none', marginBottom: '16px' }}>
                        {issue.requirements.map((req, index) => (
                          <li key={index} style={{ 
                            marginBottom: '10px', 
                            position: 'relative',
                            paddingLeft: '20px'
                          }}>
                            <div style={{
                              position: 'absolute',
                              left: 0,
                              top: '8px',
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: '#d8d8d8'
                            }} />
                            <Text>{req}</Text>
                          </li>
                        ))}
                      </ul>
                      
                      <Text strong style={{ color: '#333', display: 'block', marginBottom: '12px' }}>Considerations</Text>
                      <ul style={{ color: '#666', paddingLeft: '0', listStyleType: 'none', marginBottom: '20px' }}>
                        {issue.considerations.map((consideration, index) => (
                          <li key={index} style={{ 
                            marginBottom: '10px', 
                            position: 'relative',
                            paddingLeft: '16px',
                            display: 'flex'
                          }}>
                            <div style={{ marginRight: '4px' }}>•</div>
                            <Text>{consideration}</Text>
                          </li>
                        ))}
                      </ul>
                      
                      <Divider style={{ 
                        margin: '0 0 20px 0', 
                        background: 'linear-gradient(to right, #722ed1, #1890ff, #52c41a)',
                        height: '2px'
                      }} />
                      
                      <Row gutter={16} style={{ marginBottom: '16px' }}>
                        <Col span={12}>
                          <Card size="small" style={{ 
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            borderRadius: '8px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <div style={{ 
                                width: '40px', 
                                height: '40px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}>
                                <UploadOutlined style={{ fontSize: '20px', color: '#333' }} />
                              </div>
                              <div>
                                <Text strong style={{ display: 'block' }}>Upload Document</Text>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  Upload supporting documents for verification
                                </Text>
                              </div>
                            </div>
                          </Card>
                        </Col>
                        <Col span={12}>
                          <Card size="small" style={{ 
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            borderRadius: '8px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <div style={{ 
                                width: '40px', 
                                height: '40px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}>
                                <BulbOutlined style={{ fontSize: '20px', color: '#333' }} />
                              </div>
                              <div>
                                <Text strong style={{ display: 'block' }}>Get Suggestions</Text>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  AI-powered recommendations for risk mitigation
                                </Text>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                      
                      <Row gutter={16} style={{ marginBottom: '16px' }}>
                        <Col span={12}>
                          <Card size="small" style={{ 
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            borderRadius: '8px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <div style={{ 
                                width: '40px', 
                                height: '40px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}>
                                <SearchOutlined style={{ fontSize: '20px', color: '#333' }} />
                              </div>
                              <div>
                                <Text strong style={{ display: 'block' }}>AI Search</Text>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  Profile intelligence with AI assistance
                                </Text>
                              </div>
                            </div>
                          </Card>
                        </Col>
                        <Col span={12}>
                          <Card size="small" style={{ 
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            borderRadius: '8px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <div style={{ 
                                width: '40px', 
                                height: '40px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}>
                                <FileSearchOutlined style={{ fontSize: '20px', color: '#333' }} />
                              </div>
                              <div>
                                <Text strong style={{ display: 'block' }}>Search Rules</Text>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  Find relevant compliance rules
                                </Text>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                      
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                          flex: 1, 
                          position: 'relative',
                          marginRight: '8px',
                          background: '#fff',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          color: '#999'
                        }}>
                          Ask AI Assistant...
                          <MessageOutlined style={{ 
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#722ed1'
                          }} />
                        </div>
                        <Button 
                          type="primary" 
                          size="large"
                          style={{ 
                            background: 'linear-gradient(to right, #722ed1, #a855f7)',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '8px',
                            gap: '4px'
                          }}
                        >
                          Send 
                          <SendOutlined />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Check Process Modal */}
            <Modal
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Check Process</span>
                  <Button type="text" icon={<FullscreenOutlined />} style={{ marginRight: -8 }} />
                </div>
              }
              open={isModalOpen}
              onCancel={handleCancel}
              footer={[
                <Button key="close" onClick={handleCancel}>
                  Close
                </Button>
              ]}
              width={500}
              centered
              styles={{
                header: {
                  paddingBottom: 16,
                  borderBottom: '1px solid #f0f0f0'
                },
                body: {
                  padding: '20px 24px',
                  maxHeight: '60vh',
                  overflowY: 'auto'
                }
              }}
            >
              <div style={{ padding: '8px 0' }}>
                {tasks.map(task => (
                  <div key={task.id} style={{ display: 'flex', marginBottom: 24, alignItems: 'flex-start' }}>
                    <div style={{ 
                      marginRight: 16,
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: task.status === 'completed' ? '#f6ffed' : 
                                  task.status === 'processing' ? '#e6f7ff' : 
                                  '#f5f5f5'
                    }}>
                      {task.status === 'completed' && (
                        <CheckCircleFilled style={{ color: '#52c41a', fontSize: 22 }} />
                      )}
                      {task.status === 'processing' && (
                        <Spin indicator={<LoadingOutlined style={{ color: '#1890ff', fontSize: 22 }} spin />} />
                      )}
                      {task.status === 'pending' && (
                        <div style={{ 
                          width: 14, 
                          height: 14, 
                          background: '#d9d9d9', 
                          borderRadius: '50%' 
                        }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ display: 'block', fontSize: 16 }}>
                        {task.title}
                      </Text>
                      <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                        {task.subtitle}
                      </Text>
                      <div style={{ marginTop: 2 }}>
                        <Text
                          style={{ 
                            color: task.status === 'completed' ? '#52c41a' : 
                                  task.status === 'processing' ? '#1890ff' : 
                                  '#d9d9d9'
                          }}
                        >
                          {task.status === 'completed' ? '完成' : 
                           task.status === 'processing' ? '正在进行...' : 
                           '等待中'}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Modal>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
