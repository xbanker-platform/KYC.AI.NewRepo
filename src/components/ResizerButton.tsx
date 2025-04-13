import React from 'react';
import { Button, Tooltip } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import styles from '@/app/page.module.css';

interface ResizerButtonProps {
  isFullscreen: boolean;
  onClick: () => void;
}

const ResizerButton: React.FC<ResizerButtonProps> = ({
  isFullscreen,
  onClick,
}) => {
  return (
    <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
      <Button
        type="text"
        icon={<FullscreenOutlined />}
        onClick={onClick}
        className={styles.resizerButton}
      />
    </Tooltip>
  );
};

export default ResizerButton; 