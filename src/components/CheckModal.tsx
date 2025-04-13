import React from 'react';
import { Modal } from 'antd';
import CheckerDashboard from './CheckerDashboard';
import styles from '@/app/page.module.css';

interface CheckTask {
  id: number;
  title: string;
  subtitle: string;
  status: 'pending' | 'processing' | 'completed';
}

interface CheckModalProps {
  isOpen: boolean;
  onCancel: () => void;
  tasks: CheckTask[];
  currentTaskIndex: number;
}

const CheckModal: React.FC<CheckModalProps> = ({
  isOpen,
  onCancel,
  tasks,
  currentTaskIndex,
}) => {
  return (
    <Modal
      title="Checking Progress"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={600}
      className={styles.checkModal}
    >
      <CheckerDashboard tasks={tasks} currentTaskIndex={currentTaskIndex} />
    </Modal>
  );
};

export default CheckModal; 