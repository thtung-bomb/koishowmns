import React from 'react';
import { changeLanguage } from '@/utils';
// You can either use flag images or react-icons for flags
// import { FaFlagUsa, FaFlag } from 'react-icons/fa'; // Example from react-icons, replace with appropriate flag icons
import vietFlag from '@/assets/viet.jpg';
import enFlag from '@/assets/en.jpg';


const LanguageSwitcher: React.FC = () => {
    const handleLanguageChange = (lng: string) => {
        changeLanguage(lng);
    };

    return (
        <div className='flex items-center lg:space-x-1 ml-2 gap-1 mr-2'>
            {/* <FaFlag onClick={() => handleLanguageChange('vi')} className='focus:outline-none cursor-pointer'>
            </FaFlag> */}
            <img src={vietFlag} onClick={() => handleLanguageChange('vi')} className='focus:outline-none cursor-pointer' />
            <img src={enFlag} onClick={() => handleLanguageChange('en')} className='focus:outline-none cursor-pointer' />
            {/* <FaFlagUsa onClick={() => handleLanguageChange('en')} className='focus:outline-none cursor-pointer'>
            </FaFlagUsa> */}
        </div>
    );
};

export default LanguageSwitcher;
