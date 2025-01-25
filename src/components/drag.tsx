import React from 'react';
import { utils } from "collect-ui/dist/collect-ui.es.js"
import {  Draggable } from 'react-beautiful-dnd';
export default function dragContainer(props) {
    const {visible,draggableId,children,...newProps} = utils.transferProp(props, "drag-container")
    const show = utils.getVisible(props)
    if(!show) {
        return null
    }
    const {index,...rest}=newProps
    const style=newProps.style||{}

    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) => (

                <div
                    ref={provided.innerRef}
                    {...rest}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...style,

                        ...provided.draggableProps.style,
                    }}
                >

                    {children}
                </div>
            )}
        </Draggable>
    )
}