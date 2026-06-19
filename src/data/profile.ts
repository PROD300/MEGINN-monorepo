import { createStore } from './store'

export interface Profile {
  fullName: string
  workEmail: string
  organization: string
  aumRange: string
}

const initialProfile: Profile = {
  fullName: 'James Harrington',
  workEmail: 'james@familyoffice.com',
  organization: 'Harrington Family Office',
  aumRange: '100-500',
}

export const profileStore = createStore<Profile>(initialProfile)

export function saveProfile(profile: Profile) {
  profileStore.setState(profile)
}

export function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
