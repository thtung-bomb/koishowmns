import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactTyped } from "react-typed";
import image from '../../assets/banner.png'
import { useScrollPosition } from '@/hooks';
import { SectionProps } from '@interfaces';
import { images } from '@/assets'
import { Link } from 'react-router-dom';
import { ContestComponent, ListBlogs, ListSponsors } from '../../components';
import { PATHS } from '../../consts';

const Section = ({ title, subtitle, description, imageFirst = false, bg = 'bg-white', imageLink, style }: SectionProps) => (

    <section className={`px-10 xl:px-0 flex flex-col justify-center ${bg}`}>
        <div className='max-w-screen-md mx-auto'>
            <h1 className='text-4xl text-center text-brandPrimary mb-12'>{title}</h1>
            <div className={`flex flex-col ${imageFirst ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 mb-24 items-center`}>
                {/* Left side - text content */}
                <div className='lg:flex-1 flex flex-col gap-5 justify-center text-left'>
                    <h2 className='text-2xl font-semibold'>{subtitle}</h2>
                    <p className='text-lg text-gray-600'>{description}</p>
                </div>
                {/* Right side - image */}
                <div className='lg:flex-1 h-40 flex lg:justify-center items-center relative'>
                    <img src={imageLink} alt="Koi fish" className='object-right h-full w-full rounded-lg justify-center align-center' style={style?.image} />
                </div>
            </div>
        </div>
    </section>
);

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    useScrollPosition(window.location.href);
    return (
        <>
            <section className="text-neutralDGrey bg-neutralSilver" style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='max-w-6xl w-full h-[70vh] mx-auto text-center flex flex-col justify-center'>
                    <p className='text-yellow-300 font-bold p-2'>{t('hero_subtitle')}</p>
                    <h1 className='md:text-6xl text-w sm:text-5xl text-3xl font-bold text-yellow-500'>{t('hero_title')}</h1>
                    <div className='flex lg:flex-row flex-col justify-center items-center '>
                        <span className='md:text-4xl text-yellow-100 sm:text-3xl text-base font-bold'>{t('hero_introduction')}</span>
                        <ReactTyped
                            className='md:text-4xl sm:text-3xl text-yellow-100 text-base font-bold md:pl-4 pl-2'
                            strings={t('hero_types', { returnObjects: true }) as string[]}
                            typeSpeed={120}
                            backSpeed={140}
                            loop
                        />
                    </div>
                    <p className='md:text-2xl texl-xl font-bold text-yellow-200 pt-5'>{t('hero_description')}</p>
                    <button className='bg-[#d02a2a] w-[200px] text-white rounded-md font-medium mx-auto py-3'>{t('get_started_button')}</button>
                </div>
            </section >

            <div className="flex justify-center text-center py-10">
                <div className="sm:max-w-lg text-center">
                    <h3 className="text-3xl leading-none md:text-[45px] font-bold text-yellow-500">
                        {t('about_title')}
                    </h3>
                </div>
            </div>
            <Section
                subtitle={t('mission_subtitle')}
                description={
                    <>
                        {t('mission_description').split('.')[0]} <span>
                            <Link to={PATHS.ABOUT} className="text-brandPrimary underline">
                                {t('learn_more')}
                            </Link>
                        </span>
                    </>
                }
                imageLink={images.misson}
                style={{ image: { width: '600', height: '200px' } }}
            />
            {/* fish and contest */}
            <ContestComponent />

            <ListSponsors />
            <ListBlogs />
        </>
    )
}

export default HomePage