import { CaretUpOutlined } from '@ant-design/icons';
import { scrollToTop } from '@/utils';
import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const socialLinks = [
    { to: 'https://www.instagram.com', icon: <FaInstagram size={32} />, color: 'text-purple-500', bottom: 'bottom-64' },
    { to: 'https://www.youtube.com', icon: <FaYoutube size={32} />, color: 'text-red-600', bottom: 'bottom-44' },
    { to: 'https://www.facebook.com', icon: <FaFacebook size={32} />, color: 'text-blue-600', bottom: 'bottom-24' },
];

const FloatingActionButtons: React.FC = () => {
    return (
        <>
            {socialLinks.map(({ to, icon, color, bottom }) => (
                <Link
                    key={to}
                    to={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`fixed right-5 ${bottom} bg-gray-700 ${color} rounded-full p-2 flex items-center justify-center hover:opacity-85`}
                    style={{ width: '56px', height: '56px' }}
                >
                    {icon}
                </Link>
            ))}

            {/* Scroll to top button */}
            <CaretUpOutlined
                onClick={scrollToTop}
                className='fixed right-5 bottom-5 bg-gray-700 text-white rounded-full p-2 flex items-center justify-center hover:opacity-85'
                style={{ width: '56px', height: '56px' }}
            />
        </>
    );
};

export default FloatingActionButtons;
