
export const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, string> = {
      pdf: "📄",
      doc: "📝", docx: "📝",
      xls: "📊", xlsx: "📊",
      ppt: "📊", pptx: "📊",
      zip: "📦", rar: "📦",
      mp3: "🎵", wav: "🎵",
      mp4: "🎬", avi: "🎬",
      txt: "📄",
      csv: "📊"
    };
    return iconMap[ext || ''] || "📁";
  };

export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };