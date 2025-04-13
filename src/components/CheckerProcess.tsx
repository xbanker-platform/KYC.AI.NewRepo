import React, { useState, useEffect } from 'react';
import { Modal, Button, Steps, Typography, Result, Spin, Progress } from 'antd';
import { CheckCircleFilled, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useDataFetching, FetchStatus } from '@/hooks/useDataFetching';
import { dataManager } from '@/data';

const { Step } = Steps;
const { Title, Text, Paragraph } = Typography;

// Define the shape of each step in the check process
interface CheckStep {
  title: string;
  description: string;
  status: 'wait' | 'process' | 'finish' | 'error';
}

// Define the shape of the check process result
interface CheckResult {
  overall: 'success' | 'error' | 'partial';
  steps: CheckStep[];
  summary: string;
  findings: Array<{
    type: 'info' | 'warning' | 'error';
    message: string;
  }>;
}

interface CheckerProcessProps {
  visible: boolean;
  onClose: () => void;
}

const CheckerProcess: React.FC<CheckerProcessProps> = ({ visible, onClose }) => {
  // Create a state for tracking streaming progress
  const [streamProgress, setStreamProgress] = useState(0);
  
  // Create a state for the streaming data
  const [streamData, setStreamData] = useState<CheckResult | null>(null);
  
  // Define the function to simulate streaming data check process
  const performCheck = async (): Promise<CheckResult> => {
    // Create a promise that resolves after streaming is done
    return new Promise((resolve) => {
      // Initial steps
      const steps: CheckStep[] = [
        { title: 'Initializing Check', description: 'Preparing check process...', status: 'wait' },
        { title: 'Verifying Documents', description: 'Analyzing uploaded documents...', status: 'wait' },
        { title: 'Checking Compliance', description: 'Validating compliance requirements...', status: 'wait' },
        { title: 'Generating Report', description: 'Creating final report...', status: 'wait' },
      ];
      
      // Update state with initial steps
      setStreamData({ 
        overall: 'success', 
        steps, 
        summary: 'Check in progress...',
        findings: []
      });
      
      // Simulate step 1
      setTimeout(() => {
        steps[0].status = 'finish';
        setStreamData({ 
          overall: 'success', 
          steps: [...steps], 
          summary: 'Check in progress...',
          findings: []
        });
        setStreamProgress(25);
      }, 1000);
      
      // Simulate step 2
      setTimeout(() => {
        steps[1].status = 'finish';
        setStreamData({ 
          overall: 'success', 
          steps: [...steps], 
          summary: 'Check in progress...',
          findings: [
            { type: 'info', message: 'Found 3 documents for analysis' }
          ]
        });
        setStreamProgress(50);
      }, 2000);
      
      // Simulate step 3
      setTimeout(() => {
        steps[2].status = 'process';
        setStreamData({ 
          overall: 'success', 
          steps: [...steps], 
          summary: 'Check in progress...',
          findings: [
            { type: 'info', message: 'Found 3 documents for analysis' },
            { type: 'warning', message: 'Missing required disclosure in section 2.3' }
          ]
        });
        setStreamProgress(75);
        
        // After a bit, complete step 3
        setTimeout(() => {
          steps[2].status = 'finish';
          setStreamData({ 
            overall: 'success', 
            steps: [...steps], 
            summary: 'Check in progress...',
            findings: [
              { type: 'info', message: 'Found 3 documents for analysis' },
              { type: 'warning', message: 'Missing required disclosure in section 2.3' },
              { type: 'warning', message: 'Potential compliance risk in financial statements' }
            ]
          });
        }, 800);
      }, 3000);
      
      // Simulate step 4 and finish
      setTimeout(() => {
        steps[3].status = 'finish';
        
        const finalResult: CheckResult = {
          overall: 'partial',
          steps: [...steps],
          summary: 'Check completed with warnings. Some issues require attention.',
          findings: [
            { type: 'info', message: 'Found 3 documents for analysis' },
            { type: 'warning', message: 'Missing required disclosure in section 2.3' },
            { type: 'warning', message: 'Potential compliance risk in financial statements' },
            { type: 'info', message: 'Basic compliance requirements met' }
          ]
        };
        
        setStreamData(finalResult);
        setStreamProgress(100);
        resolve(finalResult); // Resolve the promise with the final data
      }, 4500);
    });
  };
  
  // Use our data fetching hook
  const { data, status, error, refetch } = useDataFetching<CheckResult>(
    performCheck,
    false // Don't fetch on mount, wait for explicit trigger
  );
  
  // Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      setStreamData(null);
      setStreamProgress(0);
    }
  }, [visible]);
  
  // Start check when modal becomes visible
  useEffect(() => {
    if (visible && status === 'idle') {
      refetch();
    }
  }, [visible, status, refetch]);
  
  // Render based on the streaming status
  const renderContent = () => {
    // Show loading state
    if (status === 'loading' || status === 'idle') {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          <Title level={4} style={{ marginTop: '20px' }}>Checking in progress...</Title>
          <Progress percent={streamProgress} status="active" style={{ margin: '24px 0' }} />
          
          {streamData && (
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
              <Steps direction="vertical" current={streamData.steps.findIndex(step => step.status === 'process')}>
                {streamData.steps.map((step, index) => (
                  <Step 
                    key={index}
                    title={step.title}
                    description={step.description}
                    status={step.status}
                  />
                ))}
              </Steps>
              
              {streamData.findings.length > 0 && (
                <div style={{ marginTop: '24px', background: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
                  <Title level={5}>Findings</Title>
                  {streamData.findings.map((finding, idx) => (
                    <Paragraph key={idx}>
                      <Text 
                        type={
                          finding.type === 'error' ? 'danger' : 
                          finding.type === 'warning' ? 'warning' : 
                          undefined
                        }
                      >
                        {finding.message}
                      </Text>
                    </Paragraph>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    // Show error state
    if (status === 'error') {
      return (
        <Result
          status="error"
          title="Check Failed"
          subTitle={error?.message || "An unknown error occurred during the check process."}
          extra={[
            <Button type="primary" key="retry" onClick={refetch}>
              Try Again
            </Button>,
            <Button key="cancel" onClick={onClose}>
              Cancel
            </Button>
          ]}
        />
      );
    }
    
    // Show success state (including partial success with warnings)
    if (status === 'success' && data) {
      const isFullSuccess = data.overall === 'success';
      
      return (
        <Result
          status={isFullSuccess ? "success" : "warning"}
          title={isFullSuccess ? "Check Completed Successfully" : "Check Completed with Warnings"}
          subTitle={data.summary}
          extra={[
            <Button type="primary" key="done" onClick={onClose}>
              Done
            </Button>,
            <Button key="report" onClick={() => console.log('Generate report')}>
              Generate Report
            </Button>
          ]}
        >
          <div style={{ textAlign: 'left' }}>
            <Steps direction="vertical" current={data.steps.length} status={
              data.overall === 'error' ? 'error' : 'finish'
            }>
              {data.steps.map((step, index) => (
                <Step 
                  key={index}
                  title={step.title}
                  description={step.description}
                  status={step.status}
                />
              ))}
            </Steps>
            
            {data.findings.length > 0 && (
              <div style={{ marginTop: '24px', background: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
                <Title level={5}>Findings</Title>
                {data.findings.map((finding, idx) => (
                  <Paragraph key={idx}>
                    <Text 
                      type={
                        finding.type === 'error' ? 'danger' : 
                        finding.type === 'warning' ? 'warning' : 
                        undefined
                      }
                    >
                      {finding.message}
                    </Text>
                  </Paragraph>
                ))}
              </div>
            )}
          </div>
        </Result>
      );
    }
    
    // Show empty state
    return (
      <Result
        status="info"
        title="No Data Available"
        subTitle="No check has been performed yet."
        extra={
          <Button type="primary" onClick={refetch}>
            Start Check
          </Button>
        }
      />
    );
  };
  
  return (
    <Modal
      title="Check Process"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      maskClosable={status !== 'loading'} // Prevent closing while loading
    >
      {renderContent()}
    </Modal>
  );
};

export default CheckerProcess; 