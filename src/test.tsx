// App.tsx
import React from 'react';
import { DragDropContextWrapper, DroppableList, DraggableItem } from './DragDropComponents';
import { DropResult } from 'react-beautiful-dnd';

const getItems = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

const reorder = (list: { id: string; content: string }[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const onDragEnd = (result: DropResult, items: { id: string; content: string }[], setItems: React.Dispatch<React.SetStateAction<{ id: string; content: string }[]>>) => {
    if (!result.destination) {
        return;
    }

    const newItems = reorder(
        items,
        result.source.index,
        result.destination.index
    );

    setItems(newItems);
};

const App: React.FC = () => {
    const [items, setItems] = React.useState(getItems(10));

    return (
        <DragDropContextWrapper onDragEnd={(result) => onDragEnd(result, items, setItems)}>
            <div style={{ height: '300px', border: '1px solid #ccc', padding: '10px' }}>
                <DroppableList droppableId="droppable">
                    {items.map((item, index) => (
                        <DraggableItem key={item.id} item={item} index={index} />
                    ))}
                </DroppableList>
            </div>
        </DragDropContextWrapper>
    );
};

export default App;