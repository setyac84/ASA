import styles from './Navigation.module.css'

type NavigationProps = {
  currentSection: number
  totalSections: number
  onNavigate: (index: number) => void
}

export default function Navigation({ currentSection, totalSections, onNavigate }: NavigationProps) {
  return (
    <div className={styles.navigation}>
      {Array.from({ length: totalSections }, (_, i) => (
        <button
          key={i}
          className={`${styles.dot} ${currentSection === i ? styles.active : ''}`}
          onClick={() => onNavigate(i)}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  )
}