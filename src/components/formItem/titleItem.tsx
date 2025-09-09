import { Form, Input } from "antd"
import { titleRules } from "../../consts"
import React from "react";

const TitleFormItem: React.FC = () => {
    return (
        <Form.Item name="title" label="Title" rules={titleRules}>
            <Input placeholder="Enter Title" />
        </Form.Item>
    )
}

export default TitleFormItem