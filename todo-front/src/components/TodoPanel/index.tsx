import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { Todo } from '../../domain/Todo';
import { NewTaskName, TodoCard } from '../TodoCard';

type TodoPanelProps = {
    todos: Array<Todo>,
    header?: string,
    onAdd?:(todo:Todo) => void,
    onRemove?: (id: number) => void,
    onUpdate?: (todo: Todo) => void 
};

export const TodoPanel: React.FC<TodoPanelProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { todos, header = 'Todo List' } = props;
    const { onAdd = todo => {}, onRemove = todo => {}, onUpdate = todo => {} } = props;
    const [ todoCards, setTodoCards ] = useState(Array<JSX.Element>());

    const addTodo = () => {
        onAdd(new Todo({id: 0, task: NewTaskName}));
    };

    const removeTodo = (id: number) => {
        onRemove(id);
    }

    const renderTodoCard = (todo: Todo) => (
        <TodoCard 
            key={todo.id} 
            className='my-2' 
            todoId={todo.id} 
            task={todo.task} 
            done={todo.done} 
            onUpdate={onUpdate}
            onRemove={removeTodo} 
        />);

    useEffect(() => {
        setTodoCards(todos.map(e => renderTodoCard(e)));
    }, [todos]);

    return (
        <>
        <div className='w-80 m-3'>
            <div className='border-b flex'>
                <div className='ml-1 grow'>{header} ({todos.length})</div>
                <div className='mr-1 flex-none'>
                    <PlusCircleIcon className='h-5 w-5 text-green-500 cursor-pointer' onClick={() => addTodo()}/>
                </div>
            </div>
            <div>
                {todoCards}
            </div>
        </div>
        </>
    );
};
