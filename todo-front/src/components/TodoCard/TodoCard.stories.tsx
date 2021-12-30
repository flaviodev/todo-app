import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TodoCard } from '.';

export default {
  title: 'TodoCard',
  component: TodoCard,
} as ComponentMeta<typeof TodoCard>;

const TodoCardTemplate: ComponentStory<typeof TodoCard> = (args) => <TodoCard {...args} />;

export const Default = TodoCardTemplate.bind({});

Default.args = {
  todoId: 1,
  task: 'Task name',
  done: true,
  onRemove: (id:number) => alert('Todo was removed'),
  onUpdate: (id:number) => alert('Todo was updated'),
};