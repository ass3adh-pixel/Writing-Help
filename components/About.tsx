
import React, { useState } from 'react';

interface AboutProps {
    setCurrentView: (view: 'app' | 'about' | 'privacy') => void;
}

const About: React.FC<AboutProps> = ({ setCurrentView }) => {
    const [language, setLanguage] = useState<'ar' | 'en'>('ar');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    };
    
    const handlePrivacyLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentView('privacy');
    };

    const content = {
        ar: {
            title: "حول مساعد الكتابة الذكي",
            lastUpdated: "الإصدار 1.0",
            sections: [
                {
                    title: "1. مهمتنا",
                    content: "مهمتنا هي تمكين الكتّاب والطلاب والمهنيين العرب من خلال توفير مجموعة أدوات كتابة ذكية وقوية. نهدف إلى جعل عملية الكتابة أكثر كفاءة وإبداعًا وخالية من الأخطاء."
                },
                {
                    title: "2. كيف يعمل؟",
                    content: `
                        <p>هذا التطبيق مدعوم من <strong>Google Gemini</strong>، وهو أحد نماذج الذكاء الاصطناعي الأكثر تقدمًا في العالم. عند إدخال نص، نقوم بإرساله بشكل آمن إلى Gemini API لتحليله وفقًا للأداة التي اخترتها، ثم نعرض لك النتائج في الوقت الفعلي.</p>
                    `
                },
                {
                    title: "3. الميزات الرئيسية",
                    content: `
                        <ul class="list-disc list-inside space-y-2">
                            <li><strong>فحص الانتحال:</strong> يقارن النص بقواعد بيانات واسعة لتحديد أوجه التشابه المحتملة.</li>
                            <li><strong>إعادة الصياغة:</strong> يقترح طرقًا بديلة للتعبير عن أفكارك للحصول على وضوح وتأثير أفضل.</li>
                            <li><strong>التلخيص:</strong> يستخرج النقاط الرئيسية من النصوص الطويلة لتقديم ملخصات موجزة.</li>
                            <li><strong>التدقيق النحوي:</strong> يحدد ويصحح الأخطاء النحوية والإملائية وعلامات الترقيم.</li>
                        </ul>
                    `
                },
                {
                    title: "4. التزامنا بالخصوصية",
                    content: `نحن نأخذ خصوصيتك على محمل الجد. لا يتم تخزين النصوص التي تقوم بتحليلها أو استخدامها لتدريب نماذج الذكاء الاصطناعي. لمزيد من التفاصيل، يرجى الاطلاع على <a href="#" id="privacy-link-ar" class="text-indigo-500 hover:underline">سياسة الخصوصية</a> الخاصة بنا.`
                }
            ]
        },
        en: {
            title: "About The Smart Writing Assistant",
            lastUpdated: "Version 1.0",
            sections: [
                {
                    title: "1. Our Mission",
                    content: "Our mission is to empower Arabic writers, students, and professionals by providing a smart and powerful suite of writing tools. We aim to make the writing process more efficient, creative, and error-free."
                },
                {
                    title: "2. How It Works",
                    content: `
                        <p>This application is powered by <strong>Google Gemini</strong>, one of the world's most advanced AI models. When you enter text, we securely send it to the Gemini API to analyze it according to your chosen tool, then display the results for you in real-time.</p>
                    `
                },
                {
                    title: "3. Key Features",
                    content: `
                        <ul class="list-disc list-inside space-y-2">
                            <li><strong>Plagiarism Checking:</strong> Compares text against vast databases to identify potential similarities.</li>
                            <li><strong>Paraphrasing:</strong> Suggests alternative ways to express your ideas for better clarity and impact.</li>
                            <li><strong>Summarization:</strong> Extracts key points from long texts to provide concise summaries.</li>
                            <li><strong>Grammar Checking:</strong> Identifies and corrects grammatical, spelling, and punctuation errors.</li>
                        </ul>
                    `
                },
                {
                    title: "4. Our Commitment to Privacy",
                    content: `We take your privacy seriously. The texts you analyze are not stored or used to train AI models. For more details, please review our <a href="#" id="privacy-link-en" class="text-indigo-500 hover:underline">Privacy Policy</a>.`
                }
            ]
        }
    };
    
    // This effect is needed to attach the event listener after the component renders
    // because the link is inside a dangerouslySetInnerHTML.
    React.useEffect(() => {
        const linkAr = document.getElementById('privacy-link-ar');
        if (linkAr) {
            linkAr.addEventListener('click', handlePrivacyLinkClick as any);
        }
        const linkEn = document.getElementById('privacy-link-en');
        if (linkEn) {
            linkEn.addEventListener('click', handlePrivacyLinkClick as any);
        }

        return () => {
            if (linkAr) {
                linkAr.removeEventListener('click', handlePrivacyLinkClick as any);
            }
            if (linkEn) {
                linkEn.removeEventListener('click', handlePrivacyLinkClick as any);
            }
        };
    }, [language]);


    const currentContent = content[language];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-slate-600">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{currentContent.title}</h1>
                    <button onClick={toggleLanguage} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                        {language === 'ar' ? 'View in English' : 'عرض باللغة العربية'}
                    </button>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{currentContent.lastUpdated}</p>
                <div className="space-y-6 prose dark:prose-invert max-w-none">
                    {currentContent.sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{section.title}</h2>
                            <div className="text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: section.content }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
