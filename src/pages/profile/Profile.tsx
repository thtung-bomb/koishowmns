import { Avatar, Button, Col, Form, Input, Row, Upload } from "antd";
import { useState, useEffect } from "react";
import { Image } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { getBase64, getFormattedDate, getUserFromLocalStorage, uploadFile } from "../../utils";
import { UploadButton } from "../../components";
import React from "react";
import { useTranslation } from "react-i18next";

type FileType = Parameters<Required<UploadProps>["beforeUpload"]>[0];

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        avatar: "",
        createdAt: "",
        description: "",
        googleId: "",
        isDeleted: false,
        role: "member",
        status: false,
        updatedAt: "",
    });

    const { t } = useTranslation();

    useEffect(() => {
        const userData = getUserFromLocalStorage();
        if (userData) {
            const dateOfBirth = getFormattedDate(new Date(userData.dob));
            const createdAt = getFormattedDate(new Date(userData.createdAt));
            const updatedAt = getFormattedDate(new Date(userData.updatedAt));
            setUser({
                id: userData.id,
                name: userData.name,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                dob: dateOfBirth,
                avatar: userData.avatar,
                createdAt: userData.createdAt,
                description: userData.description,
                googleId: userData.googleId,
                isDeleted: userData.isDeleted,
                role: userData.role,
                status: userData.status,
                updatedAt: userData.updatedAt,
            });
            form.setFieldsValue({
                name: userData.name,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                dob: dateOfBirth,
                avatar: userData.avatar,
                created_at: createdAt,
                updated_at: updatedAt,
            });
            if (userData.avatar) {
                setFileList([
                    {
                        url: userData.avatar,
                        uid: "",
                        name: "",
                    },
                ]);
            }
        }
    }, [form]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleEdit = async () => {
        const values = await form.validateFields();

        let avatarUrl: string = user.avatar || "";
        if (fileList.length > 0) {
            const file = fileList[0];
            if (file.originFileObj) {
                avatarUrl = await uploadFile(file.originFileObj as File);
            }
        }

        const formattedDob = getFormattedDate(values.dob);

        const updatedUser = {
            ...user,
            name: values.name !== undefined ? values.name : user.name,
            email: values.email !== undefined ? values.email : user.email,
            phoneNumber: values.phoneNumber !== undefined ? values.phone_number : user.phoneNumber,
            dob: formattedDob !== undefined ? formattedDob : user.dob,
            avatar: avatarUrl !== undefined ? avatarUrl : user.avatar,
            description: values.description !== undefined ? values.description : user.description,
            createdAt: user.createdAt,
            googleId: user.googleId,
            isDeleted: user.isDeleted,
            role: user.role,
            status: user.status,
            updated_at: new Date().toISOString(),
        };

        // try {
        //   const response = await axiosInstance.put(`${API_UPDATE_USER}/${user._id}`, updatedUser);

        //   if (response.data.email === updatedUser.email) {

        //     localStorage.setItem("user", JSON.stringify(updatedUser));
        //     setUser(updatedUser);

        //     form.setFieldsValue({
        //       name: updatedUser.name,
        //       email: updatedUser.email,
        //       phone_number: updatedUser.phoneNumber,
        //       dob: getFormattedDate(updatedUser.dob),
        //       avatar: updatedUser.avatar,

        //     });

        //     message.success(`Updated ${values.name} successfully`);
        //   }
        // } catch(error) {
        //     console.log(error)
        // }
    };


    const getAvatarUrl = (url: string) => `${url}?t=${new Date().getTime()}`;

    return (
        <div className="w-full rounded-md mb:mt-10 md:mt-0">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex gap-4">
                    <Avatar size={90} src={getAvatarUrl(user.avatar) || "https://default-avatar-url.com"} alt="avatar" />
                    <div className="flex flex-col justify-center gap-2">
                        <span className="text-lg font-bold">{user.name}</span>
                        <span className="text-md">{user.email}</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <Form form={form} onFinish={handleEdit}>
                    <Row gutter={16}>
                        <Col xs={24} md={12} span={12} className="flex justify-center">
                            <Form.Item
                                label={t('full_name')}
                                name="name"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                className="w-2/3"
                            >
                                <Input className="w-full h-10" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} span={12} className="flex justify-center">
                            <Form.Item label="Email" name="email" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="w-2/3">
                                <Input className="w-full h-10" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={12} span={12} className="flex justify-center">
                            <Form.Item label={t('phone_number')} name='phoneNumber' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="w-2/3">
                                <Input className="w-full h-10" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} span={12} className="flex justify-center">
                            <Form.Item
                                label={t('dob')}
                                name="dob"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                className="w-2/3"
                            >
                                <Input className="w-full h-10" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={12} span={12} className="flex justify-center">
                            <Form.Item label={t('createDate')} name="created_at" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="w-2/3">
                                <Input className="w-full h-10" disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} span={12} className="flex justify-center">
                            <Form.Item
                                label={t('updatedDate')}
                                name="updated_at"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                className="w-2/3"
                            >
                                <Input className="w-full h-10" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="flex md:ml-28 mb:justify-center md:justify-start md:pl-2">
                        <Form.Item label="Avatar" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 1 ? null : <UploadButton />}
                            </Upload>
                        </Form.Item>
                    </div>
                    <div className="flex mb:justify-center align-middle md:justify-start md:ml-28">
                        <Button type="primary" htmlType="submit" className="mb:w-2/3 sm:w-screen md:w-24">
                            Edit
                        </Button>
                    </div>
                </Form>
            </div>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
};

export default Profile;
