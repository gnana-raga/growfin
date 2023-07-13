import { Input } from "antd";
export const InputQuery = ({ addOn, value, setInputText, onKeyPress }) => (
  <Input
    addonBefore={addOn}
    defaultValue={""}
    value={value}
    placeholder="ENTER YOUR QUERY HERE"
    onChange={setInputText}
    onPressEnter={onKeyPress}
  />
);
