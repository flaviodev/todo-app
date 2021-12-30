import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { Todo } from '../../domain/Todo';
import { NewTaskName, TodoCard } from '../TodoCard';

type TodoPanelProps = {
    header?: string,
    todos?: Array<Todo>,
};

export const TodoPanel: React.FC<TodoPanelProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { header = 'Todo List'} = props;
    const [ todos, setTodos ] = useState(props.todos ? props.todos : []);    
    const [ todoCards, setTodoCards ] = useState(Array<JSX.Element>());
    const [ data, setData ] = useState([]);

    const addTodo = () => {
        setTodos(todos.concat(new Todo({id: 0, task: NewTaskName})));
    };

    const removeTodo = (id: number) => {
        let filtered = todos.filter(e => e.id !== id);
        setTodos(filtered);
    }

    const updateTodo = (id: number) => {
        console.log('update todo');
    }

    const renderTodoCard = (todo: Todo) => (
        <TodoCard 
            key={todo.id} 
            className='my-2' 
            todoId={todo.id} 
            task={todo.task} 
            done={todo.done} 
            onUpdate={updateTodo}
            onRemove={removeTodo} 
        />);

    useEffect(() => {
        setTodoCards(todos.map(e => renderTodoCard(e)));
    }, [todos]);

    const fetchTodos = () => {
        fetch('/todos', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
             }
          })
          .then((response) => response.json())
          .then((result) => setTodos(Array<Todo>(...result)));
    }

    useEffect(() => {
        fetchTodos()
    },[])

    return (
        <>
        <div className='w-80'>
            <div className='border-b flex'>
                <div className='ml-1 grow'>{header} ({todos.length})</div>
                <div className='mr-1 flex-none'>
                    <PlusCircleIcon className='h-5 w-5 text-green-500 cursor-pointer' onClick={() => addTodo()}/>
                </div>
            </div>
            <div>
                {todoCards}
            </div>
            <div>
                <ul>
                    {data.map((e:any) => <li key={e.id}>{e.task}</li> )}
                </ul>
            </div>
        </div>
        </>
    );
};
