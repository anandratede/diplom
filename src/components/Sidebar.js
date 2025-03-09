import { useRouter } from 'next/router';
import styles from '../styles/sidebar.module.css';

export default function Sidebar() {
  const router = useRouter();

  // Logout Functionality
  const handleLogout = () => {
    // Clear currentUser from localStorage
    localStorage.removeItem('currentUser');
    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div className={styles.sidebar}>
      {/* Title */}
      <h2 className={styles.sidebarTitle}>Event organizer</h2>

      {/* Navigation Links */}
      <ul className={styles.sidebarMenu}>
        <li>
          <a href="/dashboard" className={styles.sidebarLink}>
            Dashboard
          </a>
        </li>
        <li>
          <a href="/event" className={styles.sidebarLink}>
            Events
          </a>
        </li>
        <li>
          <a href="/hr" className={styles.sidebarLink}>
            HR
          </a>
        </li>
        <li>
          <a href="/request" className={styles.sidebarLink}>
            Requests
          </a>
        </li>
      </ul>

      {/* Logout Button */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}