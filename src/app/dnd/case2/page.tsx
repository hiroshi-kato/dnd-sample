'use client';

import { useState, DragEvent } from 'react';

interface Todo {
  id: number;
  text: string;
}

export default function Case2() {
  // 各リストの Todo アイテム
  const [todos] = useState<Todo[]>([
    { id: 1, text: 'Todo A' },
    { id: 2, text: 'Todo B' },
    { id: 3, text: 'Todo C' }
  ]);
  const [droppedItems, setDroppedItems] = useState<Todo[]>([]);

  const handleDragStart = (e: DragEvent<HTMLLIElement>, todo: Todo) => {
    e.dataTransfer.setData('application/json', JSON.stringify(todo));
    e.dataTransfer.effectAllowed = 'move';

    // カスタムのドラッグイメージを作成
    const dragImage = document.createElement('div');
    dragImage.className = 'p-2 bg-black text-white rounded text-sm w-32 text-center';
    dragImage.innerText = `Dragging: ${todo.text}`;
    // 一時的にドキュメントに追加してドラッグイメージに設定
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, dragImage.offsetWidth / 2, dragImage.offsetHeight / 2);
    // ドラッグ開始直後に削除
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      const todo: Todo = JSON.parse(data);
      const newId = droppedItems.length > 0 ? Math.max(...droppedItems.map(item => item.id)) + 1 : 1;
      todo.id = newId;
      setDroppedItems(prev => [...prev, todo]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ケース2：ドラッグ中のアイテムを変更する</h1>
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Todo リスト</h2>
          <ul className="border border-gray-300 rounded p-2">
            {todos.map(todo => (
              <li
                key={todo.id}
                draggable
                onDragStart={(e) => handleDragStart(e, todo)}
                className="cursor-grab p-2 border-b border-gray-200 last:border-0"
              >
                {todo.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-xl font-semibold mb-2">ドロップ領域</h2>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="p-4 border-2 border-dashed border-gray-400 rounded min-h-[100px]"
          >
            <h3 className="text-lg font-medium mb-2">ここにドロップ</h3>
            {droppedItems.length > 0 && (
              <ul className="list-disc pl-5">
                {droppedItems.map(item => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
