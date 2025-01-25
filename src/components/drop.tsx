import React from 'react';
import { utils } from "collect-ui/dist/collect-ui.es.js"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
export default function drop(props) {
    const {visible,droppableId,children,...newProps} = utils.transferProp(props, "drag-container")
    const show = utils.getVisible(props)
    if(!show) {
        return null
    }
    const { style,...rest}=newProps

    return (
        <Droppable {...rest} droppableId={droppableId}>
            {(provided) => (
                <div ref={provided.innerRef} style={style} {...provided.droppableProps} >
                    {children}
                    {provided.placeholder}
                </div>
                )}
      </Droppable>
    )
}