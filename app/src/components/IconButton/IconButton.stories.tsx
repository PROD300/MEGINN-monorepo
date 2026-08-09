import type { Meta, StoryObj } from '@storybook/react-vite'
import { Settings, Edit2, Trash2, Bell, RefreshCw } from 'lucide-react'
import { IconButton } from './IconButton'

/** IconButton — кнопка-иконка 36×36. Матрица: State = default | hover | disabled. */
const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    icon: <Settings size={16} />,
    label: 'Settings',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    label:    { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story  = { args: { icon: <Settings size={16} />, label: 'Settings' } }
export const Edit: Story     = { args: { icon: <Edit2 size={16} />,    label: 'Edit rule' } }
export const Delete: Story   = { args: { icon: <Trash2 size={16} />,   label: 'Delete rule' } }
export const Refresh: Story  = { args: { icon: <RefreshCw size={16} />, label: 'Refresh' } }
export const Disabled: Story = { args: { icon: <Settings size={16} />, label: 'Settings', disabled: true } }

/** Матрица — все иконки рядом, включая disabled. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <IconButton icon={<Settings size={16} />}   label="Settings" />
      <IconButton icon={<Edit2 size={16} />}      label="Edit" />
      <IconButton icon={<Trash2 size={16} />}     label="Delete" />
      <IconButton icon={<Bell size={16} />}       label="Notifications" />
      <IconButton icon={<RefreshCw size={16} />}  label="Refresh" />
      <IconButton icon={<Settings size={16} />}   label="Disabled" disabled />
    </div>
  ),
}
