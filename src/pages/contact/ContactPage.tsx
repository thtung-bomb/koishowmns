import React from 'react';
import { BiEnvelope, BiMap, BiPhoneCall } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { Banner } from '../../components';
import { BsClock } from 'react-icons/bs';
import contactImg from '../../assets/contact-png.png'

function ContactPage() {
    const { t } = useTranslation();

    return (
        <div>
            <Banner
                bgImage="../src/assets/6.png"
                titleKey="contact_title"
                descriptionKey="contact_intro"
                buttonTextKey="login_button"
                showButton={true}
            />

            <div className='max-w-[1320px] my-0 mx-auto py-0 px-4'>
                <div className='mx-0 text-center px-0 py-5 my-5 md:grid md:grid-cols-2 xl:grid-cols-4'>
                    <div className='my-3 mx-0 p-4'>
                        <span className='block'><i className='flex justify-center'><BiPhoneCall className='text-brandPrimary text-[4rem] pb-[0.9rem]' /></i></span>
                        <span className='block font-medium text-[1.1rem]'>{t('phone_number')}</span>
                        <span className='pt-[0.4rem] block'>0898320059</span>
                    </div>

                    <div className='my-3 mx-0 p-4'>
                        <span className='block'><i className='flex justify-center'><BiEnvelope className='text-brandPrimary text-[4rem] pb-[0.9rem]' /></i></span>
                        <span className='block font-medium text-[1.1rem]'>Email</span>
                        <span className='pt-[0.4rem] block'>koichamp@gmail.com</span>
                    </div>

                    <div className='my-3 mx-0 p-4'>
                        <span className='block'><i className='flex justify-center'><BiMap className='text-brandPrimary text-[4rem] pb-[0.9rem]' /></i></span>
                        <span className='block font-medium text-[1.1rem]'>{t('address')}</span>
                        <span className='pt-[0.4rem] block'>FPT University</span>
                    </div>

                    <div className='my-3 mx-0 p-4'>
                        <span className='block'><i className='flex justify-center'><BsClock className='text-brandPrimary text-[4rem] pb-[0.9rem]' /></i></span>
                        <span className='block font-medium text-[1.1rem]'>{t('opening_hours')}</span>
                        <span className='pt-[0.4rem] block'>{t('monday_friday')} (9:00 AM to 5:00 PM)</span>
                    </div>
                </div>

                <div className='py-8 pr-0 lg:pl-10 border-t border-solid border-[#c7c7c7] lg:grid lg:grid-cols-2 lg:items-center'>
                    <form action="" className='pb-4'>
                        <div className='grid grid-cols-2 gap-x-[0.6rem]'>
                            <input type="text" className='w-full border-[1.5px] border-solid border-[#c7c7c7] rounded p-3 my-[0.6rem] mx-0 text-[1rem] outline-0 focus:shadow-sm' placeholder='First Name' />
                            <input type="text" className='w-full border-[1.5px] border-solid border-[#c7c7c7] rounded p-3 my-[0.6rem] mx-0 text-[1rem] outline-0' placeholder='Last Name' />
                        </div>
                        <div className='grid grid-cols-2 gap-x-[0.6rem]'>
                            <input type="email" className='w-full border-[1.5px] border-solid border-[#c7c7c7] rounded p-3 my-[0.6rem] mx-0 text-[1rem] outline-0 focus:shadow-sm' placeholder='Email' />
                            <input type="text" className='w-full border-[1.5px] border-solid border-[#c7c7c7] rounded p-3 my-[0.6rem] mx-0 text-[1rem] outline-0 focus:shadow-sm' placeholder='Phone' />
                        </div>
                        <textarea name="" rows={5} placeholder='Message' id="" className='w-full border-[1.5px] border-solid border-[#c7c7c7] rounded p-3 my-[0.6rem] mx-0 text-[1rem] outline-0'></textarea>
                        <button type="submit" className='text-[1rem] uppercase text-white bg-brandPrimary border-none rounded py-[0.7rem] px-[1.5rem] cursor-pointer transition-all hover:opacity-80' value="send message">Send Message</button>
                    </form>
                    <div className='my-0 mx-auto text-center max-md:hidden'>
                        <img className='w-[85%]' src={contactImg} alt="contact-img" />
                    </div>

                </div>
            </div>
            <div className='lg:h-96 mb-20 px-10'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415304684!2d106.80730807428841!3d10.841132857998375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1726755566091!5m2!1sen!2s"
                    className='md:w-full md:h-full'
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage
