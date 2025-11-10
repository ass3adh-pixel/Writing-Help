
import React, { useRef } from 'react';
import { UploadIcon } from './Icons';

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        onFileSelect(file);
        event.target.value = ''; // Reset input to allow re-uploading the same file
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".docx,.txt"
            />
            <button
                onClick={handleClick}
                className="w-full sm:w-auto bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
            >
                <UploadIcon />
                <span>تحميل ملف</span>
            </button>
        </>
    );
};

export default FileUpload;