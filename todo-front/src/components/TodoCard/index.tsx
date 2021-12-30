import React, { useState, useEffect } from 'react';
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
    const { todoId, task, done = false } = props;
    const { onUpdate = todo => {} , onRemove = todo => {} } = props;
    const [isDoneChecked, setDoneChecked] = useState(done);
    const [taskInputValue, setTaskInputValue] = useState(task);
    const [isTaskInputOnEdition, setTaskInputOnEdition] = useState(false);
    const [isTaskSpanTruncated, setTaskSpanTruncated] = useState(false);

    const taskInput: React.LegacyRef<HTMLInputElement> = React.createRef();
    const taskSpan: React.LegacyRef<HTMLSpanElement> = React.createRef();

    const checkIsTaskSpanTruncated = () => {
        let offsetWidth = taskSpan.current?.offsetWidth ? taskSpan.current?.offsetWidth : 0;
        let scrollWidth = taskSpan.current?.scrollWidth ? taskSpan.current?.scrollWidth : 0;

        scrollWidth > offsetWidth ? setTaskSpanTruncated(true) : setTaskSpanTruncated(false);
    };

    useEffect(() => {
        setDoneChecked(done);
    }, [done]);

    useEffect(() => {
        setTaskInputValue(task);
    }, [task]);

    useEffect(() => {
        checkIsTaskSpanTruncated();
    }, [taskInputValue]);

    useEffect(() => {
        checkIsTaskSpanTruncated();

        if(isTaskInputOnEdition) { 
            taskInput.current?.focus();
        } else {
            if(taskInputValue.trim().length == 0) 
                setTaskInputValue(NewTaskName);
        }

    }, [isTaskInputOnEdition]);

    return (
    <>
        <div className={`w-80 h-8 items-center rounded-lg shadow-lg border flex ${props.className}`}>
            <input 
                className='min-h-5 min-w-5 mx-1 accent-blue-500/25 cursor-pointer flex-none'         
                type='checkbox' 
                checked={isDoneChecked}
                onChange={() => {
                    setDoneChecked(!isDoneChecked);
                    onUpdate(new Todo({id: todoId, task: taskInputValue, done: !isDoneChecked}));
                }}
            />

            {!isTaskInputOnEdition ? (
                <span 
                    data-tip 
                    data-for={`todoTooltip-${todoId}`} 
                    className={`truncate ${isDoneChecked ? 'line-through' : ''} mx-1 grow`}
                    onClick={() => setTaskInputOnEdition(true)}
                    ref={taskSpan}
                >
                    {taskInputValue}
                </span>
            ) : (
                <input 
                    className='mx-1 grow'
                    type='text'
                    placeholder='New Task'
                    value={taskInputValue}
                    onChange={(event) => {setTaskInputValue(event.target.value)}}
                    onFocus={(event) => event.currentTarget.select()}
                    ref={taskInput}
                    onKeyPress={(event) => { if(event.key === 'Enter') event.currentTarget.blur() }}
                    onBlur={(event) => { 
                        setTaskInputOnEdition(false); 
                        onUpdate(new Todo({id: todoId, task: event.currentTarget.value, done: isDoneChecked}));
                    }}
                />
            )}

            <span className='flex-none mx-1'>
                <TrashIcon className='h-5 w-5 text-red-400 cursor-pointer' onClick={() => onRemove(todoId) }/>
            </span>
        </div>

        {!isTaskInputOnEdition && isTaskSpanTruncated && (
            <ReactTooltip id={`todoTooltip-${todoId}`} place='bottom' effect='solid'>
                {taskInputValue}
            </ReactTooltip>
        )}
    </>
    );
}; 
