import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle Login Functionality
  const handleLogin = () => {
    const adminCredentials = {
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    };
    const workerCredentials = {
      email: 'worker@example.com',
      password: 'worker123',
      role: 'worker',
    };

    if (
      (email === adminCredentials.email && password === adminCredentials.password) ||
      (email === workerCredentials.email && password === workerCredentials.password)
    ) {
      const currentUser = email === adminCredentials.email ? adminCredentials : workerCredentials;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      router.push(currentUser.role === 'admin' ? '/dashboard' : '/worker');
    } else {
      alert('Invalid credentials');
    }
  };

  // Handle Key Press (Enter Key)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(); // Trigger login when Enter is pressed
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['login-box']}>
        <h1 className={styles.loginTitle}>Login</h1>
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for key presses
        />
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for key presses
        />
        {/* Login Button */}
        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}