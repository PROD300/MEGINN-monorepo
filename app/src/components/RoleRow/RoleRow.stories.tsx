import type { Meta, StoryObj } from '@storybook/react-vite'
import { RoleRow } from './RoleRow'
import { Badge } from '../Badge/Badge'
import { IconButton } from '../IconButton/IconButton'
import { Edit2, Trash2 } from 'lucide-react'

/** RoleRow — строка участника с аватаром и статусом. Матрица: Status = active | inactive. */
const meta = {
  title: 'Components/RoleRow',
  component: RoleRow,
  tags: ['autodocs'],
  args: {
    status: 'active',
    name: 'James Harrington',
    role: 'Portfolio Manager',
    address: '0x1a2b...3c4d',
    initials: 'JH',
  },
  argTypes: {
    status:   { control: 'inline-radio', options: ['active', 'inactive'] },
    name:     { control: 'text' },
    role:     { control: 'text' },
    address:  { control: 'text' },
    initials: { control: 'text' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RoleRow>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: {
    status: 'active',
    name: 'James Harrington',
    role: 'Portfolio Manager',
    address: '0x1a2b...3c4d',
    initials: 'JH',
    badge: <Badge variant="success">Active</Badge>,
    actions: (
      <div style={{ display: 'flex', gap: 4 }}>
        <IconButton icon={<Edit2 size={14} />} label="Edit" />
        <IconButton icon={<Trash2 size={14} />} label="Remove" />
      </div>
    ),
  },
}

export const Inactive: Story = {
  args: {
    status: 'inactive',
    name: 'Sarah Chen',
    role: 'Risk Officer',
    address: '0x5e6f...7a8b',
    initials: 'SC',
    badge: <Badge variant="warning">Inactive</Badge>,
  },
}

/** Матрица Status — список участников. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ width: 560, border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <RoleRow
        status="active"
        name="James Harrington"
        role="Portfolio Manager"
        address="0x1a2b...3c4d"
        initials="JH"
        badge={<Badge variant="success">Active</Badge>}
        actions={<div style={{ display: 'flex', gap: 4 }}><IconButton icon={<Edit2 size={14} />} label="Edit" /><IconButton icon={<Trash2 size={14} />} label="Remove" /></div>}
      />
      <RoleRow
        status="active"
        name="Sarah Chen"
        role="Risk Officer"
        address="0x5e6f...7a8b"
        initials="SC"
        badge={<Badge variant="success">Active</Badge>}
        actions={<div style={{ display: 'flex', gap: 4 }}><IconButton icon={<Edit2 size={14} />} label="Edit" /></div>}
      />
      <RoleRow
        status="inactive"
        name="Marcus Webb"
        role="Compliance Auditor"
        address="0x9c0d...1e2f"
        initials="MW"
        badge={<Badge variant="warning">Inactive</Badge>}
      />
    </div>
  ),
}
