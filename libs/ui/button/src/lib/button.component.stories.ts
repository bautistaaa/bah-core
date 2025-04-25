import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'ButtonComponent',
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: "secondary",
    size: 'md',
    disabled: false,
    type: 'button',
    ariaLabel: '',
  },
};

export const Heading: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
    ariaLabel: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/button works!/gi)).toBeTruthy();
  },
};
