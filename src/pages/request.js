import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import styles from '../styles/request.module.css';

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    type: '',
    status: 'Pending',
  });
  const [showModal, setShowModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered row index
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
    }
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    setRequests(storedRequests);
  }, []);

  const handleAddOrUpdateRequest = () => {
    if (editingRequest !== null) {
      const updatedRequests = requests.map((request, index) =>
        index === editingRequest ? newRequest : request
      );
      setRequests(updatedRequests);
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
      setEditingRequest(null);
    } else {
      const updatedRequests = [...requests, newRequest];
      setRequests(updatedRequests);
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
    }
    setNewRequest({ title: '', description: '', type: '', status: 'Pending' });
    setShowModal(false);
  };

  const handleDeleteRequest = (index) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    setRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
  };

  const handleEditRequest = (index) => {
    const requestToEdit = requests[index];
    setNewRequest(requestToEdit);
    setEditingRequest(index);
    setShowModal(true);
  };

  const handleStatusChange = (index, status) => {
    const updatedRequests = requests.map((request, i) =>
      i === index ? { ...request, status } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Request Dashboard</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search requests..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.addButtonContainer}>
          <button onClick={() => setShowModal(true)} className={styles.addButton}>
            Add Request
          </button>
        </div>

        {/* Modal for Adding/Editing Request */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{editingRequest !== null ? 'Edit Request' : 'Add Request'}</h2>
              <input
                type="text"
                placeholder="Title"
                value={newRequest.title}
                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                className={styles.inputField}
              />
              <textarea
                placeholder="Description"
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                className={styles.inputField}
                rows="3"
              />
              <input
                type="text"
                placeholder="Type (e.g., Meeting, Event)"
                value={newRequest.type}
                onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                className={styles.inputField}
              />
              <div className={styles.modalButtons}>
                <button onClick={handleAddOrUpdateRequest} className={styles.addButton}>
                  {editingRequest !== null ? 'Update Request' : 'Add Request'}
                </button>
                <button onClick={() => setShowModal(false)} className={styles.closeButton}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Requests List */}
        <h2 className={styles.sectionTitle}>Requests List</h2>
        <div className={styles.requestsContainer}>
          <div className={styles.gridHeader}>
            <div>Title</div>
            <div>Type</div>
            <div>Status</div>
            <div>Description</div>
            <div>Actions</div>
          </div>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <div
                key={index}
                className={styles.requestRow}
                onMouseEnter={() => setHoveredIndex(index)} // Show buttons on hover
                onMouseLeave={() => setHoveredIndex(null)} // Hide buttons on leave
              >
                <div data-label="Title">{request.title}</div>
                <div data-label="Type">{request.type}</div>
                <div data-label="Status">{request.status}</div>
                <div data-label="Description">{request.description}</div>
                <div data-label="Actions" className={styles.actions}>
                  {/* Always visible buttons */}
                  <button onClick={() => handleEditRequest(index)} className={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteRequest(index)} className={styles.deleteButton}>
                    Delete
                  </button>

                  {/* Buttons visible only on hover */}
                  {hoveredIndex === index && (
                    <>
                      <button
                        onClick={() => handleStatusChange(index, 'Approved')}
                        className={styles.approveButton}
                        disabled={request.status !== 'Pending'}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(index, 'Rejected')}
                        className={styles.rejectButton}
                        disabled={request.status !== 'Pending'}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatusChange(index, 'Canceled')}
                        className={styles.cancelButton}
                        disabled={request.status === 'Canceled'}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noRequests}>No requests found.</div>
          )}
        </div>
      </div>
    </div>
  );
}