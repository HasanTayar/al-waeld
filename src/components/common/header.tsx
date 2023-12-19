import React from 'react';
import hebrewLogo from '/assets/hebrew-logo.png';
import arabicLogo from '/assets/arabic-logo.png';
import { useUserLanguage } from '@/hooks/use-userlang';
import LangModal from './lang-modal';

const Header = () => {
    const { language } = useUserLanguage();
    const logo = language === 'he' ? hebrewLogo : arabicLogo;

    return (
        <>
        <div className='w-full  h-[50px] md:h-[100px] flex items-center justify-end'>
            <img src={logo} alt="logo" className='max-h-full max-w-full' />
        </div>
        <LangModal/>
        </>
    );
};

export default Header;
