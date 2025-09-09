import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '@/consts';
import { FaBars, FaXmark } from 'react-icons/fa6';
import LanguageSwitcher from '../language/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { images } from '@/assets';
import { Modal, DropdownAvatar } from '@/components';
import { getUserFromLocalStorage } from '../../utils';


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);
    const { t } = useTranslation();
    const user = getUserFromLocalStorage();


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    }, [])



    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setIsLoginForm(true);
    }

    const openRegisterForm = () => {
        setIsModalOpen(true);
        setIsLoginForm(false);
    }

    const navItems = [
        { link: t('home'), path: PATHS.HOME },
        { link: t('contest'), path: "/contest" },
        { link: t('register_koi'), path: "/register-koi" },
        { link: t('contact_us'), path: PATHS.CONTACT },
    ];


    return (
        <header className='w-full bg-white md:bg-transparent sticky top-0 left-0 right-0 z-50'>
            <nav className={`py-4 lg:px-14 px-2 sm:px-4 sm:flex-wrap bg-white ${isSticky ? "sticky top-0 left-0 right-0 border-b duration-700" : ""}`}>
                <div className='flex flex-col md:flex-row justify-between items-center text-base gap-8'>
                    <div className='relative flex justify-between items-center text-base gap-8 w-full'>
                        <div className='flex items-center align-middle gap-8'>
                            <Link to={PATHS.HOME} className='lg:text-2xl text-base font-semibold flex items-center space-x-1'>
                                <img src={images.logo} alt="logo" className='md:w-10 w-9 inline-block items-center rounded-full' /><span className='text-[#263238]'>KoiChamp</span>
                            </Link>

                            <span className='lg:hidden xl:hidden'><LanguageSwitcher /></span>

                        </div>

                        <ul className='md:flex space-x-12 hidden mt-4 mx-auto'>
                            {
                                navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-gray900 hover:text-brandPrimary first:font-medium'>{link}</Link>)
                            }
                        </ul>

                        <span className='hidden lg:inline-block'><LanguageSwitcher /></span>

                        {user ? <div className='ml-auto'><DropdownAvatar dataUser={user} /></div> :
                            <div className='lg:space-x-6 flex gap-2'>
                                <button onClick={openRegisterForm} className='lg:flex items-center justify-center text-nowrap text-brandPrimary hover:text-gray900 align-middle'>
                                    {t('register_button')}  {/* Translation for "Register" */}
                                </button>
                                <button type='button' onClick={openModal} className='bg-brandPrimary text-white py-2 px-3 transition-all duration-300 rounded hover:bg-neutralDGrey text-nowrap items-center justify-center align-middle'>
                                    {t('login_button')} {/* Translation for "Login" */}
                                </button>
                            </div>
                        }
                        {/* Modal Component */}
                        <Modal isOpen={isModalOpen} onClose={closeModal} isLoginForm={isLoginForm} />
                    </div>
                    <div className='absolute w-full top-16 text-end md:hidden bg-brandPrimary p-3'>
                        <button onClick={toggleMenu} className='text-yellow-50 focus:outline-none focus:text-yellow-50'>
                            {
                                isMenuOpen ? (<FaXmark className='h-6 w-6' />) : (<FaBars className='h-6 w-6' />)
                            }
                        </button>
                    </div>
                </div>
                <div className={`space-y-4 top-0 fixed right-0 left-0 px-4 mt-28 py-7 transition-transform duration-700 ease-in-out transform bg-brandPrimary ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
                    {
                        navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-white hover:opacity-80 first:font-medium'>{link}</Link>)
                    }
                </div>
            </nav>

        </header >
    );
};

export default Header;
