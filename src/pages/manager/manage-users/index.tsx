import React from 'react'
import { useState, useEffect, useCallback } from "react";
import {
	Button,
	Image,
	Input,
	Space,
	Switch,
	Table,
	Modal,
	Form,
	Pagination,
	Upload,
	Radio,
	Select,
	Avatar,
} from "antd";
import { EditOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import type { GetProp, TableColumnsType, TablePaginationConfig, UploadFile, UploadProps } from "antd";
import { User } from "../../../models";

import { getRoleColor, getRoleLabel, roleRules } from "../../../consts";
import { useDebounce } from "../../../hooks";
import {
	CustomDeletePopconfirm,
	CustomSelect,
	EmailFormItem,
	NameFormItem,
	PasswordFormItem,
	UploadButton,
	CustomBreadcrumb,
	RoleTags
} from "../../../components";
import { uploadFile, getBase64, formartedDate, getUserFromLocalStorage } from "../../../utils";
import { changeStatusUser, createUser, deleteUser, getUsers, updateUser } from '../../../services';
import { ROLES } from "../../../consts";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ManageUser: React.FC = () => {
	const [dataUsers, setDataUsers] = useState<User[]>([]);
	const [searchText, setSearchText] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });

	const [formData, setFormData] = useState<Partial<User>>({});

	const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");
	const [selectedRole, setSelectedRole] = useState<string>("All");
	const [selectedStatus, setSelectedStatus] = useState<string>("true");
	const user = getUserFromLocalStorage();
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};
	const debouncedSearch = useDebounce(searchText, 500);

	useEffect(() => {
		fetchUsers();
	}, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, debouncedSearch]);

	const fetchUsers = useCallback(async () => {
		try {
			let statusValue: boolean | undefined = false;
			if (selectedStatus === "true") {
				statusValue = true;
			}
			const responseUsers = await getUsers(
				debouncedSearch,
				selectedRole === "All" ? undefined : selectedRole.toLowerCase(),
				statusValue,
				false,
				pagination.current,
				pagination.pageSize
			);
			const sortedUsers = responseUsers.data.pageData.sort((a: User, b: User) => {
				const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				return dateB - dateA;
			});


			setDataUsers(sortedUsers);

			setPagination({
				...pagination,
				total: responseUsers.data.pageInfo.totalItems,
				current: responseUsers.data.pageInfo.pageNum,
				pageSize: responseUsers.data.pageInfo.pageSize,
			});
		} catch (error) {
			console.log(error);
		}
	}, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, debouncedSearch]);

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

	const handleAddNewUser = useCallback(
		async (values: User) => {
			try {
				let avatarUrl = values.avatar;

				if (values.avatar && typeof values.avatar !== "string" && values.avatar?.file?.originFileObj) {
					avatarUrl = await uploadFile(values.avatar.file.originFileObj);
				}

				const userData = { ...values, avatar: avatarUrl };
				const response = await createUser(userData);
				console.log(response)
				setDataUsers((prevData) => [userData, ...prevData]);
				setIsModalVisible(false);
				form.resetFields();
				fetchUsers();
				setFileList([]);
			} catch (error) {
				console.log(error);
			}
		},
		[fetchUsers, form]
	);

	const handleAddClick = () => {
		setModalMode("Add");
		setIsModalVisible(true);
		form.resetFields();
		setFileList([]);
		setFormData({});
	};

	const handleModalCancel = () => {
		setIsModalVisible(false);
		setFileList([]);
		setFormData({});
		form.resetFields();
	};

	// const handleRoleChange = async (value: UserRole, userId: string) => {
	// 	await changeUserRole(userId, value);
	// 	setDataUsers((prevData: User[]) => prevData.map((user) => (user.id === userId ? { ...user, role: value } : user)));
	// };

	const handleUserStatus = (userId: string, status: boolean) => {
		const updateData = dataUsers.map((user) => (user.id === userId ? { ...user, status: status } : user));
		setDataUsers(updateData);
	};

	const handleRolefilter = (value: string) => {
		setSelectedRole(value);

	};
	const handleStatus = (value: string) => {
		setSelectedStatus(value);
	};

	const handleEditUser = async (values: User) => {
		let avatarUrl = values.avatar;

		if (values.avatar && typeof values.avatar !== "string" && values.avatar.file?.originFileObj) {
			avatarUrl = await uploadFile(values.avatar.file.originFileObj);
		}

		const updatedUser = {
			...values,
			avatar: avatarUrl,
			email: values.email,
		};

		await updateUser(formData.id, updatedUser);

		setDataUsers((prevData) =>
			prevData.map((user) =>
				user.id === formData.id
					? {
						...user,
						...updatedUser,
					}
					: user
			)
		);

		setIsModalVisible(false);
		form.resetFields();
		setFormData({});
		fetchUsers();
	};

	const onFinish = (values: User) => {
		if (modalMode === "Edit") {
			if (formData.id) {
				handleEditUser({
					...formData,
					...values,
				});
			}
		} else {
			handleAddNewUser(values);
		}
		setIsModalVisible(false);
	};

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

	const columns: TableColumnsType<User> = [
		{
			title: "Avatar",
			dataIndex: "avatar",
			key: "avatar",
			render: (avatar: string) => (
				<Avatar
					size={50}
					src={
						avatar
							? avatar
							: "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-8/32/user--avatar--filled-256.png"
					}
				/>
			),
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: "20%",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: "18%",
		},
		{
			title: "Phone Number",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
			width: "10%",
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			width: "10%",
			render: (_, record: User) => (
				<RoleTags role={record.role} />
			),
		},
		{
			title: "Created Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: Date) => formartedDate(createdAt),
			width: "10%",
		},
		{
			title: "Updated Date",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: Date) => formartedDate(updatedAt),
			width: "12%",
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			width: "10%",
			render: (status: boolean, record: User) =>
				<Switch defaultChecked={status}
					onChange={(checked) => changeStatusUser(checked, record.id, handleUserStatus)}
				/>,
		},
		{
			title: "Action",
			key: "action",
			width: "20%",
			render: (_: unknown, record: User) => (
				record.role !== "member" ? ( // Kiểm tra nếu role khác "Member"
					<div>
						<EditOutlined
							className="hover:cursor-pointer text-blue-400 hover:opacity-60"
							style={{ fontSize: "20px" }}
							onClick={() => {
								setModalMode("Edit");
								setIsModalVisible(true);
								form.setFieldsValue(record);
								setFormData(record);

								const avatarUrl = typeof record.avatar === "string" ? record.avatar : "";

								setFileList(
									avatarUrl
										? [
											{
												uid: "-1",
												name: "avatar.png",
												status: "done",
												url: avatarUrl,
											} as UploadFile<any>,
										]
										: []
								);
							}}
						/>
						{record.id !== user.id && (
							<CustomDeletePopconfirm
								title="Delete the User"
								description="Are you sure to delete this User?"
								onConfirm={() =>
									deleteUser(record.id, record.name, fetchUsers)
								}
							/>
						)}
					</div>
				) : null // Trả về null nếu role là "Member"
			),
		},

	];

	const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};


	return (
		<div>
			<div className="flex flex-row md:flex-row justify-between items-center mb-4">
				<div className="flex flex-row justify-between w-full mt-3 md:mt-0">
					<CustomBreadcrumb />
					<Button type="primary" className="py-2 top-14" onClick={handleAddClick}>
						<UserAddOutlined /> Add New User
					</Button>
				</div>
			</div>

			<Space className="pb-3 flex flex-wrap">
				<Input.Search
					placeholder="Search By Name and Email"
					value={searchText}
					onChange={handleSearchText}
					className="w-full md:w-64"
					enterButton={<SearchOutlined className="text-white" />}
				/>

				<CustomSelect
					className="w-full mt-2 md:w-32 md:mt-0 md:ml-2"
					value={selectedRole}
					options={[ROLES.REFEREE, ROLES.MEMBER, ROLES.MANAGER, ROLES.STAFF, '']}
					getColor={getRoleColor}
					getLabel={getRoleLabel}
					onChange={handleRolefilter}
				/>

				<Select value={selectedStatus} onChange={handleStatus} className="w-full mt-2 md:w-32 md:mt-0 md:ml-2">
					<Select.Option value="true">Active</Select.Option>
					<Select.Option value="false">Inactive</Select.Option>
				</Select>

			</Space>

			<Table
				columns={columns}
				dataSource={dataUsers}
				pagination={false}
				onChange={handleTableChange}
				rowKey={(record: User) => record?.id || "unknown"}
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
				title={modalMode === "Edit" ? "Edit User" : "Add New User"}
				open={isModalVisible}
				onCancel={handleModalCancel}
				footer={null}
				destroyOnClose={true}
			>
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
				>
					<NameFormItem />
					{modalMode === "Add" && <EmailFormItem />}
					{modalMode === "Add" && (
						<div className="mt-3">
							<PasswordFormItem />
						</div>
					)}
					{modalMode === "Add" && (

						<Form.Item name="role" rules={roleRules} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="mb-3">
							<Radio.Group>
								<Radio value="Staff">Staff</Radio>
								<Radio value="Referee">Referee</Radio>
							</Radio.Group>
						</Form.Item>
					)}

					<Form.Item label="Avatar" name="avatar">
						<Upload
							listType="picture-card"
							fileList={fileList}
							onPreview={handlePreview}
							onChange={handleChange}
							beforeUpload={() => false}
						>
							{fileList.length >= 1 ? null : <UploadButton />}
						</Upload>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							{modalMode === "Edit" ? "Update User" : "Add User"}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			{previewImage && (
				<Image
					wrapperStyle={{ display: "none" }}
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) => !visible && setPreviewImage(""),
						mask: null
					}}
					src={previewImage}
				/>
			)}
		</div>
	);
};

export default ManageUser;
