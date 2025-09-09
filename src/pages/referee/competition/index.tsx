import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Pagination,
	TableColumnsType,
	TablePaginationConfig,
} from "antd";
import { Button, Table } from "antd";
import { BaseService } from "../../../services";
import { LoadingOverlay, CustomBreadcrumb } from "../../../components";
import { formartedDate } from "../../../utils";
import { RootState } from "../../../store";
import { useSelector } from 'react-redux';


const RefereeCompetition: React.FC = () => {
	const [dataContest, setDataContest] = useState<[]>([]);
	const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
	const isLoading = useSelector((state: RootState) => state.loading.isLoading);
	const navigate = useNavigate(); // Dùng useNavigate để điều hướng

	useEffect(() => {
		fetchAssignedRound();
	}, [pagination.current, pagination.pageSize]);

	const fetchAssignedRound = async () => {
		try {
			const response = await BaseService.get({ url: '/api/round/assigned-round' });
			console.log(response);
			setDataContest(response.data || []); // Giả sử API trả về data dạng mảng
		} catch (error) {
			console.log(error);
		}
	};

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setPagination((prev) => ({
			...prev,
			current: page,
			pageSize: pageSize || 10,
		}));
	};

	const handleTableChange = (pagination: TablePaginationConfig) => {
		setPagination(pagination);
	};

	// Định nghĩa các cột của bảng
	const columns: TableColumnsType = [
		{
			title: "Contest",
			dataIndex: "contestName",
			key: "contestName",
		},
		{
			title: "Participant",
			dataIndex: "participantNumber",
			key: "participantNumber",
			width: "15%",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Created Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: Date) => formartedDate(createdAt),
			width: "15%",
		},
		{
			title: "Updated Date",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: Date) => formartedDate(updatedAt),
			width: "15%",
		},
		{
			title: "Action",
			key: "action",
			width: "15%",

			render: (text, record) => (
				<Button
					type="link"
					onClick={() => navigate(`/referee/score-koi/${record.id}`)}
				>
					View all koi
				</Button>
			),
		},
	];

	return (
		<div>
			{isLoading && <LoadingOverlay />}
			<div className="flex justify-between">
				<CustomBreadcrumb />
			</div>

			<Table
				columns={columns}
				dataSource={dataContest}
				rowKey="id"
				onChange={handleTableChange}
				pagination={false}
				className="overflow-auto"
			/>

			<div className="flex justify-end py-8">
				<Pagination
					total={pagination.total}
					current={pagination.current}
					pageSize={pagination.pageSize}
					onChange={handlePaginationChange}
					showSizeChanger
				/>
			</div>
		</div>
	);
};

export default RefereeCompetition;
