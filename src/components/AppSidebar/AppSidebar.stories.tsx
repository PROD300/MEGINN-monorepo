import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppSidebar, type NavItemId } from './AppSidebar'

/** AppSidebar — вертикальная навигация AppShell (тёмный фон, 240px). Матрица: NavItem = default | active. */
const meta = {
  title: 'AppShell/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
  args: {
    active: 'portfolio',
  },
  argTypes: {
    active: {
      control: 'select',
      options: ['portfolio', 'rebalancing', 'liability', 'audit', 'settings'],
    },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppSidebar>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveSidebar({ defaultActive }: { defaultActive: NavItemId }) {
  const [active, setActive] = useState<NavItemId>(defaultActive)
  return (
    <div style={{ height: 600, display: 'flex' }}>
      <AppSidebar active={active} onNavigate={setActive} />
    </div>
  )
}

export const Portfolio: Story = {
  render: () => <InteractiveSidebar defaultActive="portfolio" />,
}

export const Rebalancing: Story = {
  render: () => <InteractiveSidebar defaultActive="rebalancing" />,
}

export const Liability: Story = {
  render: () => <InteractiveSidebar defaultActive="liability" />,
}

/** Матрица: интерактивный sidebar — все NavItems. */
export const Interactive: Story = {
  parameters: { layout: 'padded' },
  render: () => <InteractiveSidebar defaultActive="portfolio" />,
}
