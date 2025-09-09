import React, { useState } from 'react';
import { Tabs } from 'antd';
import RegisterContest from './RegisterContest';
import RegisterKoi from './RegisterKoi';
import { useTranslation } from 'react-i18next';

const History: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('1'); // Track the active tab
    const { t } = useTranslation();

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const items = [
        {
            key: '1',
            label: t('history_ct'),
            children: <RegisterContest activeTab={activeTab} />, // Render the content for this tab
        },
        {
            key: '2',
            label: t('history_k'),
            children: <RegisterKoi activeTab={activeTab} />, // Render the content for this tab
        },
    ];


    return (
        <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            centered
            items={items}
        />
    );
};

export default History;
