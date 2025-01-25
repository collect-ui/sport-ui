import React, {useCallback} from "react";
import { utils } from "collect-ui/dist/collect-ui.es.js"
import {FaUpload} from "react-icons/fa"
import {Image, Input, Space, Button, Upload, App} from "antd"
import Player from "./player"
import getFileType from "../utils/getFileType";
import getFileName from "../utils/getFileName";

export default function attachment(props) {
    const{attachment_prop,finish_action,uploadConfig,placeholder,...rest}=props
    const {visible,...newProps} = utils.transferProp(rest, "attachment")
    const show = utils.getVisible(props)
    if(!show) {
        return null
    }
    const useApp = App.useApp()
    const apiObj = utils.toApiObj(uploadConfig.api)
    let formValue = {}
    // 平均api 的data
    if (apiObj.data) {
        for (let key in apiObj.data) {
            formValue[key] = apiObj.data[key]
        }
    }
    if (uploadConfig.data) {
        for (let key in uploadConfig.data) {
            const value = uploadConfig.data[key]
            formValue[key] = utils.varValue(value, props.store, newProps.target)
        }
    }
    const handleChange = useCallback((info) => {
        if (info.file.status === 'done') {
            console.log('上传成功后的返回数据:', info.file.response);
            if (finish_action) {
                utils.handlerActions(finish_action, props.store, props.rootStore, useApp, {row:info.file.response})
            }
        } else if (info.file.status === 'error') {
            useApp?.message?.error(`${info.file.name} 文件上传失败`);
        }
    }, []);
    const shortenedFileName = getFileName(props.value)
    const fileType = getFileType(shortenedFileName)
    const attachmentProp={

    }
    if(attachment_prop){
        for (let key in attachment_prop) {
            const value = attachment_prop[key]
            attachmentProp[key] = utils.varValue(value, props.store, {fileType:fileType})
        }
    }
    return (
        <>
            <Space.Compact style={{"width":"100%"}}>
                <Input value={props.value} onChange={props.onChange} placeholder={placeholder}></Input>
                <Upload {...uploadConfig}  onChange={handleChange} name="file" action={apiObj.url} data={(file)=>{return formValue}}>
                    <Button icon={<FaUpload/>} type="primary">上传</Button>
                </Upload>
            </Space.Compact>
            {fileType=='image'&&<Image {...attachmentProp} src={props.value}/>}
            {(fileType=='video'||fileType=='audio')&&<Player {...attachmentProp} controls url={props.value}/>}
        </>
    )
}
