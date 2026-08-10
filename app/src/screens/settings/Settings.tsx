import { useState } from 'react'
import { TopNav, Tabs, Badge, Input, Select, Button, Toggle } from '../../components'
import { registerScreen } from '../registry'
import { profileStore, saveProfile, type Profile } from '../../data/profile'
import { showToast } from '../../lib/toast'
import styles from './Settings.module.css'

const settingsTabs = [
  { label: 'Profile', value: 'profile' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Security', value: 'security' },
]

// [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
// Notification preferences a real product would persist server-side per
// user. Toggle below is uncontrolled (defaultChecked) — nothing saves.
const notificationToggles = [
  { label: 'Notify after each rebalancing execution', on: true },
  { label: 'Notify if rule is paused automatically', on: true },
  { label: 'Emergency Stop alerts', on: true },
  { label: 'Bridge operation completions', on: true },
  { label: 'Weekly summary digest', on: false },
]

// [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
// Represents the account's connected wallets (same pattern as
// smart-account-setup). Hardcoded; "Manage Wallets" below is a no-op.
const wallets = [
  { address: '0x4aB2...c1F8', badgeLabel: 'Primary' },
  { address: '0x9eC1...a3D2', badgeLabel: 'Backup' },
]

type ProfileErrors = Partial<Record<keyof Profile, string>>

function validateProfile(profile: Profile): ProfileErrors {
  const errors: ProfileErrors = {}
  if (!profile.fullName.trim()) errors.fullName = 'Full name is required'
  if (!profile.workEmail.trim()) errors.workEmail = 'Work email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.workEmail)) errors.workEmail = 'Enter a valid email address'
  if (!profile.organization.trim()) errors.organization = 'Organization is required'
  return errors
}

type SettingsTab = 'profile' | 'notifications' | 'security'

export function Settings() {
  const savedProfile = profileStore.useStore()
  const [draft, setDraft] = useState<Profile>(savedProfile)
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<SettingsTab>('profile')

  function updateDraft<K extends keyof Profile>(key: K, value: string) {
    setDraft(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    const nextErrors = validateProfile(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      showToast('error', 'Please fix the highlighted fields')
      return
    }
    // [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
    // Represents a real profile-update API call (or auth-provider write).
    // Here it's a fake delay before saveProfile() writes to local state.
    setSaving(true)
    setTimeout(() => {
      saveProfile(draft)
      setSaving(false)
      showToast('success', 'Profile updated')
    }, 500)
  }

  function handleCancel() {
    setDraft(savedProfile)
    setErrors({})
  }

  return (
    <div className={styles.screen}>
      <TopNav active="settings" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeaderWrap}>
            <div className={styles.pageHeader}>
              <span className={styles.pageTitle}>Account Settings</span>
            </div>
          </div>

          {/* SettingsTabs */}
          <div className={styles.tabsWrap}>
            <div className={styles.tabsInner}>
              <Tabs tabs={settingsTabs} active={tab} onChange={value => setTab(value as SettingsTab)} />
            </div>
          </div>

          {/* ContentArea */}
          <div className={styles.contentArea}>
            {tab !== 'security' && (
            <div className={styles.profileColumn}>
              {/* ProfileCard */}
              {tab === 'profile' && (
              <div className={styles.card}>
                <span className={styles.cardTitle}>Profile</span>
                <div className={styles.avatarRow}>
                  <span className={styles.avatar} />
                  <div className={styles.nameBlock}>
                    <span className={styles.profileName}>{savedProfile.fullName}</span>
                    <span className={styles.profileEmail}>{savedProfile.workEmail}</span>
                    <Badge variant="success">Family Office CIO</Badge>
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>Full Name</span>
                  <Input
                    value={draft.fullName}
                    onChange={e => updateDraft('fullName', e.target.value)}
                    variant={errors.fullName ? 'error' : 'default'}
                    errorMessage={errors.fullName}
                  />
                </div>
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>Work Email</span>
                  <Input
                    value={draft.workEmail}
                    onChange={e => updateDraft('workEmail', e.target.value)}
                    variant={errors.workEmail ? 'error' : 'default'}
                    errorMessage={errors.workEmail}
                  />
                </div>
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>Organization</span>
                  <Input
                    value={draft.organization}
                    onChange={e => updateDraft('organization', e.target.value)}
                    variant={errors.organization ? 'error' : 'default'}
                    errorMessage={errors.organization}
                  />
                </div>
                <div className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>AUM Range</span>
                  <Select
                    className={styles.fullWidthSelect}
                    options={[
                      { value: '0-100', label: '$0–$100M' },
                      { value: '100-500', label: '$100M–$500M' },
                      { value: '500-1000', label: '$500M–$1B' },
                      { value: '1000+', label: '$1B+' },
                    ]}
                    value={draft.aumRange}
                    onChange={e => updateDraft('aumRange', e.target.value)}
                  />
                </div>
                <div className={styles.cta}>
                  <Button variant="primary" size="sm" onClick={handleSave} loading={saving} disabled={saving}>Save Changes</Button>
                  <Button variant="primary" size="sm" onClick={handleCancel} disabled={saving}>Cancel</Button>
                </div>
              </div>
              )}

              {/* NotificationsCard */}
              {tab === 'notifications' && (
              <div className={styles.card}>
                <span className={styles.cardTitle}>Notification Preferences</span>
                {notificationToggles.map((t) => (
                  <div className={styles.toggleRow} key={t.label}>
                    <span className={styles.toggleLabel}>{t.label}</span>
                    <Toggle defaultChecked={t.on} />
                  </div>
                ))}
              </div>
              )}
            </div>
            )}

            {tab === 'security' && (
            <div className={styles.dangerZoneCol}>
              {/* ConnectedWalletsCard */}
              <div className={styles.card}>
                <span className={styles.cardTitle}>Connected Wallets</span>
                {wallets.map((w) => (
                  <div className={styles.miniWalletRow} key={w.address}>
                    <span className={styles.miniWalletAddress}>{w.address}</span>
                    <Badge variant="success">{w.badgeLabel}</Badge>
                  </div>
                ))}
                {/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND] No onClick — would open wallet management against the real wallet provider. */}
                <Button variant="primary" size="sm" className={styles.fullWidthBtn}>
                  Manage Wallets →
                </Button>
              </div>

              {/* DangerZoneCard */}
              <div className={styles.dangerCard}>
                <span className={styles.dangerTitle}>Danger Zone</span>
                <span className={styles.dangerDescription}>
                  Deactivating your account will halt all automation and disconnect all wallets.
                </span>
                {/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND] No onClick — would trigger real account deactivation/wallet disconnect. */}
                <Button variant="primary" size="sm" className={styles.fullWidthBtn}>
                  Deactivate Account
                </Button>
              </div>
            </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'settings',
  name: 'Account Settings',
  description: 'Profile, notification preferences, connected wallets, danger zone',
  route: '/settings',
  component: Settings,
})
