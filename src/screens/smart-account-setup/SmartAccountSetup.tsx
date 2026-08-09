import { useState } from 'react'
import { Wallet, HardDrive, Plus, ShieldCheck, Fingerprint } from 'lucide-react'
import { TopNav, Button, Badge, RoleRow, Input, Select, Toggle, Modal } from '../../components'
import { registerScreen } from '../registry'
import { rolesStore, addRole, roleAddressExists } from '../../data/roles'
import { securityStore, saveSecuritySettings } from '../../data/security'
import { showToast } from '../../lib/toast'
import styles from './SmartAccountSetup.module.css'

const wallets = [
  {
    icon: Wallet,
    name: 'Primary Wallet',
    address: '0x4aB2...c1F8',
    networks: 'Ethereum · Arbitrum',
    badgeLabel: 'Primary',
  },
  {
    icon: HardDrive,
    name: 'Hardware Wallet (Ledger)',
    address: '0x9eC1...a3D2',
    networks: 'Ethereum',
    badgeLabel: 'Backup',
  },
]

const roleLevelOptions = [
  { value: 'CIO · Full access', label: 'Full access (CIO)' },
  { value: 'Execute only — Read + Execute rules', label: 'Execute only' },
  { value: 'View only — read-only', label: 'View only' },
]

interface RoleFormState {
  name: string
  role: string
  address: string
}

const initialRoleForm: RoleFormState = { name: '', role: roleLevelOptions[1].value, address: '' }

type RoleFormErrors = Partial<Record<keyof RoleFormState, string>>

export function SmartAccountSetup() {
  const roles = rolesStore.useStore()
  const security = securityStore.useStore()

  const [modalOpen, setModalOpen] = useState(false)
  const [roleForm, setRoleForm] = useState<RoleFormState>(initialRoleForm)
  const [roleErrors, setRoleErrors] = useState<RoleFormErrors>({})

  const [thresholdInput, setThresholdInput] = useState(String(security.multiSigThreshold))
  const [hardwareConfirm, setHardwareConfirm] = useState(security.hardwareConfirmRequired)
  const [thresholdError, setThresholdError] = useState<string | undefined>()

  function openAddRole() {
    setRoleForm(initialRoleForm)
    setRoleErrors({})
    setModalOpen(true)
  }

  function handleAddRole() {
    const errors: RoleFormErrors = {}
    if (!roleForm.name.trim()) errors.name = 'Name is required'
    if (!roleForm.address.trim()) errors.address = 'Wallet address or email is required'
    else if (roleAddressExists(roleForm.address)) errors.address = 'This address is already assigned to a role'

    setRoleErrors(errors)
    if (Object.keys(errors).length > 0) {
      showToast('error', 'Please fix the highlighted fields')
      return
    }

    addRole({ name: roleForm.name.trim(), role: roleForm.role, address: roleForm.address.trim() })
    showToast('success', `${roleForm.name.trim()} added with ${roleForm.role.split(' ')[0]} access`)
    setModalOpen(false)
  }

  function handleSaveSecurity() {
    const value = Number(thresholdInput)
    if (thresholdInput.trim() === '' || Number.isNaN(value) || value <= 0) {
      setThresholdError('Enter a positive USD amount')
      showToast('error', 'Please fix the highlighted field')
      return
    }
    setThresholdError(undefined)
    saveSecuritySettings({ multiSigThreshold: value, hardwareConfirmRequired: hardwareConfirm })
    showToast('success', 'Security settings saved')
  }

  return (
    <div className={styles.screen}>
      <TopNav active="settings" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <span className={styles.pageTitle}>Smart Account Setup</span>
            <Button variant="primary" size="sm" onClick={openAddRole}>+ Add Role</Button>
          </div>

          {/* InfoBanner */}
          <div className={styles.infoBanner}>
            <ShieldCheck size={14} className={styles.infoIcon} />
            <span>
              Smart Account — self-custody wallet with role-based automation. Your funds are
              always under your control.
            </span>
          </div>

          {/* WalletsSection */}
          <div className={styles.section}>
            <span className={styles.secTitle}>Connected Wallets</span>
            <div className={styles.walletList}>
              {wallets.map((w) => (
                <div className={styles.walletRow} key={w.name}>
                  <span className={styles.walletIcon}>
                    <w.icon size={20} />
                  </span>
                  <div className={styles.walletMid}>
                    <span className={styles.walletName}>{w.name}</span>
                    <span className={[styles.walletMeta, styles.walletAddress].join(' ')}>{w.address}</span>
                    <span className={styles.walletMeta}>{w.networks}</span>
                  </div>
                  <div className={styles.walletActions}>
                    <Badge variant="success">{w.badgeLabel}</Badge>
                    <Button variant="primary" size="sm">Disconnect</Button>
                  </div>
                </div>
              ))}
              <div className={styles.addWalletRow}>
                <Plus size={16} className={styles.addWalletIcon} />
                <span>Connect another wallet</span>
              </div>
            </div>
          </div>

          {/* RolesSection */}
          <div className={styles.section}>
            <span className={styles.secTitle}>Roles &amp; Permissions</span>
            <div className={styles.roleList}>
              {roles.map((r) => (
                <RoleRow
                  key={r.id}
                  status={r.status}
                  name={r.name}
                  role={r.role}
                  address={r.address}
                  badge={<Badge variant="success">Active</Badge>}
                />
              ))}
            </div>
          </div>

          {/* SecuritySection */}
          <div className={styles.secSection}>
            <span className={styles.secTitle}>Security Settings</span>
            <div className={styles.secRow}>
              <Fingerprint size={16} className={styles.secRowIcon} />
              <div className={styles.secRowText}>
                <span className={styles.secRowLabel}>Multi-sig required for amounts above</span>
                <span className={styles.secRowCaption}>
                  Transactions above this amount require approval from a second signer before executing.
                </span>
              </div>
              <div className={styles.secInputWrap}>
                <Input
                  value={thresholdInput}
                  onChange={e => setThresholdInput(e.target.value)}
                  variant={thresholdError ? 'error' : 'default'}
                  errorMessage={thresholdError}
                />
              </div>
            </div>
            <div className={styles.secRow}>
              <Fingerprint size={16} className={styles.secRowIcon} />
              <span className={styles.secRowLabel}>
                Hardware wallet confirmation for critical actions
              </span>
              <Toggle checked={hardwareConfirm} onChange={setHardwareConfirm} />
            </div>
            <div className={styles.secCta}>
              <Button variant="primary" size="sm" onClick={handleSaveSecurity}>Save Security Settings</Button>
            </div>
          </div>
        </main>
      </div>

      <Modal
        open={modalOpen}
        title="Add Role"
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleAddRole}>Add Role</Button>
          </>
        }
      >
        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Name</label>
          <Input
            placeholder="e.g. Jane Doe"
            value={roleForm.name}
            onChange={e => setRoleForm(prev => ({ ...prev, name: e.target.value }))}
            variant={roleErrors.name ? 'error' : 'default'}
            errorMessage={roleErrors.name}
          />
        </div>
        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Permission level</label>
          <Select
            options={roleLevelOptions}
            value={roleForm.role}
            onChange={e => setRoleForm(prev => ({ ...prev, role: e.target.value }))}
          />
        </div>
        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Wallet address or email</label>
          <Input
            placeholder="0x... or name@company.com"
            value={roleForm.address}
            onChange={e => setRoleForm(prev => ({ ...prev, address: e.target.value }))}
            variant={roleErrors.address ? 'error' : 'default'}
            errorMessage={roleErrors.address}
          />
        </div>
      </Modal>
    </div>
  )
}

registerScreen({
  id: 'smart-account-setup',
  name: 'Smart Account Setup',
  description: 'Connected wallets, roles & permissions, security settings for the smart account',
  route: '/smart-account-setup',
  component: SmartAccountSetup,
})
