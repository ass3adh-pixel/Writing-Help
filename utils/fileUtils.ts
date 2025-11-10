
declare const mammoth: any;

export const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.name.endsWith('.docx')) {
        return extractTextFromDocx(file);
    } else if (file.type === "text/plain" || file.name.endsWith('.txt')) {
        return extractTextFromTxt(file);
    } else {
        throw new Error("Unsupported file format. Please upload a .docx or .txt file.");
    }
};

const extractTextFromDocx = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            if (event.target && event.target.result) {
                try {
                    const result = await mammoth.extractRawText({ arrayBuffer: event.target.result });
                    resolve(result.value);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error("Failed to read file"));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

const extractTextFromTxt = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target && typeof event.target.result === 'string') {
                resolve(event.target.result);
            } else {
                reject(new Error("Failed to read text file"));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};
