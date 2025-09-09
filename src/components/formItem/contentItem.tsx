import { Form } from "antd";
import { contentRules } from "../../consts";
import TinyMCEEditorComponent from "../tinyMCE/TinyMCE";
import React from "react";

interface TinyMCEFormItemProps {
    value: string;
    onEditorChange: (value: string) => void;
}

const ContentFormItem: React.FC<TinyMCEFormItemProps> = ({ value, onEditorChange }) => {
    return (
        <Form.Item
            name="content"
            label="Content"
            rules={contentRules}
        >
            <TinyMCEEditorComponent value={value} onEditorChange={onEditorChange} />
        </Form.Item>
    );
};

export default ContentFormItem;
