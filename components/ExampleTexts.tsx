
import React, { useState } from 'react';
import { Tool } from '../types';
import { LightbulbIcon, PlagiarismIcon, ParaphraseIcon, SummarizeIcon, GrammarIcon, AIDetectorIcon } from './Icons';

interface ExampleTextsProps {
    onUseExample: (text: string, tool: Tool) => void;
}

const examples = {
    [Tool.Plagiarism]: {
        name: 'فحص الانتحال',
        icon: <PlagiarismIcon />,
        text: 'تعتبر الطاقة الشمسية من أهم مصادر الطاقة المتجددة، حيث يتم تحويل ضوء الشمس إلى كهرباء إما مباشرة باستخدام الخلايا الكهروضوئية، أو بشكل غير مباشر باستخدام الطاقة الشمسية المركزة. وتستخدم أنظمة الطاقة الشمسية المركزة العدسات أو المرايا وأنظمة التتبع لتركيز مساحة كبيرة من ضوء الشمس في حزمة صغيرة.'
    },
    [Tool.Paraphrase]: {
        name: 'إعادة صياغة',
        icon: <ParaphraseIcon />,
        text: 'لقد كان للتطور التكنولوجي السريع تأثير بالغ الأهمية على الطريقة التي نتواصل بها وندير بها أعمالنا اليومية.'
    },
    [Tool.Summarize]: {
        name: 'تلخيص',
        icon: <SummarizeIcon />,
        text: 'يُعرف الذكاء الاصطناعي بأنه فرع من فروع علوم الكمبيوتر يهدف إلى إنشاء آلات ذكية قادرة على أداء مهام تتطلب عادةً الذكاء البشري، مثل التعلم والاستدلال وحل المشكلات والإدراك. تشمل تطبيقات الذكاء الاصطناعي مجموعة واسعة من المجالات، من محركات البحث على الإنترنت إلى السيارات ذاتية القيادة، ومن التشخيص الطبي إلى الألعاب الاستراتيجية. ومع استمرار تطور هذا المجال، من المتوقع أن يحدث ثورة في العديد من جوانب الحياة البشرية.'
    },
    [Tool.Grammar]: {
        name: 'تدقيق نحوي',
        icon: <GrammarIcon />,
        text: 'ذهب الطلاب اللي المدرسة صباحا. وكانو متحمسين لتعلم اشياء جديدة.'
    },
    [Tool.AIDetector]: {
        name: 'كاشف الذكاء الاصطناعي',
        icon: <AIDetectorIcon />,
        text: 'يمثل الذكاء الاصطناعي تحولاً نموذجياً في التكنولوجيا، حيث يقدم حلولاً مبتكرة عبر مختلف الصناعات ويعيد تشكيل مستقبل العمل والتفاعل البشري. إن قدرته على معالجة كميات هائلة من البيانات وتحديد الأنماط تمكن من اتخاذ قرارات أكثر استنارة وكفاءة.'
    }
};

const ExampleTexts: React.FC<ExampleTextsProps> = ({ onUseExample }) => {
    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Plagiarism);

    const handleUseClick = () => {
        onUseExample(examples[selectedTool].text, selectedTool);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:px-8 -mt-8 mb-8" id="examples-section">
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
                        <LightbulbIcon />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">لست متأكدًا من أين تبدأ؟</h2>
                        <p className="text-slate-600 dark:text-slate-300">جرب أحد هذه الأمثلة لترى كيف تعمل كل أداة.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
                    {Object.keys(examples).map(toolKey => {
                        const tool = toolKey as Tool;
                        return (
                            <button
                                key={tool}
                                onClick={() => setSelectedTool(tool)}
                                className={`flex items-center justify-center gap-2 text-center px-3 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                    selectedTool === tool
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {examples[tool].icon}
                                <span>{examples[tool].name}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 min-h-[120px] flex items-center">
                    <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed animate-fade-in-up-sm">
                        {examples[selectedTool].text}
                    </p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={handleUseClick}
                        className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        استخدام هذا المثال
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExampleTexts;
