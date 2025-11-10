import React from 'react';
import { SummaryLength } from '../types';

interface SummarizeOptionsProps {
    selectedLength: SummaryLength;
    onLengthChange: (length: SummaryLength) => void;
}

const options: { id: SummaryLength; label: string }[] = [
    { id: 'short', label: 'قصير' },
    { id: 'medium', label: 'متوسط' },
    { id: 'long', label: 'طويل' },
    { id: 'bullet_points', label: 'نقاط' },
];

const SummarizeOptions: React.FC<SummarizeOptionsProps> = ({ selectedLength, onLengthChange }) => {
    return (
        <div className="transition-all duration-300 ease-in-out">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                طول الملخص المطلوب
            </label>
            <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-lg p-1 space-x-1 space-x-reverse border border-slate-200 dark:border-slate-700">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onLengthChange(option.id)}
                        className={`w-full text-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                            selectedLength === option.id
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SummarizeOptions;
