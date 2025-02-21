'use client';

import { useState, DragEvent } from 'react';

interface Todo {
  id: number;
  text: string;
  list: 'A' | 'B';
}

export default function Case1() {
  // 各リストの Todo アイテム
  const initialTodosA: Todo[] = [
    { id: 1, text: 'Todo A1', list: 'A' },
    { id: 2, text: 'Todo A2', list: 'A' },
    { id: 3, text: 'Todo A3', list: 'A' }
  ];

  const initialTodosB: Todo[] = [
    { id: 4, text: 'Todo B1', list: 'B' },
    { id: 5, text: 'Todo B2', list: 'B' },
    { id: 6, text: 'Todo B3', list: 'B' }
  ];

  // ドロップ先として保持する各リストのアイテム
  const [droppedA, setDroppedA] = useState<Todo[]>([]);
  const [droppedB, setDroppedB] = useState<Todo[]>([]);

  // ドラッグ開始時に Todo の情報を dataTransfer にセットする
  const handleDragStart = (e: DragEvent<HTMLLIElement>, todo: Todo) => {
    e.dataTransfer.setData('application/json', JSON.stringify(todo));
    e.dataTransfer.effectAllowed = 'move';
  };

  // ドロップ時に、対象リストと Todo の list プロパティが一致するかチェック
  const handleDrop = (e: DragEvent<HTMLDivElement>, targetList: 'A' | 'B') => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      const todo: Todo = JSON.parse(data);
      if (todo.list === targetList) {
        if (targetList === 'A') {
          setDroppedA(prev => [...prev, todo]);
        } else {
          setDroppedB(prev => [...prev, todo]);
        }
      } else {
        alert(`この Todo アイテムは ${todo.list} 用です。こちらのリストにはドロップできません。`);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        ケース1：ドロップできるアイテムを制限する
      </h1>
      <div className="flex justify-between gap-4">
        {/* List A */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Todo List A</h2>
          <ul className="border border-gray-300 rounded p-2">
            {initialTodosA.map(todo => (
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
          <div
            onDrop={(e) => handleDrop(e, 'A')}
            onDragOver={handleDragOver}
            className="mt-4 p-4 border-2 border-dashed border-gray-400 rounded min-h-[100px]"
          >
            <h3 className="text-lg font-medium mb-2">ここにドロップ (List A)</h3>
            {droppedA.length > 0 && (
              <ul className="list-disc pl-5">
                {droppedA.map(item => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* List B */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Todo List B</h2>
          <ul className="border border-gray-300 rounded p-2">
            {initialTodosB.map(todo => (
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
          <div
            onDrop={(e) => handleDrop(e, 'B')}
            onDragOver={handleDragOver}
            className="mt-4 p-4 border-2 border-dashed border-gray-400 rounded min-h-[100px]"
          >
            <h3 className="text-lg font-medium mb-2">ここにドロップ (List B)</h3>
            {droppedB.length > 0 && (
              <ul className="list-disc pl-5">
                {droppedB.map(item => (
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
