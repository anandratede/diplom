import { useRouter } from 'next/router';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar'; // Import the Sidebar component
import styles from '../../styles/workerDetail.module.css'; // Import custom CSS

export default function WorkerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const workers = JSON.parse(localStorage.getItem('workers')) || [];
  const worker = workers[id];

  if (!worker) {
    return <div className={styles.error}>Worker not found</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        {/* Back Button */}
        <Link href="/hr" className={styles.backButton}>
          ← Back to HR Dashboard
        </Link>

        {/* Worker Details */}
        <div className={styles.card}>
          <h1 className={styles.name}>
            {worker.name} {worker.surname}
          </h1>
          <p className={styles.detail}>
            <strong>Email:</strong> {worker.email}
          </p>
          <p className={styles.detail}>
            <strong>Phone:</strong> {worker.phone}
          </p>
        </div>
      </div>
    </div>
  );
}