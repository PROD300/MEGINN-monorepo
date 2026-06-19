import { createStore } from './store'

export interface SecuritySettings {
  multiSigThreshold: number
  hardwareConfirmRequired: boolean
}

const initialSecurity: SecuritySettings = {
  multiSigThreshold: 10000,
  hardwareConfirmRequired: true,
}

export const securityStore = createStore<SecuritySettings>(initialSecurity)

export function saveSecuritySettings(next: SecuritySettings) {
  securityStore.setState(next)
}
