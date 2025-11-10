import React, { useState } from 'react';
import { LogoIcon, GoogleIcon } from './Icons';
import { User } from '../types';

interface LoginViewProps {
    onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        setError(null);

        // This is a mock login to bypass environment restrictions
        // where real Firebase popups fail.
        setTimeout(() => {
            const demoUser: User = {
                uid: 'demo-user-id-123',
                email: 'demo@example.com',
                displayName: 'مستخدم تجريبي',
            };
            onLogin(demoUser);
            // No need to set isLoading(false) as the component will unmount
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md animate-fade-in-up">
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
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full max-w-xs mx-auto flex items-center justify-center gap-3 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-xl hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <GoogleIcon />
                        )}
                        <span>{isLoading ? 'جاري تسجيل الدخول...' : 'المتابعة باستخدام جوجل'}</span>
                    </button>
                    
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-8">
                        بالاستمرار، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginView;