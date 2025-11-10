
import React, { useState } from 'react';
import { LogoIcon, GoogleIcon, CloseIcon, UserIcon } from './Icons';
import { User } from '../types';

interface LoginViewProps {
    onLoginSuccess: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    const [showModal, setShowModal] = useState(false);

    const mockUsers: User[] = [
        { uid: '1', email: 'user.one@example.com', displayName: 'المستخدم الأول' },
        { uid: '2', email: 'user.two@example.com', displayName: 'المستخدم الثاني' },
        { uid: '3', email: 'another.user@example.com', displayName: 'مستخدم آخر' },
    ];
    
    const handleLogin = (user: User) => {
        onLoginSuccess(user);
        setShowModal(false);
    };

    const AccountModal = () => (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200 dark:border-slate-700 animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b dark:border-slate-700">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">اختر حسابًا</h2>
                    <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-2">
                    {mockUsers.map(user => (
                        <div 
                            key={user.uid} 
                            onClick={() => handleLogin(user)}
                            className="flex items-center gap-4 p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                                <UserIcon />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 dark:text-slate-100">{user.displayName}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                            </div>
                        </div>
                    ))}
                    <div className="p-3 mt-2 border-t dark:border-slate-700 text-center">
                        <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            استخدام حساب آخر
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            {showModal && <AccountModal />}
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 text-center">
                    <div className="flex justify-center mb-6">
                        <LogoIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">مساعد الكتابة الذكي</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8">
                        أطلق العنان لإبداعك مع أدوات الكتابة المدعومة بالذكاء الاصطناعي.
                    </p>

                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="w-full max-w-xs mx-auto flex items-center justify-center gap-3 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-xl hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <GoogleIcon />
                        <span>المتابعة باستخدام جوجل</span>
                    </button>

                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-8">
                        بالاستمرار، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
