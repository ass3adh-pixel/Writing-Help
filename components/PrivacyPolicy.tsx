
import React, { useState } from 'react';

const PrivacyPolicy: React.FC = () => {
    const [language, setLanguage] = useState<'ar' | 'en'>('ar');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const content = {
        ar: {
            title: "سياسة الخصوصية",
            lastUpdated: "آخر تحديث: 25 يوليو 2024",
            sections: [
                {
                    title: "1. مقدمة",
                    content: "نحن ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي معلوماتك عند استخدامك لموقعنا وأدواتنا."
                },
                {
                    title: "2. البيانات التي نجمعها",
                    content: `
                        <ul class="list-disc list-inside space-y-2">
                            <li><strong>النصوص والملفات:</strong> نقوم بمعالجة النصوص والملفات التي تقوم بتحميلها لتقديم خدمات فحص الانتحال وأدوات الكتابة. لا نقوم بتخزين محتواك بشكل دائم أو استخدامه لتدريب نماذجنا بعد اكتمال التحليل.</li>
                            <li><strong>بيانات الاستخدام:</strong> قد نجمع معلومات حول كيفية تفاعلك مع خدماتنا (مثل الميزات المستخدمة) لتحسين تجربة المستخدم.</li>
                        </ul>
                    `
                },
                {
                    title: "3. كيف نستخدم بياناتك",
                    content: `
                        <ul class="list-disc list-inside space-y-2">
                            <li>لتقديم وتشغيل خدماتنا.</li>
                            <li>لتحسين وتخصيص خدماتنا.</li>
                            <li>للتواصل معك بشأن تحديثات الخدمة.</li>
                        </ul>
                    `
                },
                {
                    title: "4. مشاركة البيانات",
                    content: "نحن لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية. قد نشارك البيانات مع مزودي الخدمة (مثل Google Gemini API) لمعالجة طلباتك، وهم ملزمون تعاقديًا بحماية بياناتك."
                },
                {
                    title: "5. أمان البيانات",
                    content: "نستخدم تدابير أمنية قياسية في الصناعة لحماية بياناتك من الوصول غير المصرح به. يتم تشفير جميع الاتصالات بين متصفحك وخوادمنا."
                },
                {
                    title: "6. حقوقك",
                    content: "لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها أو حذفها. لأي استفسارات تتعلق بالخصوصية، يرجى الاتصال بنا."
                },
                {
                    title: "7. التغييرات على هذه السياسة",
                    content: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنعلمك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة."
                }
            ]
        },
        en: {
            title: "Privacy Policy",
            lastUpdated: "Last updated: July 25, 2024",
            sections: [
                {
                    title: "1. Introduction",
                    content: "We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website and tools."
                },
                {
                    title: "2. Data We Collect",
                    content: `
                        <ul class="list-disc list-inside space-y-2">
                            <li><strong>Texts and Files:</strong> We process the texts and files you upload to provide plagiarism checking and writing tool services. We do not permanently store your content or use it to train our models after the analysis is complete.</li>
                            <li><strong>Usage Data:</strong> We may collect information about how you interact with our services (e.g., features used) to improve user experience.</li>
                        </ul>
                    `
                },
                {
                    title: "3. How We Use Your Data",
                    content: `
                        <ul class="list-disc list-inside space-y-2">
                            <li>To provide and operate our services.</li>
                            <li>To improve and personalize our services.</li>
                            <li>To communicate with you about service updates.</li>
                        </ul>
                    `
                },
                {
                    title: "4. Data Sharing",
                    content: "We do not sell or share your personal information with third parties for marketing purposes. We may share data with service providers (like the Google Gemini API) to process your requests, who are contractually obligated to protect your data."
                },
                {
                    title: "5. Data Security",
                    content: "We use industry-standard security measures to protect your data from unauthorized access. All communication between your browser and our servers is encrypted."
                },
                {
                    title: "6. Your Rights",
                    content: "You have the right to access, correct, or delete your personal data. For any privacy-related inquiries, please contact us."
                },
                {
                    title: "7. Changes to This Policy",
                    content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page."
                }
            ]
        }
    };
    
    const currentContent = content[language];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-slate-600">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{currentContent.title}</h1>
                    <button onClick={toggleLanguage} className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline">
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

export default PrivacyPolicy;