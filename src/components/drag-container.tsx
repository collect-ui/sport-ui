import React from 'react';
import { utils } from "collect-ui/dist/collect-ui.es.js"
import { DragDropContext } from 'react-beautiful-dnd';
import { App} from "antd"
export default function dragContainer(props) {
    const { action,visible,children,...newProps} = utils.transferProp(props, "drag-container")
    const show = utils.getVisible(props)
    if(!show) {
        return null
    }
    const useApp = App.useApp()
    const onDragEnd = (result) => {
        console.log(result)
        if (action) {
            utils.handlerActions(action, props.store, props.rootStore, useApp, result)
        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div {...newProps}>
                {children}
            </div>
        </DragDropContext>
    )
}