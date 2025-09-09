import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionProps } from '@/interfaces';
import { Banner } from '@/components';
import { images } from '@/assets'
import { useScrollPosition } from '@/hooks';

export const Section = ({ title, subtitle, description, imageFirst = false, bg = 'bg-white', imageLink, style }: SectionProps) => (
    <section className={`py-10 px-10 xl:px-0 ${bg}`}>
        <div className='max-w-6xl mx-auto'>
            <h1 className='text-4xl text-center text-brandPrimary mb-12'>{title}</h1>
            <div className={`flex flex-col ${imageFirst ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 mb-24 items-center`}>
                {/* Left side - text content */}
                <div className='lg:flex-1 flex flex-col gap-5 justify-center text-left'>
                    <h2 className='text-3xl font-semibold'>{subtitle}</h2>
                    <p className='text-lg text-gray-600'>{description}</p>
                </div>
                {/* Right side - image */}
                <div className='lg:flex-1 h-96 relative'>
                    <img src={imageLink} alt="Koi fish" className='object-right h-full w-full rounded-lg justify-center align-center' style={style?.image} />
                </div>
            </div>
        </div>
    </section>
);

const AboutPage: React.FC = () => {
    const { t } = useTranslation();
    useScrollPosition(window.location.href);
    return (
        <>
            {/* Banner Section */}
            <Banner
                bgImage="../src/assets/6.png"
                titleKey="about_title"
                descriptionKey="about_us_description"
                buttonTextKey="see_more_button"
                showButton={true}
            />

            {/* Mission Section */}
            < Section
                title={t('our_mission')}
                subtitle={t('mission_subtitle')}
                description={t('mission_description')}
                imageLink={images.misson}
            />

            {/* Vision Section */}
            < Section
                title={t('our_vision')}
                subtitle={t('vision_subtitle')}
                description={t('vision_description')}
                imageFirst={true}
                bg="bg-neutralSilver"
                imageLink={images.vision}
            />

            {/* Why Choose Us Section */}
            < Section
                title={t('why_choose_us')}
                subtitle={t('why_choose_us_subtitle')}
                description={t('why_choose_us_description')}
                imageFirst={true}
                imageLink={images.takecare}
            />
        </>
    );
}

export default AboutPage;
