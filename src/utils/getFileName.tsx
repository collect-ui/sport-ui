// 获取文件名
export default function getFileName(filePath) {
    if(!filePath){
        return ""
    }
    // 找到最后一个 '/' 的位置
    const lastSlashIndex = filePath.lastIndexOf("/");
    if (lastSlashIndex === -1) {
        // 如果没有找到 '/'，返回整个路径
        return filePath;
    }

    // 提取文件名
    const fileName = filePath.substring(lastSlashIndex + 1);
    return fileName;
}