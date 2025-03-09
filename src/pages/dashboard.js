import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  // Static data for demonstration
  const totalEvents = 15;
  const totalWorkers = 25;
  const activeEvents = 10;
  const inactiveEvents = totalEvents - activeEvents;

  return (
    <div className={styles.pageWrapper}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Dashboard</h1>

        {/* Metrics Section */}
        <div className={styles.metricsContainer}>
          <div className={styles.metricCard}>
            <h3>Total Events</h3>
            <p>{totalEvents}</p>
          </div>
          <div className={styles.metricCard}>
            <h3>Total Workers</h3>
            <p>{totalWorkers}</p>
          </div>
          <div className={styles.metricCard}>
            <h3>Active Events</h3>
            <p>{activeEvents}</p>
          </div>
          <div className={styles.metricCard}>
            <h3>Inactive Events</h3>
            <p>{inactiveEvents}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className={styles.chartsContainer}>
          {/* Bar Chart Example */}
          <div className={styles.chartCard}>
            <h3>Event Status</h3>
            <div className={styles.barChart}>
              <div className={styles.bar}>
                <div
                  className={styles.activeBar}
                  style={{ width: `${(activeEvents / totalEvents) * 100}%` }}
                >
                  Active
                </div>
                <div
                  className={styles.inactiveBar}
                  style={{ width: `${(inactiveEvents / totalEvents) * 100}%` }}
                >
                  Inactive
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart Example */}
          <div className={styles.chartCard}>
            <h3>Worker Distribution</h3>
            <div className={styles.pieChart}>
              <div className={styles.pieSlice}>
                <div
                  className={styles.slice}
                  style={{
                    transform: `rotate(${(totalWorkers / 100) * 360}deg)`,
                  }}
                ></div>
                <span>{totalWorkers} Workers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}