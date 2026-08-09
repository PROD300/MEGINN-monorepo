import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

/** Modal — диалоговое окно подтверждения и форм-диалог. Управляется пропом open. */
const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    open: true,
    title: 'Delete Rule',
    children: 'This action cannot be undone. The rule will be permanently removed.',
  },
  argTypes: {
    open:  { control: 'boolean' },
    title: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

function ControlledModal({ title, children, footer }: { title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} title={title} onClose={() => setOpen(false)} footer={footer}>
        {children}
      </Modal>
    </>
  )
}

export const Confirmation: Story = {
  render: () => (
    <ControlledModal
      title="Delete Rule"
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Delete</Button>
        </div>
      }
    >
      This action cannot be undone. The ETH Rebalancing Rule will be permanently removed.
    </ControlledModal>
  ),
}

export const EmergencyStop: Story = {
  render: () => (
    <ControlledModal
      title="Stop All Agents"
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Stop All</Button>
        </div>
      }
    >
      All autonomous rebalancing agents will be paused immediately. Active transactions will complete.
    </ControlledModal>
  ),
}

export const FormDialog: Story = {
  render: () => (
    <ControlledModal
      title="New Rebalancing Rule"
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Create Rule</Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Rule name" placeholder="ETH Target 30%" />
        <Input label="Target allocation (%)" placeholder="30.00" />
        <Input label="Drift threshold (%)" placeholder="2.00" />
      </div>
    </ControlledModal>
  ),
}

export const OpenStatic: Story = {
  args: {
    open: true,
    title: 'Pause Rule',
    children: 'The rule will be paused. You can resume it at any time.',
    footer: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Pause</Button>
      </div>
    ),
    onClose: () => {},
  },
}
