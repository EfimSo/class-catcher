import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <div className={styles.loginContainer}>
          <h1>
            Class-Catcher
          </h1> 
        </div> 
      </div>

    </main>
  )
}
