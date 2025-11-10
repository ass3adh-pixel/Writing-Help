import React from 'react';

interface FooterProps {
    setCurrentView: (view: 'app' | 'about' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, view: 'app' | 'about' | 'privacy') => {
        e.preventDefault();
        setCurrentView(view);
        window.scrollTo(0, 0);
    };

    return (
        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-16">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
                <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-4">
                    <button onClick={(e) => handleNavClick(e, 'about')} className="text-base text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                        حول الأداة
                    </button>
                    <button onClick={(e) => handleNavClick(e, 'privacy')} className="text-base text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                        سياسة الخصوصية
                    </button>
                    <a href="mailto:support@example.com" className="text-base text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                        تواصل معنا
                    </a>
                </nav>
                <p className="text-center text-base text-slate-400 dark:text-slate-500">
                    &copy; {new Date().getFullYear()} مساعد الكتابة الذكي. جميع الحقوق محفوظة.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
