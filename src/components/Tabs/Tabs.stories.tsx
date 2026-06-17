import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'

const portfolioTabs = [
  { label: 'Overview',   value: 'overview' },
  { label: 'Positions',  value: 'positions' },
  { label: 'History',    value: 'history' },
  { label: 'Risk',       value: 'risk' },
]

const ruleTabs = [
  { label: 'Active',   value: 'active' },
  { label: 'Paused',   value: 'paused', disabled: true },
  { label: 'Archive',  value: 'archive' },
]

/** Tabs — горизонтальная навигация. Матрица: State = default | active | disabled. */
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs: portfolioTabs,
    active: 'overview',
  },
  argTypes: {
    active: { control: 'select', options: portfolioTabs.map(t => t.value) },
    tabs:   { control: 'object' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveTabs({ tabs, defaultActive }: { tabs: typeof portfolioTabs; defaultActive: string }) {
  const [active, setActive] = useState(defaultActive)
  return <Tabs tabs={tabs} active={active} onChange={setActive} />
}

export const Portfolio: Story = {
  render: () => <InteractiveTabs tabs={portfolioTabs} defaultActive="overview" />,
}

export const WithDisabled: Story = {
  render: () => <InteractiveTabs tabs={ruleTabs} defaultActive="active" />,
}

/** Матрица State — static render всех состояний. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Portfolio tabs (interactive)</p>
        <InteractiveTabs tabs={portfolioTabs} defaultActive="overview" />
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>With disabled tab</p>
        <InteractiveTabs tabs={ruleTabs} defaultActive="active" />
      </div>
    </div>
  ),
}
