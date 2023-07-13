import { Space, Select } from "antd";
export function SelectMenu({ menu, onChange }) {
  return (
    <Space>
      <Select
        defaultValue="get:"
        style={{ width: 120 }}
        options={menu}
        onChange={onChange}
      />
    </Space>
  );
}
