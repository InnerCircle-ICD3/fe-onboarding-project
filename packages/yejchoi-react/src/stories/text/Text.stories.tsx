// src/components/Text/Text.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import Text from './Text';

const meta: Meta<typeof Text> = {
    title: 'Components/Text',
    component: Text,
    argTypes: {
        weight: {
            control: { type: 'select' },
            options: ['regular', 'medium', 'bold', 'extraBold'],
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
        },
        color: {
            control: { type: 'select' },
            options: ['primary', 'title', 'main', 'sub', 'white', 'red'],
        },
        align: {
            control: { type: 'radio' },
            options: ['left', 'center', 'right'],
        },
        children: {
            control: { type: 'text' },
        },
    },
    args: {
        children: 'Hello, Text!',
        weight: 'regular',
        size: 'sm',
        color: 'main',
        align: 'left',
    },
};

export default meta;
type Story = StoryObj<typeof Text>;


export const Default: Story = {};

export const BoldLargeTitle: Story = {
    args: {
        children: 'Bold and Large',
        weight: 'bold',
        size: 'xl',
        color: 'title',
    },
};

export const CenteredSmallRed: Story = {
    args: {
        children: 'Centered & Red',
        size: 'xs',
        color: 'red',
        align: 'center',
    },
};

export const CustomStyle: Story = {
    args: {
        children: "ㅁㄴㅇㅁㄴㅇ",

        style: {
            "letterSpacing": "2px"
        },

        weight: "extraBold",
        color: "red",
        align: "center"
    },
};
