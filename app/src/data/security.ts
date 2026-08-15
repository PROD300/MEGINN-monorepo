import { createStore } from './store'

/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
   Represents the smart account's multi-sig threshold and hardware-key
   confirmation policy — real smart-account contract config in production.
   saveSecuritySettings() just overwrites local state. */

export interface SecuritySettings {
  multiSigThreshold: number
  hardwareConfirmRequired: boolean
}

const initialSecurity: SecuritySettings = {
  multiSigThreshold: 10000,
  hardwareConfirmRequired: false,
}

export const securityStore = createStore<SecuritySettings>(initialSecurity)

export function saveSecuritySettings(next: SecuritySettings) {
  securityStore.setState(next)
}
