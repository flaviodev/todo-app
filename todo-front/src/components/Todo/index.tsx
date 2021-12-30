import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { TrashIcon } from '@heroicons/react/outline';

export type TodoProps = {
    taskId: number,
    task: string,
    done?: boolean,
    onSave?: (id: number) => void,
    onDelete?: (id: number) => void
};

export const Todo: React.FC<TodoProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    
    const { taskId, task } = props;
    const done = props.done ? props.done : false;
    const onDelete = props.onDelete ? props.onDelete : (id: number) => { console.log('Todo:onDelete not implemented')};
    const onSave = props.onSave ? props.onSave : (id: number) => { console.log('Todo:onSave not implemented')};

    const [checked, setChecked] = useState(done);
    const [taskValue, setTaskValue] = useState(task);
    const [editing, setEditing] = useState(false);
    const [truncated, setTruncated] = useState(false);

    const taskInput: React.LegacyRef<HTMLInputElement> = React.createRef();
    const taskLabel: React.LegacyRef<HTMLSpanElement> = React.createRef();

    const checkTruncate = () => {
        let offsetWidth = taskLabel.current?.offsetWidth ? taskLabel.current?.offsetWidth : 0;
        let scrollWidth = taskLabel.current?.scrollWidth ? taskLabel.current?.scrollWidth : 0;

        scrollWidth > offsetWidth ? setTruncated(true) : setTruncated(false);
    };

    useEffect(() => {
        setChecked(done)
    }, [done]);

    useEffect(() => {
        setTaskValue(task)
    }, [task]);

    useEffect(() => {
        checkTruncate();
    }, [taskValue]);

    useEffect(() => {
        checkTruncate();
        if(editing) taskInput.current?.focus();
    }, [editing]);

    return (
    <>
        <div className={`w-80 h-8 items-center rounded-lg shadow-lg border flex ${props.className}`}>
            <input 
                className='min-h-5 min-w-5 mx-1 accent-blue-500/25 cursor-pointer flex-none'         
                type='checkbox' 
                checked={checked}
                onChange={() => setChecked(!checked)}
            />

            {!editing ? (
                <span 
                    data-tip 
                    data-for={`todoTooltip-${taskId}`} 
                    className={`truncate ${checked ? 'line-through' : ''} mx-1 grow`}
                    onClick={() => setEditing(true)}
                    ref={taskLabel}
                >
                    {taskValue}
                </span>
            ) : (
                <input 
                    className='mx-1 grow'
                    type='text'
                    value={taskValue}
                    onChange={(event) => {setTaskValue(event.target.value)}}
                    onBlur={() => setEditing(false)}
                    onFocus={(event) => event.currentTarget.select()}
                    ref={taskInput}
                    onKeyPress={(event) => { if(event.key === 'Enter') event.currentTarget.blur() }}
                />
            )}

            <span className='flex-none mx-1'>
                <TrashIcon className='h-5 w-5 text-red-400 cursor-pointer' onClick={() => onDelete(taskId) }/>
            </span>
        </div>

        {!editing && truncated && (
            <ReactTooltip id={`todoTooltip-${taskId}`} place='bottom' effect='solid'>
                {taskValue}
            </ReactTooltip>
        )}
    </>
    );
}; 
