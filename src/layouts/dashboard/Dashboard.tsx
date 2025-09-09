import React, { useEffect, useState } from 'react';
import { DesktopOutlined, ProfileOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, Space, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom'; import { RiListUnordered } from 'react-icons/ri';
import { ROLES } from '../../consts';
import { DropdownAvatar } from '../../components';
import { logout } from '../../services';
import { IoLogOutOutline } from 'react-icons/io5';
import { getUserFromLocalStorage } from '../../utils';
;

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Dashboard: React.FC = () => {
    const [itemsNav, setItems] = useState<MenuItem[]>([]);
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        loadItems();
    }, []);

    const user = getUserFromLocalStorage();

    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label: <Link to={String(key)}>{label}</Link>,
        } as MenuItem;
    };

    const loadItems = async () => {
        if (location.pathname.includes(ROLES.MANAGER)) {
            setItems([
                getItem('Dashboard', '/manager/dashboard', <DesktopOutlined />),
                getItem('Manage Users', '/manager/manage-users', <UserOutlined />),
                getItem('Manage Contest', '/manager/manage-contest', <TrophyOutlined />),
                getItem('Manage Criteria', '/manager/manage-criteria', <TrophyOutlined />),
                getItem('Manage Categories', '/manager/manage-categories', <RiListUnordered />),
                getItem('Manage Blogs', '/manager/manage-blogs', <ProfileOutlined />),
            ]);
        }
        if (location.pathname.includes(ROLES.STAFF)) {
            setItems([
                getItem('Round Assign', '/staff/competition', <DesktopOutlined />),
                getItem('Contest Registration', '/staff/contest-registration', <UserOutlined />),
                getItem('Contest Report', '/staff/report', <UserOutlined />),
            ])
        }
        if (location.pathname.includes(ROLES.REFEREE)) {
            setItems([
                getItem('Competition', '/referee/competition', <DesktopOutlined />),
            ])
        }
    };

    const handleClick = (e: { key: React.Key }) => {
        navigate(e.key as string); // Navigate to the selected key
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={200}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    className="py-4 bg-white-50 h-full"
                    onClick={handleClick}
                    theme='light'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={itemsNav}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Sider>
            <Layout className="bg-stone-100">
                <Header className='flex justify-between items-center drop-shadow-xl bg-white'>
                    <div>
                        <p>Welcome back {user.role}</p>
                    </div>
                    {user.role !== ROLES.MANAGER ? (
                        <DropdownAvatar dataUser={user} />
                    ) : (
                        <Space>
                            <button
                                onClick={() => logout(navigate)}
                                className="flex gap-1 items-center text-base text-white border border-red-300 bg-red-500 hover:border-red-700 hover:bg-red-700 px-3 py-1 rounded transition-colors duration-300"
                            >
                                <IoLogOutOutline /><span className='mb-[0.1rem]'>Sign out</span>
                            </button>
                        </Space>
                    )}
                </Header>
                <Content style={{ margin: '30px 10px', flexGrow: 1 }}>
                    <div
                        style={{
                            padding: "5px 20px",
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ©{new Date().getFullYear()} Created by Koichamp
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
