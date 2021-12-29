import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TodoList } from '.';

export default {
  title: 'TodoList',
  component: TodoList,
} as ComponentMeta<typeof TodoList>;

const TodoListTemplate: ComponentStory<typeof TodoList> = (args) => <TodoList {...args} />;

export const Default = TodoListTemplate.bind({});

Default.args = {
  todos: [ {taskId: 1, task: "task 1", done: true} , {taskId: 2, task: "task 2", done: false} , {taskId: 3, task: "task 3"} ]
};