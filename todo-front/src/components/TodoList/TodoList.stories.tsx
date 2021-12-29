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
  user: "User name",
  todos: [ {task: "task 1", done: true} , {task: "task 2", done: false} , {task: "task 3"} ]
};