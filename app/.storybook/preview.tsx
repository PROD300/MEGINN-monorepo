import type { Preview } from '@storybook/react-vite'
import '../src/tokens/primitives.css'
import '../src/tokens/semantics.css'
import '../src/tokens/typography.css'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
    layout: 'centered',
  },
}

export default preview
