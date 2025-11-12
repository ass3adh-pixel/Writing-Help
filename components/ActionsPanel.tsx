
import React from 'react';
import { Tool } from '../types';
import { PlagiarismIcon, ParaphraseIcon, SummarizeIcon, GrammarIcon, AIDetectorIcon } from './Icons';

interface ActionsPanelProps {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
}

const tools = [
    { id: Tool.Plagiarism, name: 'فحص الانتحال', icon: <PlagiarismIcon /> },
    { id: Tool.Paraphrase, name: 'إعادة صياغة', icon: <ParaphraseIcon /> },
    { id: Tool.Summarize, name: 'تلخيص', icon: <SummarizeIcon /> },
    { id: Tool.Grammar, name: 'تدقيق نحوي', icon: <GrammarIcon /> },
    { id: Tool.AIDetector, name: 'كاشف الذكاء الاصطناعي', icon: <AIDetectorIcon /> },
];

const ActionsPanel: React.FC<ActionsPanelProps> = ({ activeTool, setActiveTool }) => {
    return (
        <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-900/50 rounded-lg p-1.5 mb-2 border border-slate-200 dark:border-slate-700 flex-wrap">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 text-center px-3 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                        activeTool === tool.id
                            ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
                    }`}
                >
                    {tool.icon}
                    <span>{tool.name}</span>
                </button>
            ))}
        </div>
    );
};

export default ActionsPanel;
