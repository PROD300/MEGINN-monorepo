import { Link } from 'react-router-dom'
import { getScreens } from './registry'
import styles from './IndexPage.module.css'

export function IndexPage() {
  const screens = getScreens()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>OBSIDIAN — экраны</h1>
        <p className={styles.subtitle}>
          Статичные экраны, собранные из дизайн-системы. Логика и данные — отдельный шаг.
        </p>
      </div>
      <div className={styles.grid}>
        {screens.map(screen => (
          <Link key={screen.id} to={screen.route} className={styles.card}>
            <div className={styles.cardName}>{screen.name}</div>
            <div className={styles.cardDesc}>{screen.description}</div>
            <div className={styles.cardRoute}>{screen.route}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
