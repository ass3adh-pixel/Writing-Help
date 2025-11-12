
import React, { useState } from 'react';
import { Tool, AnalysisResult, PlagiarismResult, PlagiarismSource, SummarizationResult, AIDetectionResult } from '../types';
import { LoaderIcon, WritingIllustration, WarningIcon, LinkIcon, CopyIcon, ReplaceIcon, CheckIcon, PencilIcon } from './Icons';
import AdPlaceholder from './AdPlaceholder';

declare global {
    interface Window {
        marked: {
            parse: (markdown: string) => string;
        };
    }
}

interface ResultsDisplayProps {
    isLoading: boolean;
    error: string | null;
    result: AnalysisResult;
    activeTool: Tool;
    setInputText: (text: string) => void;
    analyzedText: string | null;
}

const HighlightedText: React.FC<{
    text: string;
    sources: PlagiarismSource[];
    onSnippetClick: (index: number) => void;
    selectedIndex: number | null;
}> = ({ text, sources, onSnippetClick, selectedIndex }) => {
    if (!sources || sources.length === 0) {
        return <p className="whitespace-pre-wrap">{text}</p>;
    }

    const snippetMap = new Map<string, number>();
    sources.forEach((source, index) => {
        if (source.originalTextSnippet) {
            snippetMap.set(source.originalTextSnippet.trim(), index);
        }
    });

    const snippets = Array.from(snippetMap.keys()).sort((a, b) => b.length - a.length);
    if (snippets.length === 0) {
        return <p className="whitespace-pre-wrap">{text}</p>;
    }

    const regex = new RegExp(`(${snippets.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    const parts = text.split(regex).filter(Boolean);

    return (
        <p className="whitespace-pre-wrap">
            {parts.map((part, i) => {
                const sourceIndex = snippetMap.get(part.trim());
                if (sourceIndex !== undefined) {
                    return (
                        <mark
                            key={i}
                            onClick={() => onSnippetClick(sourceIndex)}
                            className={`rounded px-1 cursor-pointer transition-all duration-300 ${
                                selectedIndex === sourceIndex
                                    ? 'bg-indigo-300 dark:bg-indigo-700 ring-2 ring-indigo-500'
                                    : 'bg-yellow-200/60 hover:bg-yellow-300/80 dark:bg-yellow-700/50 dark:hover:bg-yellow-600/70'
                            }`}
                        >
                            {part}
                        </mark>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </p>
    );
};

const PlagiarismView: React.FC<{ result: PlagiarismResult; analyzedText: string; setInputText: (text: string) => void; }> = ({ result, analyzedText, setInputText }) => {
    const [selectedSourceIndex, setSelectedSourceIndex] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(analyzedText);
    
    const similarity = Math.round(result.similarity);
    const color = similarity > 50 ? 'red' : similarity > 20 ? 'yellow' : 'indigo';

    const handleSnippetClick = (index: number) => {
        setSelectedSourceIndex(index);
        const element = document.getElementById(`source-item-${index}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedText(analyzedText); // Reset changes
    };

    const handleUpdateText = () => {
        setInputText(editedText);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border dark:border-slate-700">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">ملخص فحص الانتحال</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{result.summary}</p>
                </div>
                <div className="flex items-center flex-col gap-2">
                    <div className="relative w-28 h-28">
                         <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                className="text-slate-200 dark:text-slate-600"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="currentColor" strokeWidth="3.5"
                            />
                            <path
                                className={`transition-all duration-1000 ease-out ${
                                    color === 'red' ? 'text-red-500' :
                                    color === 'yellow' ? 'text-yellow-500' : 'text-indigo-500'
                                }`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="currentColor" strokeWidth="3.5"
                                strokeDasharray={`${similarity}, 100`} strokeLinecap="round" transform="rotate(-90 18 18)"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-slate-800 dark:text-slate-100">{similarity}%</div>
                    </div>
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-300">نسبة التشابه</span>
                </div>
            </div>

            {analyzedText && result.sources && result.sources.length > 0 && (
                <div>
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-semibold text-slate-800 dark:text-white">
                            {isEditing ? 'تعديل النص' : 'النص المُحلل (اضغط على الأجزاء المظللة للمقارنة)'}
                        </h4>
                        {!isEditing && (
                            <button
                                onClick={handleEditClick}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900 transition-colors"
                            >
                                <PencilIcon />
                                <span>تعديل</span>
                            </button>
                        )}
                    </div>
                     <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 max-h-60 overflow-y-auto text-base leading-relaxed">
                        {isEditing ? (
                            <textarea
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                className="w-full h-full bg-transparent border-0 p-0 focus:ring-0 resize-none text-slate-800 dark:text-slate-200"
                                style={{ minHeight: '180px' }}
                                autoFocus
                            />
                        ) : (
                            <HighlightedText
                                text={analyzedText}
                                sources={result.sources}
                                onSnippetClick={handleSnippetClick}
                                selectedIndex={selectedSourceIndex}
                            />
                        )}
                    </div>
                    {isEditing && (
                        <div className="flex items-center gap-3 mt-4">
                            <button
                                onClick={handleUpdateText}
                                className="flex-grow flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <ReplaceIcon />
                                <span>تحديث النص الأصلي</span>
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors"
                            >
                                <span>إلغاء</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {result.sources && result.sources.length > 0 && (
                <div>
                    <h4 className="text-md font-semibold text-slate-800 dark:text-white mb-3">المصادر المتطابقة</h4>
                    <ul className="space-y-3">
                        {result.sources.map((source, index) => (
                            <li key={index} id={`source-item-${index}`} className={`bg-slate-50 dark:bg-slate-800/60 rounded-lg border transition-all duration-300 ${selectedSourceIndex === index ? 'border-indigo-500 ring-2 ring-indigo-500/50' : 'border-slate-200 dark:border-slate-600'}`}>
                                <div className="p-4 cursor-pointer" onClick={() => setSelectedSourceIndex(prev => prev === index ? null : index)}>
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-500 hover:underline flex items-center gap-1.5 break-all flex-1 min-w-[200px]">
                                            <LinkIcon />
                                            <span>{source.url}</span>
                                        </a>
                                        <div className="flex items-center gap-4 flex-shrink-0">
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                ثقة: <strong>{Math.round(source.confidenceScore * 100)}%</strong>
                                            </span>
                                            <span className={`text-sm font-bold ${
                                              source.percentage > 50 ? 'text-red-500' :
                                              source.percentage > 20 ? 'text-yellow-500' : 'text-indigo-500'
                                            }`}>{Math.round(source.percentage)}% تطابق</span>
                                        </div>
                                    </div>
                                </div>
                                {selectedSourceIndex === index && (
                                    <div className="px-4 pb-4 mt-2 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">من النص الأصلي</h5>
                                            <blockquote className="border-r-4 border-yellow-400 dark:border-yellow-600 pr-3 text-sm text-slate-600 dark:text-slate-300 italic">
                                               "{source.originalTextSnippet}"
                                            </blockquote>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">من المصدر</h5>
                                            <blockquote className="border-r-4 border-indigo-400 dark:border-indigo-600 pr-3 text-sm text-slate-600 dark:text-slate-300 italic">
                                                "{source.text}"
                                            </blockquote>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


const getToolTitle = (tool: Tool): string => {
    switch (tool) {
        case Tool.Paraphrase:
            return 'النص المعاد صياغته';
        case Tool.Summarize:
            return 'الملخص';
        case Tool.Grammar:
            return 'التدقيق النحوي والإملائي';
        case Tool.AIDetector:
            return 'نتيجة كاشف الذكاء الاصطناعي';
        default:
            return 'النتيجة';
    }
};

const GenericResultView: React.FC<{
    content: string;
    tool: Tool;
    onReplaceText: (text: string) => void;
}> = ({ content, tool, onReplaceText }) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
    const safeContent = typeof content === 'string' ? content : '';

    const getCleanText = (markdownOrPlainText: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = window.marked ? window.marked.parse(markdownOrPlainText) : markdownOrPlainText.replace(/\n/g, '<br />');
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const handleCopy = () => {
        const textToCopy = getCleanText(safeContent);
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const handleReplace = () => {
        const textToReplace = getCleanText(safeContent);
        onReplaceText(textToReplace);
    };
    
    const htmlContent = window.marked ? window.marked.parse(safeContent) : safeContent.replace(/\n/g, '<br />');

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{getToolTitle(tool)}</h3>
                <div className="flex items-center gap-2">
                    {(tool === Tool.Paraphrase || tool === Tool.Summarize) && (
                         <button
                            onClick={handleReplace}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors border border-slate-300 dark:border-slate-600"
                        >
                            <ReplaceIcon />
                            <span>استبدال</span>
                        </button>
                    )}
                    <button
                        onClick={handleCopy}
                        className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors ${
                            copyStatus === 'copied' 
                            ? 'bg-green-600' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                        disabled={copyStatus === 'copied'}
                    >
                        {copyStatus === 'copied' ? <CheckIcon /> : <CopyIcon />}
                        <span>{copyStatus === 'copied' ? 'تم النسخ' : 'نسخ'}</span>
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto bg-slate-100/50 dark:bg-slate-800/50 p-4 rounded-lg border dark:border-slate-700">
                 <div
                    className="prose dark:prose-invert max-w-none prose-base prose-p:my-2 prose-ul:my-2 prose-li:my-1"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
        </div>
    );
};

const SummarizationView: React.FC<{
    result: SummarizationResult;
    onReplaceText: (text: string) => void;
}> = ({ result, onReplaceText }) => {
    const { summaryText, reductionPercentage } = result;

    return (
        <div className="flex flex-col h-full">
            <div className="mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700">
                <h4 className="text-md font-semibold text-indigo-800 dark:text-indigo-200">نسبة التلخيص</h4>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{Math.round(reductionPercentage)}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">تم تقليل حجم النص الأصلي بهذه النسبة.</p>
            </div>
            <div className="flex-grow">
                 <GenericResultView
                    content={summaryText}
                    tool={Tool.Summarize}
                    onReplaceText={onReplaceText}
                 />
            </div>
        </div>
    );
};

const AIDetectionView: React.FC<{ result: AIDetectionResult }> = ({ result }) => {
    const { humanPercentage, aiPercentage, explanation } = result;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 pb-3 border-b border-slate-200 dark:border-slate-700">نتيجة كاشف الذكاء الاصطناعي</h3>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border dark:border-slate-700">
                <div className="mb-4">
                    <div className="flex justify-between items-center text-sm font-semibold mb-2">
                        <span className="text-green-600 dark:text-green-400">محتوى بشري</span>
                        <span className="text-purple-600 dark:text-purple-400">محتوى ذكاء اصطناعي</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8 flex overflow-hidden">
                        <div 
                            className="bg-green-500 h-8 flex items-center justify-center text-white font-bold transition-all duration-1000 ease-out" 
                            style={{ width: `${humanPercentage}%` }}
                        >
                            {humanPercentage > 10 && `${Math.round(humanPercentage)}%`}
                        </div>
                        <div 
                            className="bg-purple-500 h-8 flex items-center justify-center text-white font-bold transition-all duration-1000 ease-out" 
                            style={{ width: `${aiPercentage}%` }}
                        >
                            {aiPercentage > 10 && `${Math.round(aiPercentage)}%`}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                        يبدو أن هذا النص على الأرجح <span className={humanPercentage >= aiPercentage ? 'text-green-600' : 'text-purple-600'}>
                            {humanPercentage >= aiPercentage ? 'مكتوب بواسطة إنسان' : 'مولّد بالذكاء الاصطناعي'}
                        </span>.
                    </p>
                </div>
            </div>

            <div>
                <h4 className="text-md font-semibold text-slate-800 dark:text-white mb-2">
                    تحليل النموذج
                </h4>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        {explanation}
                    </p>
                </div>
            </div>
        </div>
    );
};


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, result, activeTool, setInputText, analyzedText }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <LoaderIcon className="w-12 h-12" />
                <p className="mt-4 text-lg">...جاري تحليل النص</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-500">
                <WarningIcon />
                <p className="mt-4 text-lg font-semibold">حدث خطأ</p>
                <p className="text-sm text-center">{error}</p>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 p-8 text-center">
                <WritingIllustration />
                <p className="mt-6 text-xl font-semibold text-slate-600 dark:text-slate-400">النتائج ستظهر هنا</p>
                <p className="text-base">أدخل نصًا في الجهة المقابلة واضغط على "تحليل النص" للبدء.</p>
            </div>
        );
    }

    const renderResult = () => {
        switch (activeTool) {
            case Tool.Plagiarism:
                return (
                    <PlagiarismView result={result as PlagiarismResult} analyzedText={analyzedText!} setInputText={setInputText} />
                );
            case Tool.Summarize:
                return <SummarizationView result={result as SummarizationResult} onReplaceText={setInputText} />;
            case Tool.Paraphrase:
            case Tool.Grammar:
                return <GenericResultView content={result as string} tool={activeTool} onReplaceText={setInputText} />;
            case Tool.AIDetector:
                return <AIDetectionView result={result as AIDetectionResult} />;
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex-grow min-h-0 overflow-y-auto pr-4 -mr-4">
                 {renderResult()}
            </div>
            <div className="flex-shrink-0 pt-4 pr-4">
                 <AdPlaceholder className="h-28" />
            </div>
        </div>
    );
};

export default ResultsDisplay;
