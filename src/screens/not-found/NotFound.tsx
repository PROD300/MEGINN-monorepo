import { useNavigate } from 'react-router-dom'
import { AppTopBar, AppSidebar, Button } from '../../components'
import { registerScreen } from '../registry'
import styles from './NotFound.module.css'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar />

        <main className={styles.main}>
          <div className={styles.card}>
            <span className={styles.code}>404</span>
            <div className={styles.divider} />
            <span className={styles.title}>Page not found</span>
            <span className={styles.description}>
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. Check
              the URL and try again.
            </span>
            <div className={styles.cta}>
              <Button variant="primary" size="sm" className={styles.ctaBtn} onClick={() => navigate('/portfolio')}>
                Back to Portfolio
              </Button>
              <Button variant="primary" size="sm" className={styles.ctaBtn} onClick={() => navigate('/portfolio')}>
                Go to Dashboard
              </Button>
            </div>
            <a href="#" className={styles.supportLink}>Need help? Contact support →</a>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'not-found',
  name: 'Not Found',
  description: '404 error page with navigation back to Portfolio or Dashboard',
  route: '/not-found',
  component: NotFound,
})
