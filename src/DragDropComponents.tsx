// DragDropComponents.tsx
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// 类型定义
interface DragDropContextWrapperProps {
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
}

interface DroppableListProps {
    droppableId: string;
    children: React.ReactNode;
}

interface DraggableItemProps {
    item: { id: string; content: string };
    index: number;
}

// DragDropContextWrapper 组件
const DragDropContextWrapper: React.FC<DragDropContextWrapperProps> = ({ onDragEnd, children }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {children}
        </DragDropContext>
    );
};

// DroppableList 组件
const DroppableList: React.FC<DroppableListProps> = ({ droppableId, children }) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ height: '100%', overflowY: 'auto' }}
                >
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

// DraggableItem 组件
const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: 'none',
                        padding: 16,
                        margin: '0 0 8px 0',
                        backgroundColor: '#fafafa',
                        ...provided.draggableProps.style,
                    }}
                >
                    {item.content}
                </div>
            )}
        </Draggable>
    );
};

export { DragDropContextWrapper, DroppableList, DraggableItem };