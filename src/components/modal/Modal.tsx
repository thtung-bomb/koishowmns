import { GoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCloseLargeLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { RootState } from '@/store'
import { LoadingOverlay } from '@/components';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { handleNavigateRole, login, register } from '../../services';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PATHS } from '../../consts';



interface ModalProps {
    isOpen: boolean;
    isLoginForm: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, isLoginForm }) => {
    const [isLogin, setIsLogin] = useState(isLoginForm);
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);

    useEffect(() => {
        setIsLogin(isLoginForm);
    }, [isLoginForm])

    const renderGoogleLogin = () => (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                localStorage.setItem("googleToken", credentialResponse.credential as string);
            }}
        />
    );

    const handleCloseModal = () => {
        setEmail('');
        setPassword('');
        setName('');
        setPhoneNumber('');
        onClose();
    }

    const handleTransitionForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setPhoneNumber('');
        setIsLogin(!isLogin)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let payload;
            if (isLogin) {
                payload = {
                    email: email,
                    password: password,
                };
                const authResult = await login(email, password);
                if (authResult && "token" in authResult) {
                    handleNavigateRole(authResult.token, navigate);
                }
            }
            else {
                payload = {
                    name,
                    email,
                    password,
                    phoneNumber,
                };
                await register(payload);
                const authResult = await login(email, password);
                if (authResult && "token" in authResult) {
                    handleNavigateRole(authResult.token, navigate);
                }
            }
            onClose();
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        <div>
            {isLoading && <LoadingOverlay />}
            <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

                <div className={`relative z-20 transition-all duration-500 ease-in-out`} >
                    <div className='bg-slate-100 h-full text-center p-5 lg:w-[500px] rounded shadow-md'>
                        {isLogin ? (
                            <div>
                                <h2 className='text-xl font-semibold mb-4 mt-6 uppercase text-red-950'>{t('login_title')}</h2>
                                <form onSubmit={handleSubmit} className='px-4'>
                                    <div className='mb-5'>
                                        <input
                                            type="email"
                                            name='email'
                                            id='email'
                                            placeholder='example@gmail.com'
                                            className='login-register-input'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            id='password'
                                            placeholder='Your password'
                                            className='login-register-input'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            style={{ position: 'absolute', right: '45px', top: '35.5%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </span>
                                    </div>
                                    <div className='mt-5'>
                                        <button type='submit' className='hover:shadow-md rounded-md bg-[#c83424] hover:bg-[#5d2019] py-3
                    px-8 text-base font-semibold text-white outline-none w-full transition-all duration-300'>{t('login_button')}</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <h2 className='text-xl font-semibold mb-4 mt-6 uppercase'>{t('register_title')}</h2>
                                <form onSubmit={handleSubmit} action="" className='px-4'>
                                    <div className='mb-5'>
                                        <input type="text" name='name' id='name' value={name} placeholder='Your name'
                                            className='login-register-input' onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className='mb-5'>
                                        <input
                                            type="email"
                                            name='email'
                                            id='email'
                                            placeholder='example@gmail.com'
                                            className='login-register-input'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            id='password'
                                            placeholder='Your password'
                                            className='login-register-input'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            style={{ position: 'absolute', right: '45px', top: '38.5%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </span>
                                    </div>
                                    <div className='my-5'>
                                        <input
                                            type="text"
                                            name='phoneNumber'
                                            id='phoneNumber'
                                            placeholder='Your phone number'
                                            className='login-register-input'
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className='mt-5'>
                                        <button className='hover:shadow-md rounded-md bg-[#c83424] hover:bg-[#5d2019] py-3
                    px-8 text-base font-semibold text-white outline-none w-full'>{t('register_button')}</button>
                                    </div>
                                </form>
                                {/* <p className='mt-4'>Already have an account? <span onClick={() => setIsLogin(true)} className='text-sky-700 cursor-pointer'>Login here</span></p> */}
                            </div>
                        )}
                        <div className='mt-4' onClick={handleCloseModal}>
                            <Link to={PATHS.FORGOT_PASSWORD} className='hover:underline text-brandPrimary'>
                                {t('forgot_password')}
                            </Link>
                        </div>
                        <span className='flex flex-col justify-between gap-6 mt-4'>
                            <div className="flex items-center justify-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-4 text-gray-500">{t('or')}</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            <div className='flex align-center justify-center rounded-full'>{renderGoogleLogin()}</div>
                            {/* 
                            login with github
                            login with facebook
                        */}
                            {isLogin ? <p className='mt-4'>{t('havent_account')} <span onClick={handleTransitionForm} className='text-[#c83424] hover:text-[#6d2a22] cursor-pointer'>{t('register_title')}</span></p>
                                : <p className='mt-4'>{t('have_account')} <span onClick={handleTransitionForm} className='text-[#c83424] hover:text-[#6d2a22] cursor-pointer'>{t('login_title')}</span></p>
                            }
                        </span>
                    </div>

                    <button onClick={handleCloseModal} className='absolute top-0 right-0 bg-transparent hover:bg-transparent text-3xl text-gray-800 hover:text-red-600 font-semibold p-3 transition-all duration-150'>
                        <RiCloseLargeLine />
                    </button>
                </div>
            </div >
        </div>
    );
};

export default Modal;
