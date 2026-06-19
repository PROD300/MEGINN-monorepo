import type { ComponentType } from 'react'

export interface ScreenEntry {
  id: string
  name: string
  description: string
  route: string
  component: ComponentType
}

const registry = new Map<string, ScreenEntry>()

export function registerScreen(entry: ScreenEntry) {
  registry.set(entry.id, entry)
}

export function getScreens(): ScreenEntry[] {
  return Array.from(registry.values())
}
