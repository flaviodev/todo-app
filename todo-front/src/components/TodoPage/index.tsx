import React, { useState, useEffect } from 'react';
import { Todo } from '../../domain/Todo';
import { deleteTodo, fetchTodos, patchTodo, postTodo } from '../../services/TodoService';
import { TodoPanel } from '../TodoPanel';

type TodoPageProps = {};

export const TodoPage: React.FC<TodoPageProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [todos, setTodos] = useState(Array<Todo>());

    const add = (todo: Todo) => {
      postTodo(todo, todo => setTodos(todos.concat(todo)));
    };

    const remove = (id: number) => {
      deleteTodo(id);
      setTodos(todos.filter(e => e.id !== id));
    };

    const update = (todo: Todo) => {
      patchTodo(todo);
    };

    useEffect(() => {
      fetchTodos((todos) => setTodos(todos));
    }, []);

    return (
      <div>
        <TodoPanel todos={todos} onAdd={add} onUpdate={update} onRemove={remove} />
      </div>
    );
}
