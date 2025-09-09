import { Select } from 'antd';
import React from 'react';

type CustomSelectProps = {
	value: string;
	options: string[];
	getColor: (option: string) => string;
	getLabel: (option: string) => string;
	onChange?: (value) => void;
	className?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
	value,
	options,
	getColor,
	getLabel,
	onChange,
	className
}) => {
	return (
		<Select defaultValue={value} className={className || ''} onChange={onChange}>
			{options.map((option) => (
				<Select.Option key={option} value={option}>
					<span className={getColor(option)}>{getLabel(option)}</span>
				</Select.Option>
			))}
		</Select>
	);
};

export default CustomSelect;
