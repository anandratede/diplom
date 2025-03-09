import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import styles from '../styles/hr.module.css';

export default function HR() {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWorker, setNewWorker] = useState({ name: '', surname: '', email: '', phone: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null); // Track the worker being edited
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
    }
    const workers = JSON.parse(localStorage.getItem('workers')) || [];
    setWorkers(workers);
  }, []);

  // Add or Update Worker
  const handleAddOrUpdateWorker = () => {
    if (editingWorker !== null) {
      // Update existing worker
      const updatedWorkers = workers.map((worker, index) =>
        index === editingWorker ? newWorker : worker
      );
      setWorkers(updatedWorkers);
      localStorage.setItem('workers', JSON.stringify(updatedWorkers));
      setEditingWorker(null); // Reset editing state
    } else {
      // Add new worker
      const updatedWorkers = [...workers, newWorker];
      setWorkers(updatedWorkers);
      localStorage.setItem('workers', JSON.stringify(updatedWorkers));
    }
    setNewWorker({ name: '', surname: '', email: '', phone: '' }); // Reset form
    setShowModal(false); // Close modal
  };

  // Delete Worker
  const handleDeleteWorker = (index) => {
    const updatedWorkers = workers.filter((_, i) => i !== index);
    setWorkers(updatedWorkers);
    localStorage.setItem('workers', JSON.stringify(updatedWorkers));
  };

  // Edit Worker
  const handleEditWorker = (index) => {
    const workerToEdit = workers[index];
    setNewWorker(workerToEdit);
    setEditingWorker(index);
    setShowModal(true);
  };

  // Reset Modal for Adding a New Worker
  const handleAddWorkerClick = () => {
    setNewWorker({ name: '', surname: '', email: '', phone: '' }); // Reset form fields
    setEditingWorker(null); // Ensure editingWorker is null for "Add Worker" mode
    setShowModal(true); // Open the modal
  };

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.phone.includes(searchTerm)
  );

  return (
    <div className={styles.pageWrapper}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>HR Dashboard</h1>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search workers..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add Worker Button */}
        <div className={styles.addButtonContainer}>
          <button onClick={handleAddWorkerClick} className={styles.addButton}>
            Add Worker
          </button>
        </div>

        {/* Modal for Adding/Editing Worker */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{editingWorker !== null ? 'Edit Worker' : 'Add Worker'}</h2>
              <input
                type="text"
                placeholder="Name"
                value={newWorker.name}
                onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Surname"
                value={newWorker.surname}
                onChange={(e) => setNewWorker({ ...newWorker, surname: e.target.value })}
                className={styles.inputField}
              />
              <input
                type="email"
                placeholder="Email"
                value={newWorker.email}
                onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                className={styles.inputField}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newWorker.phone}
                onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                className={styles.inputField}
              />
              <div className={styles.modalButtons}>
                <button onClick={handleAddOrUpdateWorker} className={styles.addButton}>
                  {editingWorker !== null ? 'Update Worker' : 'Add Worker'}
                </button>
                <button onClick={() => setShowModal(false)} className={styles.closeButton}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Workers List */}
        <h2 className={styles.sectionTitle}>Workers List</h2>
        <div className={styles.workersContainer}>
          {/* Header Row */}
          <div className={styles.gridHeader}>
            <div>Name</div>
            <div>Surname</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Actions</div>
          </div>

          {/* Workers Rows */}
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker, index) => (
              <div
                key={index}
                className={styles.workerRow}
                onClick={() => router.push(`/worker/${index}`)} // Navigate to worker details
              >
                <div data-label="Name">{worker.name}</div>
                <div data-label="Surname">{worker.surname}</div>
                <div data-label="Email">{worker.email}</div>
                <div data-label="Phone">{worker.phone}</div>
                <div data-label="Actions" className={styles.actions}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditWorker(index);
                    }}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWorker(index);
                    }}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noWorkers}>No workers found.</div>
          )}
        </div>
      </div>
    </div>
  );
}