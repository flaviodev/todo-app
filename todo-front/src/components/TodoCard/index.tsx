import React, { useState, useCallback, FocusEvent, KeyboardEvent, ChangeEvent } from 'react';
import ReactTooltip from 'react-tooltip';
import { TrashIcon } from '@heroicons/react/outline';
import { Todo } from '../../domain/Todo';

export type TodoCardProps = {
    todoId: number,
    task: string,
    done?: boolean,
    onUpdate?: (todo: Todo) => void,
    onRemove?: (todoId: number) => void,
};

export const NewTaskName = "New Task";

export const TodoCard: React.FC<TodoCardProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { todoId } = props;
    const [task, setTask] = useState(props.task)
    const [previousTask, setPreviousTask] = useState(props.task);
    const [done = false, setDone] = useState(props.done)
    const { onUpdate = todo => {} , onRemove = todo => {} } = props;
    const [isTaskTruncated, setTaskTruncated] = useState(false);

    const focusHandler = useCallback((event: FocusEvent<HTMLInputElement>) => {
        setTaskTruncated(false);
        event.currentTarget.select();
    }, []);

    const keyHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            event.currentTarget.blur()
        }
    }, []);

    const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.currentTarget.value)
    }, []);

    const blurHandler = useCallback((event: FocusEvent<HTMLInputElement>) => {
        let offsetWidth = event.target.offsetWidth ? event.target.offsetWidth : 0;
        let scrollWidth = event.target.scrollWidth ? event.target.scrollWidth : 0;

        scrollWidth > offsetWidth ? setTaskTruncated(true) : setTaskTruncated(false);

        if(event.target.value.trim().length > 0) {
            if(previousTask !== task) {
                setPreviousTask(task);
                onUpdate(new Todo({id: todoId, task: task, done: done}));
            }
        } else {
            setTask(previousTask);
        }
    }, [todoId, task, done, previousTask, onUpdate]);

    return (
    <>
        <div className={`w-80 h-8 items-center rounded-lg shadow-lg border flex ${props.className}`}>
            <input 
                className='min-h-5 min-w-5 mx-1 accent-blue-500/25 cursor-pointer flex-none'
                type='checkbox' 
                checked={done}
                onClick={() => setDone(!done)}
                onChange={() => onUpdate(new Todo({id: todoId, task: task, done: !done}))}
            />

            <input 
                value={task}
                data-tip 
                data-for={`todoTooltip-${todoId}`} 
                className={`truncate mx-1 grow ${done ? 'line-through' : ''}`}
                type='text'
                placeholder='Task name'
                onFocus={focusHandler}
                onKeyPress={keyHandler}
                onChange={changeHandler}
                onBlur={blurHandler}                    
                />

            <span className='flex-none mx-1'>
                <TrashIcon className='h-5 w-5 text-red-400 cursor-pointer' onClick={() => onRemove(todoId) }/>
            </span>
        </div>

        {isTaskTruncated && (
            <ReactTooltip id={`todoTooltip-${todoId}`} place='bottom' effect='solid'>
                {task}
            </ReactTooltip>
        )}
    </>
    );
};
