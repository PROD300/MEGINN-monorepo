import { createStore } from './store'

/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
   Represents the liability agreement e-signature record a real product
   would persist server-side (with an audit trail). Here signAgreement()
   just flips a boolean in local memory. */

export interface AgreementStatus {
  signed: boolean
  signedDate: string | null
}

export const agreementStore = createStore<AgreementStatus>({
  signed: false,
  signedDate: null,
})

export function signAgreement() {
  const signedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  agreementStore.setState({ signed: true, signedDate })
}
