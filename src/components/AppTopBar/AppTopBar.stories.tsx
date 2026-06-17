import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppTopBar } from './AppTopBar'

/** AppTopBar — верхняя навигационная панель AppShell (тёмный фон). Структура: Logo · StopAll · Bell · User · Avatar. */
const meta = {
  title: 'AppShell/AppTopBar',
  component: AppTopBar,
  tags: ['autodocs'],
  args: {
    userName: 'James Harrington',
    initials: 'JH',
    hasNotification: true,
  },
  argTypes: {
    userName:        { control: 'text' },
    initials:        { control: 'text' },
    hasNotification: { control: 'boolean' },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppTopBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoNotification: Story = {
  args: { hasNotification: false },
}

export const DifferentUser: Story = {
  args: {
    userName: 'Sarah Chen',
    initials: 'SC',
    hasNotification: false,
  },
}

/** Матрица состояний TopBar. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>With notification</p>
        <AppTopBar userName="James Harrington" initials="JH" hasNotification />
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>No notification</p>
        <AppTopBar userName="James Harrington" initials="JH" hasNotification={false} />
      </div>
    </div>
  ),
}
