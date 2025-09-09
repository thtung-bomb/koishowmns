import React, { useState, useEffect, useCallback } from "react";
import { Input, Space, Table, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { useDebounce } from "@/hooks";
import { getContestRegistration } from "../../services/koiFish";
import { KoiEntry } from "../../models/KoiEntry";
import { formartedDate } from "../../utils";

interface RegisterContestProps {
	activeTab: string; // Add the activeTab prop type
}

const RegisterContest: React.FC<RegisterContestProps> = ({ activeTab }) => {
	const [dataContest, setDataContest] = useState([]);
	const [searchText, setSearchText] = useState<string>("");
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	const debouncedSearchTerm = useDebounce(searchText, 500);

	useEffect(() => {
		if (activeTab === "1") {
			fetchContestRegistration();
		}
	}, [activeTab, debouncedSearchTerm, pagination.current, pagination.pageSize]);


	useEffect(() => {
		fetchContestRegistration();
	}, [debouncedSearchTerm, pagination.current, pagination.pageSize]);

	const fetchContestRegistration = useCallback(async () => {
		try {
			const currentPage = pagination.current ?? 1;
			const pageSize = pagination.pageSize ?? 10;
			const response = await getContestRegistration(status, searchText, currentPage, pageSize);
			const sortedKois = response.pageData.sort((a: KoiEntry, b: KoiEntry) => {
				const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				return dateB - dateA;
			});
			setDataContest(sortedKois);
			setPagination({
				...pagination,
				total: response.pageInfo.totalItems,
				current: response.pageInfo.pageNum,
				pageSize: response.pageInfo.pageSize,
			});
		} catch (error) {
			console.log(error);
		}
	}, [status, searchText, pagination.current, pagination.pageSize]);

	const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setPagination((prev) => ({
			...prev,
			current: page,
			pageSize: pageSize || 10,
		}));
	};

	const columns = [
		{
			title: "Contest",
			dataIndex: "contestName",
			key: "contestName",
		},
		{
			title: "Name Registered",
			key: "displayName",
			dataIndex: "displayName",
		},
		{
			title: "Process By",
			dataIndex: "staffName",
			key: "staffName",
		},
		{
			title: "Fish Registered",
			dataIndex: "fish",
			key: "fish",
			render: (fishKoi: { name: string }) => fishKoi?.name || 'N/A',
		},
		{
			title: "Entry Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Payment Status",
			dataIndex: "paymentStatus",
			key: "paymentStatus",
		},
	];

	const expandedRowRender = (record: any) => {
		const fishInfo = record.fish || {};

		return (
			<div style={{ padding: '16px', backgroundColor: '#f9f9f9' }}>
				<h3>Fish Details</h3>
				<p><strong>Fish Name:</strong> {fishInfo.name || "N/A"}</p>
				<p><strong>Variety:</strong> {fishInfo.varietyName || "N/A"}</p>
				<p><strong>Size:</strong> {fishInfo.size || "N/A"} cm</p>
				<p><strong>Date of Birth:</strong> {fishInfo.dateOfBirth ? formartedDate(fishInfo.dateOfBirth) : "N/A"}</p>
				<p><strong>Registered At:</strong> {fishInfo.createdAt ? formartedDate(fishInfo.createdAt) : "N/A"}</p>
				<p><strong>Updated At:</strong> {fishInfo.updatedAt ? formartedDate(fishInfo.updatedAt) : "N/A"}</p>

				{fishInfo.koiImages && fishInfo.koiImages.length > 0 && (
					<div>
						<h4>Koi Images:</h4>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{fishInfo.koiImages.map((image: { imageUrl: string }, index: number) => (
								<img
									key={index}
									src={image.imageUrl}
									alt={`Koi Image ${index + 1}`}
									style={{ width: '100px', height: '100px', margin: '4px' }}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="px-24">

			{/* Tabs */}


			<Space>
				<Input.Search
					placeholder="Search By Name"
					value={searchText}
					onChange={handleSearchText}
					style={{ width: 200 }}
					enterButton={<SearchOutlined className="text-white" />}
				/>
			</Space>
			<Table
				columns={columns}
				dataSource={dataContest}
				rowKey="contestId"
				expandable={{
					expandedRowRender,
					rowExpandable: (record) => !!record.fish,
				}}
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

export default RegisterContest;
