import React from 'react';

interface AdPlaceholderProps {
    className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className = '' }) => {
    return (
        <div className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800/70 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center text-slate-500 dark:text-slate-400 ${className}`}>
            <div className="flex flex-col items-center">
                <span className="text-base font-semibold">مساحة إعلانية</span>
                <span className="text-xs mt-1 font-sans">Advertisement Placeholder</span>
            </div>
        </div>
    );
};

export default AdPlaceholder;
