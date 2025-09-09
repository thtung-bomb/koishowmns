import { useTranslation } from "react-i18next";
import { BannerProps } from "@/interfaces";
import React from "react";

const Banner: React.FC<BannerProps> = ({
    bgImage,
    titleKey,
    descriptionKey,
    buttonTextKey,
    showButton = false,
}) => {
    const { t } = useTranslation();

    return (
        <section
            className="text-neutralDGrey bg-neutralSilver bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className='max-w-6xl w-full h-[70vh] mx-auto text-center flex flex-col justify-center'>
                <h1 className='md:text-6xl sm:text-5xl text-3xl font-bold text-white'>{t(titleKey)}</h1>
                <p className='md:text-2xl texl-xl font-bold text-yellow-400'>{t(descriptionKey)}</p>
                {showButton && buttonTextKey && (
                    <button className='bg-[#d02a2a] w-[150px] text-white rounded-md font-medium mx-auto py-3'>
                        {t(buttonTextKey)}
                    </button>
                )}
            </div>
        </section>
    );
};

export default Banner;