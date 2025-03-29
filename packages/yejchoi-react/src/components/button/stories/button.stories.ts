import type { Meta, StoryObj } from '@storybook/react';
import Button from "../Button.tsx";



const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    label: 'Click Me',
    size: 'md',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Default Button',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const CustomSized: Story = {
  args: {
    label: 'Custom Size',
    width: '200px',
    height: '50px',
    size: "lg"
  },
};