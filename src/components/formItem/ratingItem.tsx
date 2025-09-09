import { Form, Rate } from "antd"
import { ratingRules } from "../../consts"
import React from "react";

const RatingFormItem: React.FC = () => {
    return (
        <Form.Item
            name="rating"
            label="Rating"
            rules={ratingRules}
        >
            <Rate allowHalf />
        </Form.Item>
    )
}

export default RatingFormItem