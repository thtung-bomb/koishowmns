import React from "react";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
    Form,
    Modal,
    Pagination,
    Select,
    TableColumnsType,
    TablePaginationConfig,
    Upload,
} from "antd";
import { Button, Image, Table } from "antd";
import { Blog, Category } from "../../../models";
import { getCategories, deleteBlog, getBlogs, updateBlog, createBlog, getBlog } from "../../../services";
import { ContentFormItem, DescriptionFormItem, UploadButton, TitleFormItem, LoadingOverlay, CustomDeletePopconfirm, CustomBreadcrumb } from "../../../components";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { formartedDate, getBase64, getUserFromLocalStorage, uploadFile } from "../../../utils";
import { RootState } from "../../../store";
import { useSelector } from 'react-redux';

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AdminManageBlogs: React.FC = () => {
    const [dataBlogs, setDataBlogs] = useState<Blog[]>([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
    const [content, setContent] = useState<string>("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [pagination.current, pagination.pageSize]);

    const fetchCategories = async () => {
        const responseCategories = await getCategories();
        const categories = responseCategories.data.pageData;
        setCategories(categories);
    };

    const fetchBlogs = async () => {
        try {
            const responseBlog = await getBlogs("", pagination.current, pagination.pageSize);
            setDataBlogs(responseBlog.data.pageData);
            console.log(responseBlog.data.pageData[0].category)
            setPagination({
                ...pagination,
                total: responseBlog.data.pageInfo.totalItems,
                current: responseBlog.data.pageInfo.pageNum,
                pageSize: responseBlog.data.pageInfo.pageSize,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditorChange = (value: string) => {
        setContent(value);
        form.setFieldsValue({ content: value });
    };

    const handleUpdateClick = async (id: string) => {
        setIsUpdateMode(true);
        setIsModalVisible(true);
        try {
            const response = await getBlog(id);
            const blogData: Blog = response.data;
            console.log(blogData)
            setCurrentBlog(blogData);
            form.setFieldsValue({
                title: blogData.title,
                categoryId: blogData.category.id,
                imgUrl: blogData.imgUrl,
                description: blogData.description,
                content: blogData.content,
            });
            setContent(blogData.content);

            // Đặt fileList nếu có ảnh
            if (blogData.imgUrl) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: blogData.imgUrl,
                    },
                ]);
            } else {
                setFileList([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (values: Blog) => {
        let avatarUrl: string = "";
        if (fileList.length > 0) {
            const file = fileList[0];
            if (file.originFileObj) {
                avatarUrl = await uploadFile(file.originFileObj as File);
            } else if (file.url) {
                avatarUrl = file.url;
            }
        }
        const user = getUserFromLocalStorage();
        const payload = { ...values, content, userId: user.id, imageUrl: avatarUrl };
        try {
            console.log(payload)
            if (isUpdateMode && currentBlog) {
                await updateBlog(currentBlog.id, payload);
            } else {
                await createBlog(payload);
            }
        } catch (error) {
            console.log(error);
        }
        // Xử lý sau khi submit thành công
        setIsModalVisible(false);
        form.resetFields();
        setIsUpdateMode(false);
        setFileList([]);
        setCurrentBlog(null);
        setContent("");
        await fetchBlogs();
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

    const handleResetContent = () => {
        setIsUpdateMode(false);
        setIsModalVisible(true);
        setContent("");
        form.resetFields();
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
        setIsUpdateMode(false);
        setCurrentBlog(null);
        setFileList([]);
        form.resetFields();
    };

    const columns: TableColumnsType<Blog> = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Category",
            dataIndex: "category.name",
            key: "categoryName",
            width: "15%",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Image",
            dataIndex: "imgUrl",
            key: "imgUrl",
            width: "15%",
            render: (imgUrl: string) => <Image width={100} height={100} src={imgUrl} />,
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
            width: "10%",
        },
        {
            title: "Action",
            width: "10%",
            key: "action",
            render: (_: unknown, record: Blog) => (
                <div>
                    <EditOutlined
                        className="hover:cursor-pointer text-blue-400 hover:opacity-60"
                        style={{ fontSize: "20px" }}
                        onClick={() => handleUpdateClick(record.id)}
                    />
                    <CustomDeletePopconfirm
                        title="Delete the Blog"
                        description="Are you sure to delete this Blog?"
                        onConfirm={() => deleteBlog(record.id, record.title, fetchBlogs)}
                    />
                </div>
            ),
        },
    ];


    return (
        <div>
            <div className="flex justify-between">
                <CustomBreadcrumb />
                <div className="py-6">
                    <Button type="primary" onClick={handleResetContent}>
                        Add New Blog
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={dataBlogs}
                rowKey={(record: Blog) => record?.id || "unknown"}
                onChange={handleTableChange}
                pagination={false}
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
                title={isUpdateMode ? "Update Blog" : "Add New Blog"}
                open={isModalVisible}
                onCancel={handleCancelModal}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <TitleFormItem />
                    <Form.Item
                        name="categoryId"
                        label="Category"
                        rules={[{ required: true, message: "Please select a category!" }]}
                    >
                        <Select placeholder="Select a category">
                            {categories.map((category) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="imageUrl"
                        label="Image"
                        rules={[{ required: true, message: "Please input the image URL!" }]}
                    >
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
                    <DescriptionFormItem />
                    <ContentFormItem value={content} onEditorChange={handleEditorChange} />
                    <Form.Item>
                        <div className="flex justify-end">
                            <Button onClick={handleCancelModal}>Cancel</Button>
                            <Button type="primary" htmlType="submit" className="ml-2">
                                {isUpdateMode ? "Update Blog" : "Add Blog"}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
};

export default AdminManageBlogs;
