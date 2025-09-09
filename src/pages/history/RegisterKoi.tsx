import React, { useState, useEffect, useCallback } from "react";
import { Input, Space, Table, Pagination, Image, Modal, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { KoiEntry } from "@/models";
import { getKois } from "@/services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { useDebounce } from "@/hooks";
import { CustomBreadcrumb } from "@/components";
import { formartedDate } from "../../utils";
import { useForm } from "antd/es/form/Form";
import { useTranslation } from "react-i18next";

interface RegisterKoiyProps {
    activeTab: string;
}

const RegisterKoiy: React.FC<RegisterKoiyProps> = ({ activeTab }) => {
    const [dataKois, setDataKois] = useState<KoiEntry[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [form] = useForm();
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const { t } = useTranslation();

    const [selectedKoi, setSelectedKoi] = useState<KoiEntry>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const debouncedSearchTerm = useDebounce(searchText, 500);

    useEffect(() => {
        if (activeTab === "2") {
            fetchKois();
        }
    }, [activeTab, debouncedSearchTerm, pagination.current, pagination.pageSize]);

    useEffect(() => {
        fetchKois();
    }, [debouncedSearchTerm, pagination.current, pagination.pageSize]);

    const fetchKois = useCallback(async () => {
        try {
            const response = await getKois(searchText, pagination.current, pagination.pageSize);
            const sortedKois = response.pageData.sort((a: KoiEntry, b: KoiEntry) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
            setDataKois(sortedKois);
            setPagination({
                ...pagination,
                total: response.pageInfo.totalItems,
                current: response.pageInfo.pageNum,
                pageSize: response.pageInfo.pageSize,
            });
        } catch (error) {
            console.log(error);
        }
    }, [searchText, pagination.current, pagination.pageSize]);

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

    const handleRowClick = (record: KoiEntry) => {
        setSelectedKoi(record);
        form.setFieldsValue({
            name: record.name,
            varietyName: record.varietyName,
            size: record.size,
            dateOfBirth: formartedDate(record.dateOfBirth),
            createdAt: formartedDate(record.createdAt),
            updatedAt: formartedDate(record.updatedAt),
        });
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedKoi(null);
        form.resetFields();
    };

    const columns = [
        {
            title: t('koi_register_name'),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t('koi_variety'),
            dataIndex: "varietyName",
            key: "varietyName",
        },
        {
            title: t('size'),
            dataIndex: "size",
            key: "size",
            render: (size: number) => `${size} cm`,
        },
        {
            title: t('koi_dob'),
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (dateOfBirth: Date) => formartedDate(dateOfBirth),
        },
        {
            title: t('koi_create'),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: Date) => formartedDate(createdAt),
        },
        {
            title: t('koi_update'),
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt: Date) => formartedDate(updatedAt),
        },
        {
            title: t('koi_image'),
            key: "koiImages",
            dataIndex: "koiImages",
            render: (images: string[]) => (
                <Image
                    src={images[0]?.imageUrl}
                    alt="Koi fish"
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                />
            ),
        },
    ];

    return (
        <div className="px-24">
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
                dataSource={dataKois}
                pagination={false}

                rowKey="id"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record), // Handle row click
                })}
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

            <Modal
                title="Detail Koi"
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                destroyOnClose={true}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item label="Name" name="name">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Variety" name="varietyName">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Size" name="size">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="dateOfBirth">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Created Date" name="createdAt">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Updated Date" name="updatedAt">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Images" name="koiImages">
                        <Space>
                            {selectedKoi?.koiImages?.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image?.imageUrl}
                                    width={100}
                                    height={100}
                                    style={{ objectFit: "cover" }}
                                />
                            ))}
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default RegisterKoiy;
