import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Todo } from '.';

export default {
  title: 'Todo',
  component: Todo,
} as ComponentMeta<typeof Todo>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Todo> = (args) => <Todo {...args} />;

export const Default = Template.bind({});

Default.args = {
  task: "Task name",
  done: true,
};