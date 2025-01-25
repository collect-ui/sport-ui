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

import AppConfig from "../data/framework/training_dashboard.json"
import Player from "./components/player"
import Attachment from "./components/attachment"
import AttachmentShow from "./components/attachment-show"
import getFileType from "./utils/getFileType";
import Chart from "./components/chart"
import HeartbeatValue from "./components/heartbeat-value";
import DragContainer from "./components/drag-container"
import Drag from "./components/drag"
import Drop from "./components/drop"
import UpdateScore from "./action/update-score"
import GradeList from "./store/grade-list";
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
// 设置pull-down 组件
import attachmentList from "./pulldown/attachment-list";
setPullDown('attachment-list',attachmentList)
// 添加模板方法
setFilter("getFileType",getFileType)
// 更新分数
setAction("update-score",UpdateScore)
setInitStoreType('GradeList',GradeList)
import "./index.scss"
function App() {
    return <Render {...AppConfig}></Render>
}
// import App from "./test"

ReactDOM.createRoot(document.getElementById("root")!).render(<App />)
