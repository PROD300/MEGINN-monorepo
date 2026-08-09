import type { ReactNode } from 'react'
import { Zap, GitMerge, UserCheck } from 'lucide-react'
import styles from './LiabilityCard.module.css'

export type LiabilityType = 'autonomous' | 'bridge' | 'user'

interface LiabilityCardProps {
  type: LiabilityType
  title: string
  responsible: string
  description: string
  badge?: ReactNode
}

const typeIcons: Record<LiabilityType, ReactNode> = {
  autonomous: <Zap size={20} />,
  bridge: <GitMerge size={20} />,
  user: <UserCheck size={20} />,
}

export function LiabilityCard({ type, title, responsible, description, badge }: LiabilityCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>
        {typeIcons[type]}
      </span>
      <span className={styles.title}>{title}</span>
      <span className={styles.responsible}>{responsible}</span>
      <span className={styles.description}>{description}</span>
      {badge}
    </div>
  )
}
