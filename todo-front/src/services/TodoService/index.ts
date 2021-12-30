import { Todo } from "../../domain/Todo";
import { fetchGet, fetchUpdate, fetchDelete } from "../UseApi";

export const fetchTodos = async (onGetTodos: (todos: Array<Todo>) => void) => {
    fetchGet({ path: '/todos', onFetch: (json) => onGetTodos(Array<Todo>(...json)) });
};

export const patchTodo = async (todo: Todo) => {
    const payload = { task: todo.task, done: todo.done};
    fetchUpdate({ path: `/todos/${todo.id}`, method: 'PATCH', payload: payload, onFetch: (json) => {} });
};

export const postTodo = async (todo: Todo, onSuccess: (todo: Todo) => void) => {
    const payload = { task: todo.task, done: todo.done};
    fetchUpdate({ path: '/todos', method: 'POST', payload: payload, onFetch: (json) => onSuccess(json) });
};

export const deleteTodo = async (id: number) => {
    fetchDelete({ path: `/todos/${id}`});
};