import React from 'react';
import { Space, Button } from 'antd';
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
} from '@ant-design/icons';
import styles from '@/app/page.module.css';

interface EditorProps {
  onFormatClick?: (format: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

const Editor: React.FC<EditorProps> = ({
  onFormatClick = () => {},
  onUndo = () => {},
  onRedo = () => {},
}) => {
  const tools = [
    { icon: <BoldOutlined />, tooltip: 'Bold', format: 'bold' },
    { icon: <ItalicOutlined />, tooltip: 'Italic', format: 'italic' },
    { icon: <OrderedListOutlined />, tooltip: 'Ordered List', format: 'orderedList' },
    { icon: <UnorderedListOutlined />, tooltip: 'Unordered List', format: 'unorderedList' },
    { icon: <LinkOutlined />, tooltip: 'Link', format: 'link' },
    { icon: <PictureOutlined />, tooltip: 'Image', format: 'image' },
    { icon: <CodeOutlined />, tooltip: 'Code', format: 'code' },
  ];

  return (
    <div className={styles.editor} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Space wrap style={{ padding: '8px', background: '#f7f7f7', borderRadius: '4px', marginBottom: '16px' }}>
        {tools.map((tool) => (
          <Button
            key={tool.format}
            type="text"
            icon={tool.icon}
            onClick={() => onFormatClick(tool.format)}
          />
        ))}
        <Button type="text">H₂</Button>
        <Button type="text" icon={<UndoOutlined />} onClick={onUndo} />
        <Button type="text" icon={<RedoOutlined />} onClick={onRedo} />
      </Space>
      <div style={{ flex: 1, background: '#fff', border: '1px solid #eee', borderRadius: '4px', padding: '16px', overflow: 'auto' }}>
        {/* Editor content would go here */}
      </div>
    </div>
  );
};

export default Editor; 