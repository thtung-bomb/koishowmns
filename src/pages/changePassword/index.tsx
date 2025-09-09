import { useState } from "react";
import { Form, Input } from "antd";
import { changePassword } from "../../services";
import { CheckCircleOutlined } from "@ant-design/icons";
import { images } from "../../assets";
import { ButtonFormItem, LoadingOverlay } from "../../components";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ValuesChangePassword } from "../../interfaces";
import { useTranslation } from "react-i18next";

const ChangePassword: React.FC = () => {
    const [validations, setValidations] = useState({
        oldPassword: false,
        newPassword: {
            minLength: false,
        },
        confirmPassword: false,
    });
    const [formKey, setFormKey] = useState(0);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const { t } = useTranslation();

    const validateOldPassword = (password: string) => {
        setValidations((prev) => ({
            ...prev,
            oldPassword: password?.length >= 6,
        }));
    };

    const validateNewPassword = (password: string) => {
        const newValidations = {
            minLength: password?.length >= 6,
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            specialChar: /[^A-Za-z0-9]/.test(password),
            noSpace: !/\s/.test(password),
        };
        setValidations((prev) => ({
            ...prev,
            newPassword: newValidations,
        }));
    };

    const validateConfirmPassword = (
        confirmPassword: string,
        newPassword: string
    ) => {
        setValidations((prev) => ({
            ...prev,
            confirmPassword: confirmPassword === newPassword,
        }));
    };

    const onFinish = async (values: ValuesChangePassword) => {
        try {
            await changePassword(values);
            setFormKey((prevKey) => prevKey + 1); // Force form to re-render
        } catch (error) {
            console.error("Password change failed:", error);
        }
    };

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center">
                <div className="mb:h-screen w-full lg:w-2/3 py-8 flex justify-center">
                    <div className="mb:m-auto">
                        <div className="flex justify-center mb-6">
                            <span className="text-5xl font-bold text-center">
                                {t('change_password')}
                            </span>
                        </div>
                        <div className="flex justify-center mb:m-auto">
                            <Form
                                key={formKey}
                                name="change_password"
                                onFinish={onFinish}
                                layout="vertical"
                                className="w-80"
                            >
                                <div className="mb-2 ml-3 flex gap-2">
                                    <label htmlFor="oldPassword" className="font-bold">
                                        {t('old_pass')}
                                    </label>
                                    {validations.oldPassword && (
                                        <CheckCircleOutlined style={{ color: "#1aff1a" }} />
                                    )}
                                </div>
                                <Form.Item
                                    name="oldPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: `${t('oldpassword_error')}`,
                                        },

                                        {
                                            validator: (_, value) => {
                                                validateOldPassword(value);
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={t('opw_placehoder')}
                                        className="h-12"
                                    />
                                </Form.Item>
                                <div className="mb-2 ml-3 flex gap-2">
                                    <label htmlFor="newPassword" className="font-bold">
                                        {t('new_pass')}
                                    </label>
                                    {Object.values(validations.newPassword).every(Boolean) && (
                                        <CheckCircleOutlined style={{ color: "#1aff1a" }} />
                                    )}
                                </div>
                                <Form.Item
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: `${t('newpassword_error')}`,
                                        },

                                        {
                                            validator: (_, value) => {
                                                validateNewPassword(value);
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={t('npw_placehoder')}
                                        className="h-12"
                                    />
                                </Form.Item>
                                <div className="pb-5 flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`p-1 inline-block rounded-full ${validations.newPassword.minLength
                                                ? "bg-green-400"
                                                : "bg-stone-400"
                                                }`}
                                        ></span>
                                        <span
                                            className={
                                                validations.newPassword.minLength
                                                    ? "text-green-400"
                                                    : "text-stone-400"
                                            }
                                        >
                                            {t('condition_char')}
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-2 ml-3 flex gap-2">
                                    <label htmlFor="confirmPassword" className="font-bold">
                                        {t('confirm_pass')}
                                    </label>
                                    {validations.confirmPassword && (
                                        <CheckCircleOutlined style={{ color: "#1aff1a" }} />
                                    )}
                                </div>
                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={["newPassword"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: `${t('confirm_newpass_error')}`,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                validateConfirmPassword(
                                                    value,
                                                    getFieldValue("newPassword")
                                                );
                                                if (!value || getFieldValue("newPassword") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        `${t('not_match')}`
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={t('cfp_placehoder')}
                                        className="h-12"
                                    />
                                </Form.Item>
                                <div className="mb:flex mb:justify-center md:justify-start">
                                    <ButtonFormItem className="bg-brandPrimary" buttonText={t('change_password')} htmlType="submit" />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 bg-amber-50 flex flex-col justify-between min-h-screen mb:hidden md:block px-4">
                    <div className="flex justify-center mb-8 lg:mb-16 mb:hidden md:block">
                        <div className="flex flex-col text-center lg:text-left">
                            <span className="text-3xl font-bold mt-20">{t('dl')}</span>
                            <span className="text-3xl font-bold">{t('wh')}</span>
                        </div>
                    </div>
                    <div className="flex justify-center lg:justify-end h-full md:block mb:hidden">
                        <img
                            src={images.changepass}
                            className="w-full lg:w-2/3 h-auto"
                            alt="Change Password Illustration"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
