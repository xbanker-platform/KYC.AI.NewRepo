import React from 'react';
import CheckerProcess from './CheckerProcess';

interface CheckProcessProps {
  visible: boolean;
  onClose: () => void;
}

const CheckProcess: React.FC<CheckProcessProps> = ({ visible, onClose }) => {
  return <CheckerProcess visible={visible} onClose={onClose} />;
};

export default CheckProcess; 