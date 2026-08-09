import { createStore } from './store'

export interface RoleEntry {
  id: string
  status: 'active'
  name: string
  role: string
  address: string
}

const initialRoles: RoleEntry[] = [
  { id: 'james-harrington', status: 'active', name: 'James Harrington', role: 'CIO · Full access', address: '0x4aB2...c1F8' },
  { id: 'defi-operator', status: 'active', name: 'DeFi Operator', role: 'Execute only — Read + Execute rules', address: '0x9eC1...a3D2' },
  { id: 'emergency-contact', status: 'active', name: 'Emergency Contact', role: 'View only — read-only', address: 'ops@familyoffice.com' },
]

export const rolesStore = createStore<RoleEntry[]>(initialRoles)

export function addRole(role: Omit<RoleEntry, 'id' | 'status'>) {
  const id = role.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `role-${Date.now()}`
  rolesStore.setState(prev => [...prev, { ...role, id, status: 'active' }])
}

export function roleAddressExists(address: string) {
  return rolesStore.getState().some(r => r.address.toLowerCase() === address.trim().toLowerCase())
}
