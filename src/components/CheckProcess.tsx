import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Avatar } from 'antd';
import { LoadingOutlined, CheckOutlined } from '@ant-design/icons';

interface CheckStep {
  id: number;
  title: string;
  description: string;
  status: 'waiting' | 'running' | 'completed';
}

interface CheckProcessProps {
  visible: boolean;
  onClose: () => void;
}

const CheckProcess: React.FC<CheckProcessProps> = ({ visible, onClose }) => {
  const [steps, setSteps] = useState<CheckStep[]>([
    {
      id: 1,
      title: 'Story Manager Initial',
      description: 'Analyzing full text',
      status: 'waiting'
    },
    {
      id: 2,
      title: 'Story Manager Delta',
      description: 'Analyzing text changes',
      status: 'waiting'
    },
    {
      id: 3,
      title: 'Entity Query',
      description: 'Researching company entity: 2c2p Company',
      status: 'waiting'
    },
    {
      id: 4,
      title: 'Entity Query Person',
      description: 'Searching individual entity: wang yusheng',
      status: 'waiting'
    },
    {
      id: 5,
      title: 'Links Processor',
      description: 'Processing files: 4 links',
      status: 'waiting'
    },
    {
      id: 6,
      title: 'Images Processor',
      description: 'Processing images: 4 links',
      status: 'waiting'
    },
    {
      id: 7,
      title: 'Story Analyst',
      description: 'Reanalyzing: Mr Deng\'s Profile',
      status: 'waiting'
    },
    {
      id: 8,
      title: 'Risk Analyst',
      description: 'Performing risk analysis: Mr Deng\'s Profile',
      status: 'waiting'
    },
    {
      id: 9,
      title: 'Benchmark Query',
      description: 'Performing benchmark check: 2c2p Company',
      status: 'waiting'
    }
  ]);

  useEffect(() => {
    if (visible) {
      // Reset steps when modal opens
      setSteps(prevSteps => prevSteps.map(step => ({ ...step, status: 'waiting' })));
      
      // Simulate processing steps
      let currentStep = 0;
      let stepCount = steps.length;
      
      const interval = setInterval(() => {
        if (currentStep < stepCount) {
          setSteps(prevSteps => {
            const newSteps = [...prevSteps];
            // Set current step to running
            if (currentStep === 0) {
              if (newSteps[currentStep]) {
                newSteps[currentStep].status = 'running';
              }
            } else {
              // Set previous step to completed and current to running
              if (newSteps[currentStep - 1]) {
                newSteps[currentStep - 1].status = 'completed';
              }
              if (newSteps[currentStep]) {
                newSteps[currentStep].status = 'running';
              }
            }
            return newSteps;
          });
          currentStep++;
        } else {
          // Complete the last step
          setSteps(prevSteps => {
            const newSteps = [...prevSteps];
            if (newSteps[stepCount - 1]) {
              newSteps[stepCount - 1].status = 'completed';
            }
            return newSteps;
          });
          
          // Close modal after finishing all steps (with a delay)
          setTimeout(() => {
            onClose();
          }, 1000);
          
          clearInterval(interval);
        }
      }, 1000); // Process each step in 1 second intervals
      
      return () => clearInterval(interval);
    }
  }, [visible, onClose]);

  // Render the avatar icon based on the step status
  const getStepIcon = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <Avatar 
            style={{ 
              backgroundColor: '#722ed1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }} 
            icon={<LoadingOutlined />} 
          />
        );
      case 'completed':
        return (
          <Avatar 
            style={{ 
              backgroundColor: '#52c41a',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }} 
            icon={<CheckOutlined />} 
          />
        );
      default:
        return (
          <Avatar 
            style={{ 
              backgroundColor: '#f0f0f0',
              color: '#999',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        );
    }
  };

  // Get the status text based on the step status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return <span style={{ color: '#722ed1' }}>In progress...</span>;
      case 'completed':
        return <span style={{ color: '#52c41a' }}>Completed</span>;
      default:
        return <span style={{ color: '#999' }}>Waiting</span>;
    }
  };

  return (
    <Modal
      title="Check Process"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
      width={600}
    >
      <List
        itemLayout="horizontal"
        dataSource={steps}
        renderItem={step => (
          <List.Item>
            <List.Item.Meta
              avatar={getStepIcon(step.status)}
              title={step.title}
              description={step.description}
            />
            {getStatusText(step.status)}
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default CheckProcess; 