import DropdownComp from './DropdownComp.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Dropdown',
  component: DropdownComp,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownComp>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

const list = [
  { id: 'draft', label: 'draft', style: 'bg-white border-1' },
  { id: 'completed', label: 'completed', style: 'bg-green-100 text-green-700' },
  { id: 'failed', label: 'failed', style: 'bg-red-100 text-red-600' },
];
export const Default: Story = {
  args: {
    list,
    label: 'Choose a status',
    disabled: false,
  },
};

export const Preselected: Story = {
  args: {
    list,
    modelValue: list[1],
  },
};

export const Disabled: Story = {
  args: {
    list,
    modelValue: null,
    disabled: true,
  },
};

export const PreselectedAndDisabled: Story = {
  args: {
    list,
    modelValue: list[1],
    disabled: true,
  },
};

export const SingleItem: Story = {
  args: {
    list: [{ id: '1', label: 'SINGLE OPTION' }],
    modelValue: null,
  },
};

export const EmptyList: Story = {
  args: {
    list: [],
    modelValue: null,
  },
};
