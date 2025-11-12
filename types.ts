
export enum Tool {
    Plagiarism = 'plagiarism',
    Paraphrase = 'paraphrase',
    Summarize = 'summarize',
    Grammar = 'grammar',
    AIDetector = 'ai_detector',
}

export type SummaryLength = 'short' | 'medium' | 'long' | 'bullet_points';

export interface PlagiarismSource {
    url: string;
    text: string;
    percentage: number;
    originalTextSnippet: string;
    confidenceScore: number;
}

export interface PlagiarismResult {
    similarity: number;
    sources: PlagiarismSource[];
    summary: string;
}

export interface SummarizationResult {
    summaryText: string;
    reductionPercentage: number;
}

export interface AIDetectionResult {
    humanPercentage: number;
    aiPercentage: number;
    explanation: string;
}

export type AnalysisResult = string | PlagiarismResult | SummarizationResult | AIDetectionResult | null;

// Fix: Add User interface for LoginView component
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
}
