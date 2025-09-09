import { Avatar, Col, Dropdown, MenuProps, Row, Space } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services';
import { HistoryOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { BiHelpCircle } from 'react-icons/bi';
import { RiFeedbackLine, RiLockPasswordLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { DropdownAvatarProps } from '../../interfaces';
import { FaRegRegistered } from "react-icons/fa";
import { avatarReplace, PATHS, ROLES } from '../../consts';
import { useTranslation } from 'react-i18next';


const DropdownAvatar: React.FC<DropdownAvatarProps> = ({ dataUser }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const items: MenuProps['items'] = dataUser.role === ROLES.REFEREE || dataUser.role === ROLES.STAFF
        ? [
            {
                label: (
                    <div className="text-[0.7rem] leading-[0.5rem]">
                        <Row>
                            <Col span={6} className="pt-2 pb-2">
                                <Avatar
                                    src={dataUser.avatar ? dataUser.avatar : avatarReplace}
                                    className="hover:cursor-pointer mt-1 border border-black"
                                    size={40}
                                    icon={<UserOutlined />}
                                />
                            </Col>
                            <Col span={16} className="pt-3 pr-4 pl-1">
                                <Row>
                                    <p className="text-[1.2rem] font-bold">{dataUser.name}</p>
                                </Row>
                                <div>
                                    <p className="text-[0.875rem]">{dataUser.email}</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ),
                key: '1',
            },
            { type: 'divider' },
            {
                label: (
                    <Link className="text-lg" to={PATHS.USER_HISTORY}>
                        <HistoryOutlined className="text-[1.3rem] mr-3" />
                        {t('view_history')}
                    </Link>
                ),
                key: '2',
            },
            {
                label: (
                    <Link className="text-lg mb-0" to={PATHS.CHANGE_PASSWORD}>
                        <div className="flex items-center">
                            <RiLockPasswordLine className="text-center text-[1.5rem] mr-3 ml-[-3px]" />
                            {t('change_pass')}
                        </div>
                    </Link>
                ),
                key: '4',
            },
            {
                label: (
                    <div>
                        <p
                            onClick={() => logout(navigate)}
                            className="text-lg hover:cursor-pointer mb-0"
                        >
                            <LogoutOutlined className="mr-4" />
                            {t('sign_out')}
                        </p>
                    </div>
                ),
                key: '5',
            },
            { type: 'divider' },
            {
                label: (
                    <Link to="/settings" className="text-lg mb-0 flex">
                        <IoSettingsOutline className="text-center mr-4 text-[1.3rem] mt-1" />
                        {t('setting')}
                    </Link>
                ),
                key: '6',
            },
            { type: 'divider' },
            {
                label: (
                    <Link to="/help" className="text-lg mb-0">
                        <div className="flex items-center">
                            <BiHelpCircle className="text-center text-[1.5rem] mr-4 mt-[0.1rem]" />
                            {t('help')}
                        </div>
                    </Link>
                ),
                key: '7',
            },
            {
                label: (
                    <Link to="/feedback" className="text-lg mb-0">
                        <div className="flex items-center">
                            <RiFeedbackLine className="text-center text-[1.5rem] mr-4 mt-1" />
                            {t('feed')}
                        </div>
                    </Link>
                ),
                key: '8',
            },
        ]
        : dataUser.role === ROLES.MEMBER ? [
            {
                label: (
                    <Link to={PATHS.USER_PROFILE}>
                        <div className="text-[0.7rem] leading-[0.5rem]">
                            <Row>
                                <Col span={6} className="pt-2 pb-2">
                                    <Avatar
                                        src={dataUser.avatar ? dataUser.avatar : avatarReplace}
                                        className="hover:cursor-pointer mt-1 border border-black"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                </Col>
                                <Col span={16} className="pt-3 pr-4 pl-1">
                                    <Row>
                                        <p className="text-[1.2rem] font-bold">{dataUser.name}</p>
                                    </Row>
                                    <div>
                                        <p className="text-[0.875rem]">{dataUser.email}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Link>
                ),
                key: '1',
            },
            { type: 'divider' },
            {
                label: (
                    <Link className="text-lg" to={PATHS.USER_HISTORY}>
                        <HistoryOutlined className="text-[1.3rem] mr-3" />
                        {t('view_regis')}
                    </Link>
                ),
                key: '2',
            },
            {
                label: (
                    <Link className="text-lg" to={PATHS.USER_HISTORY}>
                        <HistoryOutlined className="text-[1.3rem] mr-3" />
                        {t('view_koi')}
                    </Link>
                ),
                key: '3',
            },
            {
                label: (
                    <Link className="text-lg mb-0" to={PATHS.CHANGE_PASSWORD}>
                        <div className="flex items-center">
                            <RiLockPasswordLine className="text-center text-[1.5rem] mr-3 ml-[-3px]" />
                            {t('change_pass')}
                        </div>
                    </Link>
                ),
                key: '4',
            },
            {
                label: (
                    <Link className="text-lg mb-0" to='/register-koi'>
                        <div className="flex items-center">
                            <FaRegRegistered className="text-center text-[1.5rem] mr-3 ml-[-3px]" />
                            register koi fish
                        </div>
                    </Link>
                ),
                key: '5',
            },
            {
                label: (
                    <div>
                        <p
                            onClick={() => logout(navigate)}
                            className="text-lg hover:cursor-pointer mb-0"
                        >
                            <LogoutOutlined className="mr-4" />
                            {t('sign_out')}
                        </p>
                    </div>
                ),
                key: '6',
            },
            { type: 'divider' },
            {
                label: (
                    <Link to="/settings" className="text-lg mb-0 flex">
                        <IoSettingsOutline className="text-center mr-4 text-[1.3rem] mt-1" />
                        {t('setting')}
                    </Link>
                ),
                key: '6',
            },
            { type: 'divider' },
            {
                label: (
                    <Link to="/help" className="text-lg mb-0">
                        <div className="flex items-center">
                            <BiHelpCircle className="text-center text-[1.5rem] mr-4 mt-[0.1rem]" />
                            {t('help')}
                        </div>
                    </Link>
                ),
                key: '7',
            },
            {
                label: (
                    <Link to="/feedback" className="text-lg mb-0">
                        <div className="flex items-center">
                            <RiFeedbackLine className="text-center text-[1.5rem] mr-4 mt-1" />
                            {t('feed')}
                        </div>
                    </Link>
                ),
                key: '8',
            },
        ] : [

        ]

    return (
        <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar
                        src={
                            typeof dataUser.avatar === "string"
                                ? dataUser.avatar
                                : undefined
                        }
                        className="hover:cursor-pointer border border-black"
                        size={40}
                        icon={<UserOutlined />}
                    />
                </Space>
            </a>
        </Dropdown>
    );
};

export default DropdownAvatar;
