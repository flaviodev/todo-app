import React, { useState, useEffect, FunctionComponent} from 'react';
import { Todo, TodoProps } from '../Todo';

type TodoListProps = {
    user: string, 
    todos: Array<TodoProps>
};

export const TodoList: React.FC<TodoListProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { user, todos } = props;

    const todosComponents = todos?.map ( props => <Todo className='my-2' task={props.task} done={props.done} />);

    return (
        <>
        <div className="w-80">
            <div className='border-b'>{user}</div>
            <div>
                {todosComponents}
            </div>
        </div>
        </>
    );
};