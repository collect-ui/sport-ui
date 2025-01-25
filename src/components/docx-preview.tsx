import React, { useEffect, useRef } from "react";
import { renderAsync } from "docx-preview";

const DocxPreview = ({ url, ...rest }) => {
    const previewRef = useRef(null);

    useEffect(() => {
        if (!url) return;

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                // 使用 docx-preview 渲染文件
                //@ts-ignore
                renderAsync(blob, previewRef.current, previewRef.current, {
                    className: "docx-preview",
                    inWrapper: true,
                    ignoreWidth: false,
                    ignoreHeight: false,
                    ignoreFonts: false,
                    breakPages: true,
                    ignoreLastRenderedPageBreak: true,
                }).then(()=>{
                    if (previewRef.current) {
                        previewRef.current.scrollTo(0, 0);
                    }
                });
            })
            .catch((error) => {
                console.error("文件加载失败:", error);
            });
    }, [url]);

    return (
        <div
            ref={previewRef}
            {...rest}
        ></div>
    );
};

export default DocxPreview;