
import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
    
    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
                        <LogoIcon />
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white mr-4">مساعد الكتابة الذكي</h1>
                    </div>
                    <nav>
                       <button className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700">
                         تسجيل الدخول
                       </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
