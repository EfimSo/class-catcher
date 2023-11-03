import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <div className={styles.loginContainer}>
          <h1>Class-Catcher</h1> 
            <div className={styles.textbox}>
            <i className = "userInput"></i>
            <input type="text" placeholder="Adress"></input>
          </div>
        </div> 
      </div>

    </main>
  )
}
