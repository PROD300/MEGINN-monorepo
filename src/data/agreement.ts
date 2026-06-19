import { createStore } from './store'

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
