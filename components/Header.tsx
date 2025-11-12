import React from 'react';
import { LogoIcon } from './Icons';

interface HeaderProps {
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center cursor-pointer" onClick={onLogoClick}>
                        <LogoIcon />
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white mr-4">مساعد الكتابة الذكي</h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
