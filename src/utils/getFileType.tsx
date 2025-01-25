// getFileType 根据文件扩展名返回文件类型
export default function getFileType(shortenedFileName) {
    if(!shortenedFileName){
        return "unknown"
    }
    // 找到最后一个 '.' 的位置
    const lastDotIndex = shortenedFileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
        // 如果没有找到 '.'，返回 "unknown"
        return "unknown";
    }

    // 提取文件扩展名
    const fileExtension = shortenedFileName.substring(lastDotIndex + 1).toLowerCase();

    // 根据文件扩展名判断文件类型
    switch (fileExtension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "svg":
        case "bmp":
        case "tiff":
        case "tif":
        case "webp":
        case "ico":
        case "heic":
        case "heif":
            return "image";
        case "mp4":
        case "avi":
        case "mov":
        case "mkv":
        case "flv":
        case "wmv":
        case "webm":
            return "video";
        case "mp3":
        case "wav":
        case "ogg":
        case "flac":
        case "aac":
        case "m4a":
            return "audio";
        case "txt":
        case "md":
        case "rtf":
        case "log":
        case "csv":
        case "tsv":
            return "text";
        case "pdf":
            return "pdf";
        case "doc":
        case "docx":
            return "word";
        case "xls":
        case "xlsx":
            return "excel";
        case "ppt":
        case "pptx":
            return "powerpoint";
        default:
            return fileExtension;
    }
}