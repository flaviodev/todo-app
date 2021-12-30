import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TodoCard } from '.';
import { Todo } from '../../domain/Todo';

export default {
  title: 'TodoCard',
  component: TodoCard,
} as ComponentMeta<typeof TodoCard>;

const TodoCardTemplate: ComponentStory<typeof TodoCard> = (args) => <TodoCard {...args} />;

export const Default = TodoCardTemplate.bind({});

Default.args = {
  todoId: 1,
  task: 'Task name',
  done: true
};