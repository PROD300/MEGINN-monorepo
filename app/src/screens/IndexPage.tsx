import { Link } from 'react-router-dom'
import { getScreens } from './registry'
import styles from './IndexPage.module.css'

// Route patterns with dynamic segments aren't valid links as-is — resolve them
// to a concrete, working URL (or drop an optional param) before linking.
function resolveRoute(route: string): string {
  if (route === '/rule-detail/:id') return '/rule-detail/eth-balance-guard'
  return route.replace(/\/:[^/]+\?/g, '')
}

export function IndexPage() {
  const screens = getScreens()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>MEGINN — экраны</h1>
        <p className={styles.subtitle}>
          Static screens assembled from the design system. Logic and data are a separate step.
        </p>
      </div>
      <div className={styles.grid}>
        {screens.map(screen => (
          <Link key={screen.id} to={resolveRoute(screen.route)} className={styles.card}>
            <div className={styles.cardName}>{screen.name}</div>
            <div className={styles.cardDesc}>{screen.description}</div>
            <div className={styles.cardRoute}>{screen.route}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
