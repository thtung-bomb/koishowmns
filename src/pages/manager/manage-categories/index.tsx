import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Pagination, Popconfirm, message, } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Category } from "../../../models";
import { getCategories, createCategory, deleteCategory, updateCategory } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import { useDebounce } from "../../../hooks";
import { CustomBreadcrumb, DescriptionFormItem, NameFormItem } from "../../../components";
import { formartedDate } from "../../../utils/timeHelpers";
const ManageCategory: React.FC = () => {
	const [dataCategories, setDataCategories] = useState<Category[]>([]);
	const [searchText, setSearchText] = useState<string>("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [formData, setFormData] = useState<Partial<Category>>({});
	const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");
	const [form] = Form.useForm();

	const debouncedSearchTerm = useDebounce(searchText, 500);
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: 1,
		pageSize: 10,
		total: 0,
	});


	useEffect(() => {
		fetchCategories();
	}, [debouncedSearchTerm, pagination.current, pagination.pageSize]);


	const fetchCategories = useCallback(async () => {
		try {
			const responseCategories = await getCategories(debouncedSearchTerm, pagination.current, pagination.pageSize);
			const sortedCaterogies = responseCategories.data.pageData.sort((a: Category, b: Category) => {
				const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				return dateB - dateA;
			});
			setDataCategories(sortedCaterogies);

			setPagination({
				...pagination,
				total: responseCategories.data.pageInfo.totalItems,
				current: responseCategories.data.pageInfo.pageNum,
				pageSize: responseCategories.data.pageInfo.pageSize,
			});
		} catch (error) {
			console.log(error);
		}
	}, [pagination.current, debouncedSearchTerm, pagination.pageSize]);

	const handleOpenModalAdd = () => {
		setModalMode("Add");
		setIsModalVisible(true);
		form.resetFields();
		setFormData({});
	};

	const handleOpenModalUpdate = (record: Category) => {
		setModalMode("Edit");
		setIsModalVisible(true);
		form.setFieldsValue(record);
		setFormData(record);
	}

	const handleModalCancel = () => {
		setIsModalVisible(false);
		setFormData({});
		form.resetFields();
	};

	const handleDelete = async (id: string, name: string) => {
		await deleteCategory(id, name, fetchCategories);
		message.success(`Category ${name} deleted successfully.`);
		await fetchCategories();
	};

	const handleAddNewCategory = useCallback(
		async (values: Category) => {
			try {

				const categoryData = { ...values };
				const response = await createCategory(categoryData);
				const newCategory = response.data.data;
				setDataCategories((prevData) => [newCategory, ...prevData]);
				setIsModalVisible(false);
				form.resetFields();
				fetchCategories();
			} catch (error) {
				console.log(error);
			}
		},
		[fetchCategories, form]
	);

	const handleEditCategory = async (values: Category) => {
		console.log(values)
		const updatedCategory = {
			...values,
			name: values.name,
			description: values.description
		};

		console.log(updatedCategory);

		await updateCategory(formData.id, updateCategory);

		setDataCategories((prevData) =>
			prevData.map((category) =>
				category.id === formData.id
					? {
						...category,
						...updatedCategory,
					}
					: category
			)
		);

		setIsModalVisible(false);
		form.resetFields();
		setFormData({});
		fetchCategories();
	};

	const onFinish = (values: Category) => {
		if (modalMode === "Edit") {
			if (formData.id) {
				handleEditCategory({
					...formData,
					...values,
				});
			}
		} else {
			handleAddNewCategory(values);
		}
		setIsModalVisible(false);
	};


	const handleTableChange = (pagination: TablePaginationConfig) => {
		setPagination(pagination);
	};

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setPagination((prev) => ({
			...prev,
			current: page,
			pageSize: pageSize || 10,
		}));
	};

	const columns: ColumnType<Category>[] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Created Date",
			dataIndex: "createdDate",
			key: "createdDate",
			render: (createdAt: Date) => formartedDate(createdAt),
		},
		{
			title: "Updated Date",
			dataIndex: "updatedDate",
			key: "updatedDate",
			render: (updatedAt: Date) => formartedDate(updatedAt),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Action",
			key: "action",
			width: "10%",
			render: (_: unknown, record: Category) => (
				<div>
					<EditOutlined
						className="text-blue-500"
						style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
						onClick={() => handleOpenModalUpdate(record)}
					/>
					<Popconfirm
						title="Are you sure to delete this category?"
						onConfirm={() => handleDelete(record.id, record.name)}
						okText="Yes"
						cancelText="No"
					>
						<DeleteOutlined
							className="text-red-500"
							style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
						/>
					</Popconfirm>
				</div>
			),
		},
	];
	const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};
	return (
		<>
			<div>
				<div className="flex justify-between items-center ">
					<CustomBreadcrumb />

					<Button type="primary" onClick={handleOpenModalAdd}>
						Add New Category
					</Button>
				</div>
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
					dataSource={dataCategories}
					rowKey={(record: Category) => record?.id || 'unknown'}
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
					title={modalMode === "Edit" ? "Edit Category" : "Add New Category"}
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
						<DescriptionFormItem />
						<Form.Item>
							<Button type="primary" htmlType="submit">
								{modalMode === "Edit" ? "Edit Category" : "Add Category"}
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		</>
	);
};

export default ManageCategory;

