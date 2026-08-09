import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

/** Input — текстовый ввод с label и состоянием ошибки. Матрица: Variant × State. */
const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    label: 'Allocation threshold (%)',
    placeholder: '0.00',
  },
  argTypes: {
    variant:      { control: 'inline-radio', options: ['default', 'error'] },
    label:        { control: 'text' },
    placeholder:  { control: 'text' },
    errorMessage: { control: 'text' },
    disabled:     { control: 'boolean' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: { placeholder: undefined, defaultValue: '25.00' },
}

export const Error: Story = {
  args: {
    variant: 'error',
    label: 'Allocation threshold (%)',
    defaultValue: '150',
    errorMessage: 'Value must be between 0 and 100',
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '25.00' },
}

export const NoLabel: Story = {
  args: { label: undefined, placeholder: 'Search assets...' },
}

/** Матрица Variant × State. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 300 }}>
      <Input label="Default" placeholder="0.00" />
      <Input label="With value" defaultValue="25.00" />
      <Input label="Focus (click)" placeholder="0.00" />
      <Input label="Error" variant="error" defaultValue="150" errorMessage="Value must be between 0 and 100" />
      <Input label="Disabled" disabled defaultValue="25.00" />
    </div>
  ),
}
