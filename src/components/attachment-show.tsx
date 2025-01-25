import React, {useCallback} from "react";
import { utils } from "collect-ui/dist/collect-ui.es.js"
// import { utils } from "collect-ui/src/index"
import {Image} from "antd"
import Player from "./player"
import getFileType from "../utils/getFileType";
import getFileName from "../utils/getFileName";
import DocxViewer from "./docx-preview";

export default function AttachmentShow(props) {
    const{attachment_prop,finish_action,uploadConfig,placeholder,...rest}=props
    const {visible,path,...newProps} = utils.transferProp(rest, "attachment-show")
    const show = utils.getVisible(props)
    if(!show) {
        return null
    }
    const shortenedFileName = getFileName(path)
    const fileType = getFileType(shortenedFileName)
    return (
        <>
            {fileType=='image'&&<Image {...newProps} src={path}/>}
            {(fileType=='video'||fileType=='audio')&&<Player {...newProps} controls url={path}/>}
            {fileType=='word' &&  <DocxViewer url={path} {...newProps}/>}
        </>
    )
}
