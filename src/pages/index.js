import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Redirecting...</title>
      </Head>
      <main>
        <h1 className={styles.title}>Redirecting to Login...</h1>
      </main>
    </div>
  );
}
