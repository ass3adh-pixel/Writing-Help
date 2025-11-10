
import React, { useState, useCallback, useEffect } from 'react';
import { Tool, AnalysisResult, SummaryLength } from './types';
import * as geminiService from './services/geminiService';
import { extractTextFromFile } from './utils/fileUtils';
import Header from './components/Header';
import ActionsPanel from './components/ActionsPanel';
import TextAreaInput from './components/TextAreaInput';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import { LoaderIcon, ClearIcon } from './components/Icons';
import SummarizeOptions from './components/SummarizeOptions';
import Hero from './components/Hero';
import Footer from './components/Footer';


const App: React.FC = () => {
    const [activeTool, setActiveTool] = useState<Tool>(Tool.Plagiarism);
    const [inputText, setInputText] = useState<string>('');
    const [result, setResult] = useState<AnalysisResult>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentView, setCurrentView] = useState<'app' | 'about' | 'privacy'>('app');
    const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');
    const [analyzedText, setAnalyzedText] = useState<string | null>(null);
    
    useEffect(() => {
        setResult(null);
        setError(null);
        setAnalyzedText(null);
    }, [activeTool]);

    const handleFileSelect = useCallback(async (file: File | null) => {
        if (!file) return;
        setIsLoading(true);
        setError(null);
        setResult(null);
        setAnalyzedText(null);
        try {
            const text = await extractTextFromFile(file);
            setInputText(text);
        } catch (err) {
            setError('فشل في قراءة الملف. يرجى التأكد من أنه ملف DOCX أو TXT صالح.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!inputText.trim()) {
            setError('الرجاء إدخال نص أو تحميل ملف للمتابعة.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        setAnalyzedText(inputText);
        try {
            let apiResponse: AnalysisResult = null;
            switch (activeTool) {
                case Tool.Plagiarism:
                    apiResponse = await geminiService.checkPlagiarism(inputText);
                    break;
                case Tool.Paraphrase:
                    apiResponse = await geminiService.paraphraseText(inputText);
                    break;
                case Tool.Summarize:
                    apiResponse = await geminiService.summarizeText(inputText, summaryLength);
                    break;
                case Tool.Grammar:
                    apiResponse = await geminiService.checkGrammar(inputText);
                    break;
            }
            setResult(apiResponse);
        } catch (err: any) {
            setError(`حدث خطأ أثناء المعالجة: ${err.message}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [inputText, activeTool, summaryLength]);
    
    const handleClear = () => {
        setInputText('');
        setResult(null);
        setError(null);
        setAnalyzedText(null);
    };

    const MainAppView = () => (
      <div id="main-app" className="w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
                <ActionsPanel activeTool={activeTool} setActiveTool={setActiveTool} />
                
                {activeTool === Tool.Summarize && (
                    <SummarizeOptions
                        selectedLength={summaryLength}
                        onLengthChange={setSummaryLength}
                    />
                )}
                
                <TextAreaInput value={inputText} onChange={setInputText} />
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !inputText.trim() || (!!result && inputText === analyzedText)}
                        className="w-full sm:w-auto flex-grow bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {isLoading ? <LoaderIcon /> : null}
                        <span>{isLoading ? 'جاري التحليل...' : 'تحليل النص'}</span>
                    </button>
                    <FileUpload onFileSelect={handleFileSelect} />
                    <button
                        onClick={handleClear}
                        disabled={isLoading || (!inputText && !result && !error)}
                        className="w-full sm:w-auto bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ClearIcon />
                        <span>مسح</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col flex-grow bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 min-h-[500px] lg:min-h-0">
                    <ResultsDisplay
                        isLoading={isLoading}
                        error={error}
                        result={result}
                        activeTool={activeTool}
                        setInputText={setInputText}
                        analyzedText={analyzedText}
                    />
                </div>
            </div>
        </div>
      </div>
    );

    const renderCurrentView = () => {
        switch (currentView) {
            case 'about':
                return <About setCurrentView={setCurrentView} />;
            case 'privacy':
                return <PrivacyPolicy />;
            case 'app':
            default:
                return (
                    <>
                        <Hero />
                        <MainAppView />
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-slate-200">
            <Header />
            <main>
                {renderCurrentView()}
            </main>
            <Footer setCurrentView={setCurrentView} />
        </div>
    );
};

export default App;
