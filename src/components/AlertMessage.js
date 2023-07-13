import { Alert, Space } from "antd";

export function AlertMessage({ type, message, desc, onClose }) {
  return (
    <Alert
      message={message}
      description={desc}
      type={type}
      showIcon
      closeIcon
      onClose={onClose}
    />
  );
}
