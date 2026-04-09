

export const FileIcon = ({ fileName }: { fileName: string }) => {
    const ext = fileName.toLowerCase().split('.').pop() || '';

    if (ext === 'pdf') return <span className="mr-2">📄</span>;
    if (['ppt', 'pptx'].includes(ext)) return <span className="mr-2">📊</span>;
    if (['doc', 'docx'].includes(ext)) return <span className="mr-2">📝</span>;
    return <span className="mr-2">📎</span>;
};
