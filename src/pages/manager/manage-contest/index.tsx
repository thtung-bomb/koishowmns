import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Pagination, Popconfirm, Select, message, DatePicker, InputNumber, Tag, } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
// import { Contest } from "../../../models";
// import { getCategories, createContest, deleteContest } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
// import { API_CREATE_Contest, API_DELETE_Contest, API_UPDATE_Contest } from "../../../consts";
import { useDebounce } from "../../../hooks";
import { CustomBreadcrumb, DescriptionFormItem, LoadingOverlay, NameFormItem } from "../../../components";
import { formartedDate } from "../../../utils/timeHelpers";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { createConstest, getCategories, getContests, getCriterias, deleteContest, getUsers, BaseService } from "../../../services";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import { Category, Contest, User } from "../../../models";
import { API_PATHS } from "../../../consts";
import { toast } from "react-toastify";

const ManageContest: React.FC = () => {
	const [dataContest, setDataContest] = useState<Contest[]>([]);
	const [searchText, setSearchText] = useState<string>("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [validateOnOpen, setValidateOnOpen] = useState(false);
	const isLoading = useSelector((state: RootState) => state.loading.isLoading);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const [criteria, setCriteria] = useState([]);
	const [criterias, setCriterias] = useState([{ id: '', percentage: '' }]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState('');
	const [categories, setCategories] = useState([]);
	const [rules, setRules] = useState(['']); // Initial state for rules
	const [categorieContest, setCategorieContest] = useState([{ id: '' }])
	const maxRows = 100; // Maximum number of criteria rows
	const maxRules = 100; // Maximum number of rules (optional)
	const debouncedSearchTerm = useDebounce(searchText, 500);
	const [referee, setReferee] = useState<User[]>([]);
	const [staff, setStaff] = useState<User[]>([]);
	const [roundCreateOpen, setRoundCreateOpen] = useState(false);
	const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
	const [isContestOpen, setIsContestOpen] = useState(false);
	const [newStatus, setNewStatus] = useState<string | null>(null);
	const [currentContest, setCurrentContest] = useState<Contest | null>(null);
	const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);


	useEffect(() => {
		fetchContest();
	}, [debouncedSearchTerm]);


	const fetchCategories = useCallback(async () => {
		try {
			const responseCategories = await getCategories();
			setCategories(responseCategories.data.pageData);
		} catch (error) {
			console.error(error);
		}
	}, [])

	useEffect(() => {
		fetchCategories();
	}, [])

	const handleAddCategory = () => {
		setCategorieContest([...categorieContest, { id: '' }]);
	};

	const handleRemoveCategory = (index: number) => {
		const newCategories = categorieContest.filter((_, i) => i !== index);
		setCategorieContest(newCategories);
	};

	const handleAddCriteria = () => {
		if (criterias.length < maxRows) {
			setCriterias([...criterias, { id: '', percentage: '' }]);
		}
	};

	const handleRemoveCriteria = (index) => {
		const newCriterias = criterias.filter((_, i) => i !== index);
		setCriterias(newCriterias);
	};

	const handleAddRule = () => {
		if (rules.length < maxRules) {
			setRules([...rules, '']);
		}
	};


	const handleRuleChange = (index, value) => {
		const newRules = [...rules];
		newRules[index] = value;
		setRules(newRules);
	};

	const handleRemoveRule = (index) => {
		const newRules = rules.filter((_, i) => i !== index);
		setRules(newRules);
	};

	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	const fetchReferee = useCallback(async () => {
		try {
			const response = await getUsers('', 'Referee');
			setReferee(response.data.pageData);

		} catch (error) {
			console.error("Error fetching criteria:", error);
		}
	}, [])

	const fetchStaff = useCallback(async () => {
		try {
			const response = await getUsers('', 'Staff');
			setStaff(response.data.pageData);

		} catch (error) {
			console.error("Error fetching criteria:", error);
		}
	}, [])

	useEffect(() => {
		fetchReferee();
		fetchStaff();
	}, [roundCreateOpen])


	const fetchCriterias = useCallback(async () => {
		try {
			const responseCriteria = await getCriterias();
			setCriteria(responseCriteria.data.pageData);
			console.log(criteria);

		} catch (error) {
			console.error("Error fetching criteria:", error);
		}
	}, [])



	useEffect(() => {
		fetchCriterias();
	}, [isModalVisible])

	const fetchContest = useCallback(async () => {
		try {
			const responseContest = await getContests(debouncedSearchTerm, selectedStatus, selectedCategory, pagination.current, pagination.pageSize);
			console.log(selectedStatus);
			console.log(selectedCategory);

			// Correct the property name to 'createdAt'
			const sortedData = (responseContest.data.pageData || responseContest.data.pageData).sort((a, b) => {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Descending order
			});

			setDataContest(sortedData);
			setPagination((prev) => ({
				...prev,
				total: responseContest.data.pageInfo?.totalItems || responseContest.data.length,
				current: responseContest.data.pageInfo?.pageNum || 1,
				pageSize: responseContest.data.pageInfo?.pageSize || prev.pageSize,
			}));
		} finally {
			setLoading(false);
		}
	}, [pagination.current, debouncedSearchTerm, pagination.pageSize, selectedCategory, selectedStatus]);

	useEffect(() => {
		fetchContest();
	}, [fetchContest, searchText, selectedCategory, selectedStatus]);

	const handleCategoryChange = (value) => {
		setSelectedCategory(value);
		setPagination((prev) => ({ ...prev, current: 1 }));
		fetchContest();
	};

	const handleOpenModal = useCallback(() => {
		form.resetFields();
		setIsModalVisible(true);
		setValidateOnOpen(true);
	}, [form]);

	const handleDelete = async (id: string, name: string) => {
		await deleteContest(id, name, fetchContest);
		message.success(`Contest ${name} deleted successfully.`);
		await fetchCategories();
		await fetchContest();
	};

	// const updateContest = useCallback(
	// 	async (values: Partial<Contest> & { id: string | null }, originalCreatedAt: Date) => {
	// 		setLoading(true);
	// 		const updatedContest: Contest = {
	// 			id: values.id!,
	// 			name: values.name ?? "",
	// 			description: values.description ?? "",
	// 			startDate: values.startDate ?? "",
	// 			endDate: values.endDate ?? "",
	// 			location: values.location ?? "",
	// 			createdAt: originalCreatedAt,
	// 			updatedAt: Date.now(),
	// 		};

	// 		try {
	// 			const response = BaseService.put({ url: API_PATHS.UPDATE_CONTEST, payload: updatedContest });

	// 			console.log('====================================');
	// 			console.log("response update contest", response);
	// 			console.log('====================================');

	// 			if (response.data) {
	// 				setDataContest((prevData) =>
	// 					prevData.map((Contest) =>
	// 						Contest.id === values.id
	// 							? { ...Contest, ...response.data }
	// 							: Contest
	// 					)
	// 				);
	// 				setIsModalVisible(false);
	// 				form.resetFields();
	// 				message.success(`Contest ${values.name} updated successfully.`);
	// 			}
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	},
	// 	[dataContest, form]
	// );

	// 	{
	// 		"id": "02A3D5F4-B88F-4ECE-980B-594FD2CFC388",
	// 		"description": "Test",
	// 		"startDate": "2024-10-16T11:33:09.268Z",
	// 		"endDate": "2024-10-16T11:33:09.268Z",
	// 		"location": "string",
	// 		"status": 1
	//  }
	// const handleEditContest = useCallback(
	// 	async (Contest: Contest) => {
	// 		form.resetFields();
	// 		await fetchCategories();

	// 		Modal.confirm({
	// 			title: `Edit Contest - ${Contest.name}`,
	// 			content: (
	// 				<Form
	// 					form={form}
	// 					onFinish={(values) => {
	// 						updateContest(values, Contest.createdAt);
	// 					}}
	// 					labelCol={{ span: 24 }}
	// 					initialValues={{
	// 						id: Contest.id,
	// 						name: Contest.name,
	// 						location: Contest.location,
	// 						startDate: dayjs(Contest.startDate),
	// 						endDate: dayjs(Contest.endDate),
	// 						description: Contest.description,
	// 					}}
	// 				>
	// 					<Form.Item name="id" style={{ display: "none" }}>
	// 						<Input />
	// 					</Form.Item>

	// 					<Form.Item label="Name" name="name" rules={[{ required: true }]}>
	// 						<Input />
	// 					</Form.Item>

	// 					<Form.Item label="Localtion" name="location" rules={[{ required: true }]} >
	// 						<Input />
	// 					</Form.Item>

	// 					<Form.Item label="Start Date" name="startDate" rules={[{ required: true }]}>
	// 						<DatePicker showTime />
	// 					</Form.Item>

	// 					<Form.Item label="End Date" name="endDate" rules={[{ required: true }]}>
	// 						<DatePicker showTime />
	// 					</Form.Item>

	// 					<Form.Item label="Parent Contest" name="parent_Contest_id" rules={[{ required: false }]}>
	// 						<Select placeholder="Select parent Contest">
	// 							<Select.Option key="none" value="none">
	// 								None
	// 							</Select.Option>
	// 						</Select>
	// 					</Form.Item>

	// 					<Form.Item label="Description" name="description" rules={[{ required: false }]}>
	// 						<Input.TextArea rows={4} />
	// 					</Form.Item>
	// 				</Form>
	// 			),
	// 			okText: "Save",
	// 			onOk: () => {
	// 				form.submit();
	// 			},
	// 			onCancel: () => {
	// 				form.resetFields();
	// 			},
	// 		});
	// 	},
	// 	[form, fetchCategories, dataContest]
	// );

	const addNewContest = useCallback(
		async (values) => {
			setLoading(true);
			console.log(rules);

			try {
				console.log(values);
				values.rules = rules;
				console.log(values);
				values.startDate = dayjs(values.startDate, "MM/DD/YYYY")
				values.endDate = dayjs(values.endDate, "MM/DD/YYYY")
				console.log(values.startDate);
				console.log(values.endDate);

				const response = await createConstest(values);
				console.log(response);


				// const newContest = response.data;
				form.resetFields();
				fetchCriterias();
				fetchContest();
				setIsModalVisible(false);

			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
			finally {
				setLoading(false);
			}
		},
		[dataContest, form, fetchContest]
	);

	const handleTableChange = (pagination: TablePaginationConfig) => {
		setPagination(pagination);
	};

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setPagination((prev) => ({
			...prev,
			current: page,
			pageSize: pageSize || 10,
		}));
		// fetchCategories();
	};
	const handleSearch = useCallback(() => {
		setPagination((prev) => ({
			...prev,
			current: 1,
		}));
	}, [fetchCategories]);

	const handleOpenRoundModal = (record) => {
		setRoundCreateOpen(true);
		form.setFieldsValue({
			contestId: record.id, // Set contestId to record.id
			startDate: null,
			endDate: null,
			staffId: [],
			refereeId: [],
		});
	}

	const handleFinish = async (values) => {
		console.log('Form Values:', values);
		const formattedStartDate = dayjs(values.startDate).format('MM/DD/YYYY hh:mm');
		const formattedEndDate = dayjs(values.endDate).format('MM/DD/YYYY hh:mm');
		const formattedValues = {
			...values,
			startDate: formattedStartDate,
			endDate: formattedEndDate,
		};

		try {
			const response = await BaseService.post({ url: '/api/round/create', payload: formattedValues });
			console.log('====================================');
			console.log(response);
			console.log('====================================');
			toast.success(response.message);
			setRoundCreateOpen(false);
		} catch (error) {
			console.log('====================================');
			console.log(error);
			console.log('====================================');
			// toast.error(error.Message);
		} finally {
			fetchContest();
		}
	};

	// Handle the click on the status tag
	const handleStatusClick = (record: Contest, currentStatus: string) => {
		setCurrentContest(record);  // Set the current contest
		setNewStatus(currentStatus);  // Set the current status
		setIsStatusModalVisible(true);  // Show the modal
	};

	// Handle status update in the table
	const handleUpdateStatus = async (id: string, status: string) => {
		try {
			const response = await BaseService.put({
				url: `/api/contest/${id}`,  // API to update only status
				payload: { status },
			});
			console.log('====================================');
			console.log("Update response", response);
			console.log('====================================');
			// Update status locall

			setDataContest(prevData =>
				prevData.map((contest: Contest) =>
					contest.id === id ? { ...contest, status: status } : contest
				)
			);
			console.log('====================================');
			console.log(dataContest);
			console.log('====================================');
			toast.success("Status updated successfully"); // Show success message
			setIsStatusModalVisible(false); // Close the modal
		} catch (error) {
			console.error("Error updating status:", error);
			// Handle error case, show an alert or notification
		}
	};

	// Confirm the status update
	const handleConfirmStatusUpdate = () => {
		if (currentContest && newStatus) {
			handleUpdateStatus(currentContest.id, newStatus); // Update only status
			setIsStatusModalVisible(false); // Close the modal
		}
	};

	// // Handle the click on the status tag
	// const handleStatusClick = (record: Contest, currentStatus: string) => {
	// 	setCurrentContest(record);  // Set the current contest
	// 	setNewStatus(currentStatus);  // Set the current status
	// 	setIsModalVisible(true);  // Show the modal
	// };


	const columns: ColumnType<Contest>[] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: "30%",
			render: (name: string, record: Contest) => (
				<a onClick={() => handleRowClick(record)}>{name}</a> // Handle click on contest name
			),
		},
		{
			title: 'Category Name',
			key: 'categories',
			render: (record) => (
				<span>
					{record.categories.map((category: Category) => category.name).join(', ')}
				</span>
			),
		},
		{
			title: "Round",
			dataIndex: "round",
			key: "round",
			width: "12%",
			render: (round: string, record: Contest) => (
				<a onClick={() => handleOpenRoundModal(record)}>{round}</a>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: "10%",
			render: (status: string, record: Contest) => {  // Accept `status` and `record` as arguments
				let color;
				let text;

				switch (status) {
					case "UpComing":
						color = "cyan";
						text = "Up Coming";
						break;
					case "Ongoing":
						color = "yellow";
						text = "On Going";
						break;
					case "Completed":
						color = "green";
						text = "Completed";
						break;
					default:
						color = "default";
						text = status;
						break;
				}

				return (
					<Tag
						color={color}
						onClick={() => handleStatusClick(record, status)} // Open modal to change status
						style={{ cursor: 'pointer' }}
					>
						{text}
					</Tag>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			width: "10%",
			render: (_: unknown, record: Contest) => (
				<div>
					{record.status === "UpComing" && ( // Kiểm tra nếu status là "Upcoming"
						<>
							<EditOutlined
								className="text-blue-500"
								style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
								onClick={(e) => {
									e.stopPropagation();  // Prevent row click
									// handleEditContest(record);
								}}
							/>
							<Popconfirm
								title="Are you sure to delete this Contest?"
								onConfirm={() => handleDelete(record.id, record.name)}
								okText="Yes"
								cancelText="No"
							>
								<DeleteOutlined
									className="text-red-500"
									style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
									onClick={(e) => e.stopPropagation()}
								/>
							</Popconfirm>
						</>
					)}
				</div>
			),
		},
	];
	const handleRowClick = (record: Contest) => {
		setSelectedContest(record);
		setIsContestOpen(true);
	};

	const handleModalClose = () => {
		setIsContestOpen(false);
	};

	const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	// Handle status change in the modal
	const handleStatusChange = (value: string) => {
		setNewStatus(value);
	};
	return (
		<>
			<div>
				<div className="flex justify-between items-center ">
					<CustomBreadcrumb />

					<Button type="primary" className="mt-5" onClick={handleOpenModal}>
						Add New Contest
					</Button>
				</div>
				<Space className="flex items-center mb-10 mt-2">
					<Input.Search
						placeholder="Search By Name"
						value={searchText}
						onChange={handleSearchText}
						onSearch={handleSearch}
						style={{ width: 200 }}
						enterButton={<SearchOutlined className="text-white" />}
					/>

					<Select
						placeholder="Select Category"
						style={{ width: 200, marginLeft: 10, marginRight: 10 }}
						onChange={handleCategoryChange}
						allowClear
					>
						{categories.map((category: Category) => (
							<Select.Option key={category.id} value={category.id}>
								{category.name}
							</Select.Option>
						))}
					</Select>
					<Select
						placeholder="Select Status"
						style={{ width: 200 }}
						onChange={handleStatusChange}
						allowClear
					>
						<Select.Option value="UpComing">Up Coming</Select.Option>
						<Select.Option value="Ongoing">Ongoing</Select.Option>
						<Select.Option value="Completed">Completed</Select.Option>
					</Select>
				</Space>

				<Table
					columns={columns}
					dataSource={dataContest}
					rowKey={(record: Contest) => record?.id || 'unknown'}
					pagination={false}
					onChange={handleTableChange}
					className="overflow-auto"
				/>

				<div className="flex justify-end py-8">
					<Pagination
						total={pagination.total}
						showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
						current={pagination.current}
						pageSize={pagination.pageSize}
						onChange={handlePaginationChange}
						showSizeChanger
					/>
				</div>
				<Modal
					title="Add New Contest"
					open={isModalVisible}
					onCancel={() => {
						form.resetFields();
						setIsModalVisible(false);
						setValidateOnOpen(false);
					}}
					footer={null}
				>
					<Form
						form={form}
						onFinish={addNewContest}
						labelCol={{ span: 24 }}
						validateTrigger={validateOnOpen ? "onSubmit" : "onChange"}
					>
						<NameFormItem />
						<Form.Item label="Start Date" name="startDate">
							<DatePicker showTime />
						</Form.Item>
						<Form.Item label="End Date" name="endDate">
							<DatePicker showTime />
						</Form.Item>
						<Form.Item label="Location" name="location">
							<Input />
						</Form.Item>
						<Form.Item label="Rules">
							{rules.map((rule, index) => (
								<Space key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
									<Input
										placeholder="Enter Rule"
										value={rule}
										onChange={(e) => handleRuleChange(index, e.target.value)}
									/>
									<Button type="link" onClick={() => handleRemoveRule(index)}>
										Remove
									</Button>
								</Space>
							))}
							<Button type="dashed" onClick={handleAddRule}>
								+ Add Rule
							</Button>
						</Form.Item>
						<h3>Criterias</h3>
						{criterias.map((item, index) => (
							<Form.Item key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Form.Item
									name={['criterias', index, 'id']}
									style={{ flex: 1, marginRight: '8px' }}
								>
									<Select
										placeholder="Select Criteria"
										onChange={(value) => {
											const newCriteria = [...criterias];
											newCriteria[index].id = value;
											setCriterias(newCriteria);
										}}
									>
										{criteria.map((item, index) => (
											<Option key={item.id} value={item.id}>
												{item.name}
											</Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item
									name={['criterias', index, 'percentage']}
									style={{ flex: 1, marginLeft: '8px' }}
								>
									<InputNumber placeholder="Enter Percentage" />
								</Form.Item>
								<Button type="link" onClick={() => handleRemoveCriteria(index)}>
									Remove
								</Button>
							</Form.Item>
						))}

						{criterias.length < maxRows && (
							<Form.Item>
								<Button type="dashed" onClick={handleAddCriteria}>
									+ Add Criteria
								</Button>
							</Form.Item>
						)}

						<h3>Category</h3>
						{categorieContest.map((item, index) => (
							<Form.Item key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Form.Item
									name={['categories', index, 'id']} // Use 'categories' instead of 'criterias'
									style={{ flex: 1, marginRight: '8px' }}
									rules={[{ required: true, message: 'Please select a category' }]} // Optional: Add validation rules
								>
									<Select
										placeholder="Select Category"
										onChange={(value) => {
											const newCategories = [...categories];
											newCategories[index].id = value;
											setCategories(newCategories);
										}}
									>
										{categories.map((category: Category, index) => (
											<Option key={category.id} value={category.id}>
												{category.name}
											</Option>
										))}
									</Select>
								</Form.Item>

								<Button type="link" onClick={() => handleRemoveCategory(index)}>
									Remove
								</Button>
								<Form.Item>
									<Button type="dashed" onClick={handleAddCategory}>
										+ Add Category
									</Button>
								</Form.Item>
							</Form.Item>
						))}
						<DescriptionFormItem />
						<Form.Item>
							<Button loading={loading} type="primary" htmlType="submit">
								Add
							</Button>
						</Form.Item>
					</Form>
				</Modal>

				{/* Round Modal */}
				<Modal
					title="Add New Round"
					open={roundCreateOpen}
					onCancel={() => {
						form.resetFields();
						setRoundCreateOpen(false);
						setValidateOnOpen(false);
					}}
					footer={null}>
					<Form
						form={form}
						layout="vertical"
						onFinish={handleFinish}
						initialValues={{
							startDate: null,
							endDate: null,
							staffId: [],
							refereeId: [],
						}}
					>
						<Form.Item
							label="Contest ID"
							name="contestId"
						>
							<Input placeholder="Enter contest ID" />
						</Form.Item>

						<Space size="middle">
							<Form.Item
								label="Start Date"
								name="startDate"
								rules={[{ required: true, message: 'Please select the start date' }]}
							>
								<DatePicker showTime />
							</Form.Item>

							<Form.Item
								label="End Date"
								name="endDate"
								rules={[{ required: true, message: 'Please select the end date' }]}
							>
								<DatePicker showTime />
							</Form.Item>
						</Space>

						<Form.Item
							label="Staff"
							name="staffId"
							rules={[{ required: true, message: 'Please select at least one staff member' }]}
						>
							<Select
								mode="multiple"
								placeholder="Select staff"
								allowClear
							>
								{staff.map((staff) =>
									<Option value={staff.id}>{staff.name}</Option>
								)}
							</Select>
						</Form.Item>

						<Form.Item
							label="Referee"
							name="refereeId"
							rules={[{ required: true, message: 'Please select at least one referee' }]}
						>
							<Select
								mode="multiple"
								placeholder="Select referee"
								allowClear
							>
								{
									referee.map((referee) =>
										<Option value={referee.id}>{referee.name}</Option>
									)}
							</Select>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Create Round
							</Button>
						</Form.Item>
					</Form>
				</Modal>

				{/* modal contest detail */}
				<Modal
					title="Contest Details"
					visible={isContestOpen}
					onCancel={handleModalClose}
					footer={null}
				>
					{selectedContest && (
						<div>
							<p><strong>Name:</strong> {selectedContest.name}</p>
							<p><strong>Location:</strong> {selectedContest.location}</p>
							<p><strong>Status:</strong> {selectedContest.status}</p>
							<p><strong>Start Date:</strong> {dayjs(selectedContest.startDate).format('DD/MM/YYYY hh:mm')}</p>
							<p><strong>End Date:</strong> {dayjs(selectedContest.endDate).format('DD/MM/YYYY hh:mm')}</p>
							<p><strong>Categories:</strong> {selectedContest.categories.map((category) => category.name).join(', ')}</p>
							<p><strong>Criterias:</strong></p>
							<ul>
								{selectedContest.criterias.map((criteria, index) => (
									<li key={index}>{criteria.criteriaName} - {criteria.criteriaDescription} (Weight: {criteria.weight * 100}%)</li>
								))}
							</ul>
							<p><strong>Rules:</strong></p>
							<ul>
								{selectedContest.rules.map((rule, index) => (
									<li key={index}>{rule.description}</li>
								))}
							</ul>
							<p><strong>Create Date:</strong> {dayjs(selectedContest.createdAt).format('DD/MM/YYYY hh:mm')}</p>
							<p><strong>Description:</strong> {selectedContest.description}</p>
						</div>
					)}
				</Modal>

			</div >

			{/* Modal for changing status */}
			<Modal
				title="Change Contest Status"
				visible={isStatusModalVisible}
				onCancel={() => setIsStatusModalVisible(false)}
				footer={[
					<Button key="cancel" onClick={() => setIsModalVisible(false)}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleConfirmStatusUpdate}>
						Confirm
					</Button>,
				]}
			>
				<Select
					value={newStatus}
					onChange={handleStatusChange}
					style={{ width: '100%' }}
				>
					<Option value="UpComing">Up Coming</Option>
					<Option value="Ongoing">Ongoing</Option>
					<Option value="Completed">Completed</Option>
				</Select>
			</Modal>

		</>
	);
};

export default ManageContest;

