import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TodoPanel } from '.';
import { Todo } from '../../domain/Todo';

export default {
  title: 'TodoPanel',
  component: TodoPanel,
} as ComponentMeta<typeof TodoPanel>;

const TodoPanelTemplate: ComponentStory<typeof TodoPanel> = (args) => <TodoPanel {...args} />;

export const Default = TodoPanelTemplate.bind({});

Default.args = {
  todos:  [ new Todo({id: 1, task: 'Task 1'}) , new Todo({id: 2, task: 'Task 2', done: true}) , new Todo({id: 3, task: 'Task Test with a lot of chars to show in the card space'}) ], 
};