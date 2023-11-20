'use client';
import Image from 'next/image'
import styles from './page.module.css'
import CustomTextBox from './textbox'


export default function Home() {

  return (
    <main className={styles.main}>

      <div className={styles.center}>
          <CustomTextBox/>

      </div>


      
          

    </main>
  )

  
}
