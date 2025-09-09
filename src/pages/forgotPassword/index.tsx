import React, { useState } from 'react'
import { PATHS } from '../../consts'
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LoadingOverlay } from '../../components';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const { t } = useTranslation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className='bg-[#e9ebee] py-8'>
                <div className=''>
                    <div className='flex justify-center align-middle m-auto'>
                        <form onSubmit={(e) => handleSubmit(e)} className='m-auto'>
                            <div className="pt-2 border-none rounded-lg shadow-sm mx-auto md:w-[500px] w-[300px] bg-white text-[#1c1e21]">
                                <div className='mt-2 border-[rgba(0,0,0,0.1)] mx-0 p-0 border-b pb-0'>
                                    <div className='mb:text-center sm:text-center md:text-left'>
                                        <h2 className='text-[20px] mt-[-15px] pt-4 pb-2 pr-4 pl-6'>{t('find_account')}</h2>
                                    </div>
                                </div>
                                <div>
                                    <div className='mb:text-center md:text-left'>
                                        <p className='md:text-lg text-sm my-4 md:ml-6 ml-3'>{t('forgor_password_label')}</p>
                                    </div>
                                    <div className='flex justify-center align-middle mb-2'>
                                        <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('placehoder_email')} className='forgor-password-input' />
                                    </div>
                                </div>
                                <div className='border-t border-[rgba(0,0,0,0.1)] rounded-b-lg p-4'>
                                    <div className='flex gap-1 mb:justify-center md:justify-end'>
                                        <button>
                                            <Link to={PATHS.HOME} className='py-2 md:px-5 px-2 bg-[#e4e6eb] border-none rounded-md text-[15px] ml-2 mb-3 text-[#4b4f56] cursor-pointer text-center'>
                                                {t('cancel')}
                                            </Link>
                                        </button>
                                        <button type='submit' className='py-2 md:px-5 px-2 bg-brandPrimary border-none rounded-md text-[15px] ml-2 text-white font-bold cursor-pointer text-center'>{t('submit')}</button>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword