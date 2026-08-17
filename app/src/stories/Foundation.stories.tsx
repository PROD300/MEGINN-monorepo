import type { Meta, StoryObj } from '@storybook/react-vite'

/** Foundation — все переменные дизайн-системы OBSIDIAN. Primitive + Semantic + Typography. */
const meta = {
  title: 'Foundation/Tokens',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  render: () => <FoundationPage />,
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─── helpers ─────────────────────────────────────────────────────────────────

function Swatch({ name, value, dark }: { name: string; value: string; dark?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 6,
          background: value,
          border: '1px solid rgba(0,0,0,.12)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: dark ? '#fff' : 'var(--text-default)' }}>
          {name}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: dark ? 'rgba(255,255,255,.6)' : 'var(--text-muted)' }}>
          {value}
        </div>
      </div>
    </div>
  )
}

function Row({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-default)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
      <span style={{ color: 'var(--text-default)', fontWeight: 500 }}>{name}</span>
      <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 16 }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function SemanticRow({ name, prim, value }: { name: string; prim: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0', borderBottom: '1px solid var(--border-default)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
      <div style={{ width: 24, height: 24, borderRadius: 4, background: value, border: '1px solid rgba(0,0,0,.12)', flexShrink: 0 }} />
      <span style={{ flex: 1, fontWeight: 500, color: 'var(--text-default)' }}>{name}</span>
      <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>→ {prim}</span>
    </div>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

function FoundationPage() {
  return (
    <div style={{ maxWidth: 720, padding: 24 }}>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 700, color: 'var(--text-default)', marginBottom: 8 }}>
        Foundation — Design Tokens
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', marginBottom: 40 }}>
        OBSIDIAN DS · Primitive + Semantic variables · All values sourced from <code>src/tokens/</code>
      </p>

      {/* ── PRIMITIVE ─── */}
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: 'var(--text-default)', marginBottom: 24 }}>
        Primitive Tokens (Global)
      </h1>

      <Section title="Accent — Petrol (rebrand 2026-08-17, MEGINN — was #4B34F5 indigo/violet ramp)">
        <Swatch name="accent-50"  value="#E8F3F6" />
        <Swatch name="accent-100" value="#CDE7EC" />
        <Swatch name="accent-300" value="#6FBBCB" />
        <Swatch name="accent-500" value="#1C7EA0" />
        <Swatch name="accent-700" value="#145C77" />
        <Swatch name="accent-900" value="#0B3546" />
      </Section>

      <Section title="Neutrals — Cool Gray">
        <Swatch name="gray-00"  value="#FFFFFF" />
        <Swatch name="gray-50"  value="#F8FAFC" />
        <Swatch name="gray-100" value="#F1F5F9" />
        <Swatch name="gray-200" value="#E2E8F0" />
        <Swatch name="gray-300" value="#CBD5E1" />
        <Swatch name="gray-500" value="#64748B" />
        <Swatch name="gray-700" value="#334155" />
        <Swatch name="gray-900" value="#0F172A" />
        <Swatch name="gray-950" value="#020617" />
      </Section>

      <Section title="Functional — converged on the single accent, 2026-08-10 (status reads by icon/copy, not hue)">
        <Swatch name="success-500" value="#1C7EA0" />
        <Swatch name="warning-500" value="#1C7EA0" />
        <Swatch name="error-500"   value="#1C7EA0" />
        <Swatch name="info-500"    value="#1C7EA0" />
      </Section>

      <Section title="Typography Scale">
        <Row name="font-sans"          value="Geist" />
        <Row name="font-mono"          value="Geist Mono" />
        <Row name="size-xs"            value="12px" />
        <Row name="size-sm"            value="14px" />
        <Row name="size-base"          value="16px" />
        <Row name="size-lg"            value="18px" />
        <Row name="size-xl"            value="20px" />
        <Row name="size-2xl"           value="24px" />
        <Row name="size-3xl"           value="32px" />
        <Row name="size-4xl"           value="48px" />
        <Row name="weight-regular"     value="400" />
        <Row name="weight-medium"      value="500" />
        <Row name="weight-semibold"    value="600" />
        <Row name="weight-bold"        value="700" />
        <Row name="line-height-base"   value="1.5" />
        <Row name="line-height-tight"  value="1.25" />
        <Row name="letter-spacing-tight" value="-0.02em" />
      </Section>

      <Section title="Radii">
        <Row name="radius-none" value="0px" />
        <Row name="radius-sm"   value="4px" />
        <Row name="radius-md"   value="4px (was 8px — unified to sharp institutional radius, 2026-08-09)" />
        <Row name="radius-lg"   value="16px" />
      </Section>

      <Section title="Spacing">
        <Row name="space-1"  value="4px" />
        <Row name="space-2"  value="8px" />
        <Row name="space-3"  value="12px" />
        <Row name="space-4"  value="16px" />
        <Row name="space-6"  value="24px" />
        <Row name="space-8"  value="32px" />
        <Row name="space-12" value="48px" />
        <Row name="space-16" value="64px" />
      </Section>

      <Section title="Shadows">
        <Row name="shadow-sm" value="0 1px 2px rgba(15,23,42,.08)" />
        <Row name="shadow-md" value="0 4px 6px rgba(15,23,42,.10), 0 1px 3px rgba(15,23,42,.06)" />
        <Row name="shadow-lg" value="0 10px 15px rgba(15,23,42,.10), 0 4px 6px rgba(15,23,42,.05)" />
        <Row name="shadow-float" value="0 24px 48px -24px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.05)" />
        <Row name="shadow-glow-accent" value="none — deprecated 2026-08-10, kept as a token so nothing breaks" />
      </Section>

      {/* ── SEMANTIC ─── */}
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: 'var(--text-default)', marginBottom: 24, marginTop: 16 }}>
        Semantic Tokens
      </h1>

      <Section title="Surfaces — dark by default, promoted from Portfolio pilot 2026-08-09">
        <SemanticRow name="surface-default"              prim="gray-950"      value="#020617" />
        <SemanticRow name="surface-subtle"               prim="gray-900"      value="#0F172A" />
        <SemanticRow name="surface-elevated"              prim="gray-900"      value="#0F172A" />
        <SemanticRow name="surface-level-1"              prim="gray-950"      value="#020617" />
        <SemanticRow name="surface-level-2"              prim="gray-900"      value="#0F172A" />
        <SemanticRow name="surface-level-3"              prim="gray-700"      value="#334155" />
        <SemanticRow name="surface-level-4"              prim="gray-500"      value="#64748B" />
        <SemanticRow name="surface-action-primary"       prim="accent-500"    value="#1C7EA0" />
        <SemanticRow name="surface-action-primary-hover" prim="accent-700"    value="#145C77" />
        <SemanticRow name="surface-action-ghost-hover"   prim="accent-900"    value="#0B3546" />
        <SemanticRow name="surface-hover"                prim="gray-300"      value="#CBD5E1" />
      </Section>

      <Section title="Text">
        <SemanticRow name="text-default"      prim="gray-00"     value="#FFFFFF" />
        <SemanticRow name="text-muted"        prim="gray-300"    value="#CBD5E1" />
        <SemanticRow name="text-subtle"       prim="gray-500"    value="#64748B" />
        <SemanticRow name="text-disabled"     prim="gray-700"    value="#334155" />
        <SemanticRow name="text-on-action"    prim="gray-00"     value="#FFFFFF" />
        <SemanticRow name="text-on-dark"      prim="gray-00"     value="#FFFFFF" />
        <SemanticRow name="text-error"        prim="error-500"   value="#1C7EA0" />
        <SemanticRow name="text-warning"      prim="warning-500" value="#1C7EA0" />
        <SemanticRow name="text-success"      prim="success-500" value="#1C7EA0" />
        <SemanticRow name="text-info"         prim="info-500"    value="#1C7EA0" />
        <SemanticRow name="text-accent"       prim="accent-300"  value="#6FBBCB" />
        <SemanticRow name="text-accent-hover" prim="accent-700"  value="#145C77" />
      </Section>

      <Section title="Borders">
        <SemanticRow name="border-default"  prim="gray-700"    value="#334155" />
        <SemanticRow name="border-strong"   prim="gray-500"    value="#64748B" />
        <SemanticRow name="border-focus"    prim="accent-500"  value="#1C7EA0" />
        <SemanticRow name="border-error"    prim="error-500"   value="#1C7EA0" />
        <SemanticRow name="border-warning"  prim="warning-500" value="#1C7EA0" />
        <SemanticRow name="border-info"     prim="info-500"    value="#1C7EA0" />
        <SemanticRow name="border-hairline" prim="transparent" value="removed 2026-08-10 — card border is gone, kept as a token" />
      </Section>

      <Section title="Status Backgrounds">
        <SemanticRow name="bg-success"        prim="success-500"     value="#1C7EA0" />
        <SemanticRow name="bg-warning"        prim="warning-500"     value="#1C7EA0" />
        <SemanticRow name="bg-error"          prim="error-500"       value="#1C7EA0" />
        <SemanticRow name="bg-info"           prim="info-500"        value="#1C7EA0" />
        <SemanticRow name="bg-success-subtle" prim="accent 10%" value="rgba(28,126,160,.10)" />
        <SemanticRow name="bg-warning-subtle" prim="accent 10%" value="rgba(28,126,160,.10)" />
        <SemanticRow name="bg-error-subtle"   prim="accent 10%"   value="rgba(28,126,160,.10)" />
        <SemanticRow name="bg-info-subtle"    prim="accent 10%"    value="rgba(28,126,160,.10)" />
      </Section>

      <Section title="AppShell">
        <SemanticRow name="surface-app-shell"   prim="gray-950"    value="#020617" />
        <SemanticRow name="text-nav-item"       prim="gray-300"    value="#CBD5E1" />
        <SemanticRow name="text-nav-active"     prim="gray-00"     value="#FFFFFF" />
        <SemanticRow name="text-on-dark-accent" prim="accent-300"  value="#6FBBCB" />
        <SemanticRow name="border-app-shell"    prim="gray-700"    value="#334155" />
      </Section>

      {/* ── TYPOGRAPHY ─── */}
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: 'var(--text-default)', marginBottom: 24, marginTop: 16 }}>
        Text Styles
      </h1>

      <Section title="DS TextStyles">
        {[
          { name: 'DS/Heading/4xl', style: { fontSize: 48, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em' } },
          { name: 'DS/Heading/3xl', style: { fontSize: 32, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em' } },
          { name: 'DS/Heading/2xl', style: { fontSize: 24, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em' } },
          { name: 'DS/Heading/xl',  style: { fontSize: 20, fontWeight: 600, lineHeight: 1.5 } },
          { name: 'DS/Heading/lg',  style: { fontSize: 18, fontWeight: 600, lineHeight: 1.5 } },
          { name: 'DS/Body/base',   style: { fontSize: 16, fontWeight: 400, lineHeight: 1.5 } },
          { name: 'DS/Body/sm',     style: { fontSize: 14, fontWeight: 400, lineHeight: 1.5 } },
          { name: 'DS/Body/sm Medium', style: { fontSize: 14, fontWeight: 500, lineHeight: 1.5 } },
          { name: 'DS/Body/xs',     style: { fontSize: 12, fontWeight: 400, lineHeight: 1.5 } },
          { name: 'DS/Label/xs',    style: { fontSize: 12, fontWeight: 500, lineHeight: 1.25, letterSpacing: '.04em', textTransform: 'uppercase' as const } },
        ].map(({ name, style }) => (
          <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--border-default)' }}>
            <span style={{ width: 180, flexShrink: 0, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{name}</span>
            <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-default)', ...style }}>
              Portfolio AUM — $12.4M
            </span>
          </div>
        ))}
      </Section>
    </div>
  )
}

export const AllTokens: Story = {}
