import React from 'react';

const Hero: React.FC = () => {
    const scrollToApp = () => {
        document.getElementById('main-app')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="text-center py-16 md:py-24 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 dark:text-white mb-4 leading-tight">
                أطلق العنان لإبداعك في الكتابة
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
                أداتك المتكاملة لفحص الانتحال، إعادة الصياغة، التلخيص، والتدقيق النحوي. مدعومة بقوة الذكاء الاصطناعي من Gemini.
            </p>
            <button
                onClick={scrollToApp}
                className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                ابدأ الآن مجانًا
            </button>
        </div>
    );
};

export default Hero;
