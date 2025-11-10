
import React, { useMemo } from 'react';

interface TextAreaInputProps {
    value: string;
    onChange: (value: string) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ value, onChange }) => {
    const { wordCount, charCount } = useMemo(() => {
        const trimmedText = value.trim();
        const words = trimmedText ? trimmedText.split(/\s+/) : [];
        return {
            wordCount: words.length === 1 && words[0] === '' ? 0 : words.length,
            charCount: value.length,
        };
    }, [value]);

    return (
        <div className="flex flex-col flex-grow">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="الصق النص هنا أو قم بتحميل ملف..."
                className="w-full flex-grow p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 dark:bg-slate-700/50 text-base leading-relaxed resize-none min-h-[250px] sm:min-h-[300px]"
            />
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex justify-end gap-4">
                <span>الكلمات: {wordCount}</span>
                <span>الأحرف: {charCount}</span>
            </div>
        </div>
    );
};

export default TextAreaInput;
