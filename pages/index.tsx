import { useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  useEffect(() => {
    window.location.href="https://dongmin-jang.medium.com"
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>v-log.dev</title>
        <meta name="description" content="Loading..." />
      </Head>
    </div>
  )
}
