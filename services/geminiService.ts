import { PlagiarismResult, SummarizationResult, SummaryLength, AIDetectionResult } from '../types';

// دالة أساسية جديدة لاستدعاء الوسيط (serverless proxy) الخاص بنا
const callApiProxy = async (body: object) => {
    // هذا هو المسار الذي ستنشئه Netlify تلقائيًا لدالة الخادم الخاصة بنا
    const response = await fetch('/.netlify/functions/gemini-proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        // محاولة تحليل رسالة الخطأ من الخادم
        const errorData = await response.json().catch(() => ({ error: 'An unknown server error occurred.' }));
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
    }

    return response.json();
};

export const checkPlagiarism = async (text: string): Promise<PlagiarismResult> => {
    return callApiProxy({ tool: 'plagiarism', text });
};

export const paraphraseText = async (text: string): Promise<string> => {
    return callApiProxy({ tool: 'paraphrase', text });
};

export const summarizeText = async (text: string, length: SummaryLength): Promise<SummarizationResult> => {
    return callApiProxy({ tool: 'summarize', text, length });
};

export const checkGrammar = async (text: string): Promise<string> => {
    return callApiProxy({ tool: 'grammar', text });
};

export const detectAIText = async (text: string): Promise<AIDetectionResult> => {
    return callApiProxy({ tool: 'ai_detector', text });
};
