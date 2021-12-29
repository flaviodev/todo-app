import React, { useState, useEffect } from 'react';
import { Todo, TodoProps } from '../Todo';
import { PlusCircleIcon } from '@heroicons/react/solid';


type TodoListProps = {
    todos: Array<TodoProps>,
};

export const TodoList: React.FC<TodoListProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [ todos, setTodos ] = useState(props.todos);
    const [ todoComponents, setTodoComponents ] = useState(Array<JSX.Element>());

    const renderTodo = (todo: TodoProps) => (
        <Todo 
            key={todo.taskId} 
            className='my-2' 
            taskId={todo.taskId} 
            task={todo.task} 
            done={todo.done} 
            onDelete={(id) => removeTodo(id)} 
        />);

    const addNewTodo = () => {
        setTodos(todos.concat({taskId: 0, task:"(New Task)"}));
    };

    const removeTodo = (id: number) => {
        let filtered = todos.filter(e => e.taskId !== id);
        setTodos(filtered);
    }

    useEffect(() => {
        setTodoComponents(todos.map(e => renderTodo(e)));
    }, [todos]);

    return (
        <>
        <div className='w-80'>
            <div className='border-b flex'>
                <div className='ml-1 grow'>Todo List</div>
                <div className='mr-1 flex-none'>
                    <PlusCircleIcon className='h-5 w-5 text-green-500 cursor-pointer' onClick={() => addNewTodo()}/>
                </div>
            </div>
            <div>
                {todoComponents}
            </div>
        </div>
        </>
    );
};
