import React from "react";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type CustomPopconfirmProps = {
	title: string;
	description: string;
	onConfirm: () => void;
};

const CustomDeletePopconfirm: React.FC<CustomPopconfirmProps> = ({
	title,
	description,
	onConfirm,
}) => {
	return (
		<Popconfirm
			title={title}
			description={description}
			onConfirm={onConfirm}
			okText="Yes"
			cancelText="No"
		>
			<DeleteOutlined
				className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60"
				style={{ fontSize: "20px" }}
			/>
		</Popconfirm>
	);
};

export default CustomDeletePopconfirm;
