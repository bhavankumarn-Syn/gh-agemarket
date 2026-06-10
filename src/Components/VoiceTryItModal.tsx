import React from 'react';
import { Modal, Button, Typography, Space, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './voiceTryItModal.scss';

const { Title, Text } = Typography;

type Props = {
  open: boolean;
  onClose: () => void;
};

const VoiceTryItModal: React.FC<Props> = ({ open, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText('(123)456789');
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable
      width={"40%"}
      closeIcon={<span style={{ fontSize: 18 }}>x</span>}
      centered
    >
      <div className="avatarTryModalHeader">
        <div className="modalHeader">
          <Text type="secondary" className="label">Voice</Text>
          <h4>Dispatch Agent 0.02</h4>
        </div>
        <div className="subscribe-button-wrapper">
          <Button className="subscribe-button">
            Subscribe now
          </Button>
        </div>
      </div>
      
      <div className="phone-section">
        <Text className="subtext">Call your agent</Text>
        <Space align="center" className="phone-wrapper">
          <Title level={1} className="phone-number">(123)456789</Title>
          <Tooltip title="Copy">
            <CopyOutlined onClick={handleCopy} className="copy-icon" />
          </Tooltip>
        </Space>
      </div>
    </Modal>
  );
};

export default VoiceTryItModal;
