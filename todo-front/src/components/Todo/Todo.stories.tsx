import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Todo } from '.';

export default {
  title: 'Todo',
  component: Todo,
} as ComponentMeta<typeof Todo>;

const TodoTemplate: ComponentStory<typeof Todo> = (args) => <Todo {...args} />;

export const Default = TodoTemplate.bind({});

Default.args = {
  task: "Task name",
  done: true,
};