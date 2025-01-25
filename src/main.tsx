import React from "react"
import ReactDOM from "react-dom/client"
//
// import {
//     Render,
//     setRegister,
//     getRegister
//
// } from "collect-ui/dist/collect-ui.es.js"
import {
    Render,
    setRegister,
    setAction,
    setPullDown,
    setFilter,
    setInitStoreType,

} from "collect-ui/dist/collect-ui.es.js"
import "collect-ui/dist/style.css"
import AppConfig from "../data/app.json"
// import AppConfig from "../data/designer/designer.json"
import Player from "./components/player"
import Attachment from "./components/attachment"
import AttachmentShow from "./components/attachment-show"
import getFileType from "./utils/getFileType";
import Chart from "./components/chart"
import HeartbeatValue from "./components/heartbeat-value";
import DragContainer from "./components/drag-container"
import Drag from "./components/drag"
import Drop from "./components/drop"
import coderPreview from "./components/coder-preview";
import UpdateScore from "./action/update-score"
import GradeList from "./store/grade-list";
import CodePreview from "./store/code-preview";
// 注册自定义组件,注册播放器
setRegister("player", Player)
// 注册附件上传和附件查看
setRegister("attachment", Attachment)
setRegister("attachment-show", AttachmentShow)
setRegister("heartbeat-value", HeartbeatValue)
// 注册echart
setRegister("chart",Chart)
// 注册拖拽
setRegister("drag-container",DragContainer)
setRegister("drag",Drag)
setRegister("drop",Drop,false)
// 设置代码预览
setRegister("coder-preview", coderPreview)
// 设置pull-down 组件
import attachmentList from "./pulldown/attachment-list";
setPullDown('attachment-list',attachmentList)
// 添加模板方法
setFilter("getFileType",getFileType)
// 更新分数
setAction("update-score",UpdateScore)
setInitStoreType('GradeList',GradeList)
setInitStoreType('CodePreview',CodePreview)


import panelList, { ContentReference } from "./store/panel-list"
import ssh from "./components/ssh"
import handlerPath from "./action/handlerPath"
// 注册panelList 类型的自定义模型，解决webshell 二维数组，第二级children 不能添加的问题
setInitStoreType("panelList", panelList)
setInitStoreType("contentReference", ContentReference)

// 注册自定义组件
setRegister("ssh", ssh)
// 注册自定义动作
setAction("handlerPath", handlerPath)


import "./index.scss"
function App() {
    return <Render {...AppConfig}></Render>
}
// import App from "./test"

ReactDOM.createRoot(document.getElementById("root")!).render(<App />)
