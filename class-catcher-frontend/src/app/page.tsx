'use client';
import Image from 'next/image'
import styles from './page.module.css'
import CustomTextBox from './textbox'
import { AuthProvider, GoogleAuthButton } from './login';
// Import GoogleLogin from the @react-oauth/google package
import { GoogleLogin } from '@react-oauth/google';


export default function Home() {

  return (
    <AuthProvider>
      <main className={styles.main}>
        <div className={styles.center}>
          <CustomTextBox/>
        </div>
        <GoogleAuthButton />
      </main>
    </AuthProvider>
  
  );

}
