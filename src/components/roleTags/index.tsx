import { Tag } from "antd";
import { getRoleColor, getRoleLabel } from "../../consts";
import React from "react";

const RoleTags: React.FC<{ role: string }> = ({ role }) => {
    return (
        <div>
            <Tag color={getRoleColor(role)}>
                {getRoleLabel(role)}
            </Tag>
        </div>
    );
};

export default RoleTags;