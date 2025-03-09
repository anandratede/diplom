import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import styles from '../styles/event.module.css';

export default function Event() {
  const [events, setEvents] = useState([]);
  const [workers, setWorkers] = useState([]); // Initialize workers as an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    workerIds: [], // Array of selected worker IDs
  });
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // Track the event being edited
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility
  const router = useRouter();

  // Load events and workers from localStorage on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
    }
    // Load events and ensure all events have a `workerIds` property
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = storedEvents.map((event) => ({
      ...event,
      workerIds: Array.isArray(event.workerIds) ? event.workerIds : [],
    }));
    // Load workers
    const storedWorkers = JSON.parse(localStorage.getItem('workers')) || [];
    setEvents(updatedEvents);
    setWorkers(storedWorkers);
  }, []);

  // Add or Update Event
  const handleAddOrUpdateEvent = () => {
    if (editingEvent !== null) {
      // Update existing event
      const updatedEvents = events.map((event, index) =>
        index === editingEvent ? newEvent : event
      );
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setEditingEvent(null); // Reset editing state
    } else {
      // Add new event with `workerIds` initialized
      const updatedEvents = [...events, { ...newEvent, workerIds: [] }];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
    setNewEvent({ title: '', date: '', description: '', workerIds: [] }); // Reset form
    setShowModal(false); // Close modal
  };

  // Delete Event
  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  // Edit Event
  const handleEditEvent = (index) => {
    const eventToEdit = events[index];
    setNewEvent(eventToEdit);
    setEditingEvent(index);
    setShowModal(true);
  };

  // Reset Modal for Adding a New Event
  const handleAddEventClick = () => {
    setNewEvent({ title: '', date: '', description: '', workerIds: [] }); // Reset form fields
    setEditingEvent(null); // Ensure editingEvent is null for "Add Event" mode
    setShowModal(true); // Open the modal
  };

  // Handle Worker Selection
  const toggleWorkerSelection = (workerId) => {
    if (newEvent.workerIds.includes(workerId)) {
      // If already selected, remove it
      setNewEvent({
        ...newEvent,
        workerIds: newEvent.workerIds.filter((id) => id !== workerId),
      });
    } else {
      // Otherwise, add it to the list
      setNewEvent({
        ...newEvent,
        workerIds: [...newEvent.workerIds, workerId],
      });
    }
  };

  // Filter events based on search term
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Event Dashboard</h1>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search events..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add Event Button */}
        <div className={styles.addButtonContainer}>
          <button onClick={handleAddEventClick} className={styles.addButton}>
            Add Event
          </button>
        </div>

        {/* Modal for Adding/Editing Event */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{editingEvent !== null ? 'Edit Event' : 'Add Event'}</h2>
              <input
                type="text"
                placeholder="Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className={styles.inputField}
              />
              <input
                type="date"
                placeholder="Date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className={styles.inputField}
              />
              <textarea
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className={styles.inputField}
                rows="3"
              />
              <div>
                <div className={styles.dropdownContainer}>
                  <button
                    className={styles.dropdownButton}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    Select Workers
                  </button>
                  {isDropdownOpen && (
                    <div className={styles.dropdownContent}>
                      {Array.isArray(workers) &&
                        workers.map((worker, index) => (
                          <div key={index} className={styles.dropdownItem}>
                            <input
                              type="checkbox"
                              id={`worker-${index}`}
                              checked={newEvent.workerIds.includes(index)}
                              onChange={() => toggleWorkerSelection(index)}
                            />
                            <label htmlFor={`worker-${index}`}>
                              {worker.name} {worker.surname}
                            </label>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.modalButtons}>
                <button onClick={handleAddOrUpdateEvent} className={styles.addButton}>
                  {editingEvent !== null ? 'Update Event' : 'Add Event'}
                </button>
                <button onClick={() => setShowModal(false)} className={styles.closeButton}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <h2 className={styles.sectionTitle}>Events List</h2>
        <div className={styles.eventsContainer}>
          {/* Header Row */}
          <div className={styles.gridHeader}>
            <div>Title</div>
            <div>Date</div>
            <div>Workers</div>
            <div>Description</div>
            <div>Actions</div>
          </div>

          {/* Events Rows */}
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div key={index} className={styles.eventRow}>
                <div data-label="Title">{event.title}</div>
                <div data-label="Date">{event.date}</div>
                <div data-label="Workers">
                  {Array.isArray(event.workerIds) &&
                    event.workerIds
                      .map((workerId) => `${workers[workerId]?.name} ${workers[workerId]?.surname}`)
                      .join(', ') || 'No workers assigned'}
                </div>
                <div data-label="Description">{event.description}</div>
                <div data-label="Actions" className={styles.actions}>
                  <button onClick={() => handleEditEvent(index)} className={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteEvent(index)} className={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noEvents}>No events found.</div>
          )}
        </div>
      </div>
    </div>
  );
}