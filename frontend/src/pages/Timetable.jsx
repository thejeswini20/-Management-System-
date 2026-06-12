import React, { useState, useEffect } from 'react';
import { timetable } from '../data/data';
import './PageStyles.css';

// Extracted Slot component for better reusability
const SlotCard = ({ slot }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="slot-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s ease'
      }}
    >
      <div className="slot-time-badge">
        <span className="time-icon">⏰</span>
        <span className="slot-time">{slot.time}</span>
      </div>

      <div className="slot-content">
        <h4 className="slot-course">{slot.course}</h4>

        <div className="slot-details">
          <div className="detail-item">
            <span className="detail-icon">👤</span>
            <span>{slot.instructor}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🏠</span>
            <span>{slot.room}</span>
          </div>
        </div>

        <div className="slot-footer">
          <span className={`batch-badge batch-${slot.batch.toLowerCase().replace(/\s+/g, '-')}`}>
            {slot.batch}
          </span>
          {slot.level && (
            <span className={`level-indicator level-${slot.level.toLowerCase()}`}>{slot.level}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Extracted DayColumn component
const DayColumn = ({ day, slots, isToday }) => {
  return (
    <div className={`day-column ${isToday ? 'today-highlight' : ''}`}>
      <div className="day-header">
        <div className="day-name">{day}</div>
        <div className="day-date">
          {isToday && <span className="today-badge">Today</span>}
        </div>
      </div>

      <div className="slots-container">
        {slots.length > 0 ? (
          slots.map((slot, index) => (
            <SlotCard key={`${slot.time}-${index}`} slot={slot} />
          ))
        ) : (
          <div className="empty-slots">
            <span>🎉</span>
            <p>No classes scheduled</p>
            <small>Enjoy your day off!</small>
          </div>
        )}
      </div>
    </div>
  );
};

// Filter and Search component
const TimetableControls = ({ onFilterChange, batches, levels }) => {
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const handleBatchChange = (batch) => {
    setSelectedBatch(batch);
    onFilterChange({ batch: batch === 'all' ? null : batch, level: selectedLevel === 'all' ? null : selectedLevel });
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    onFilterChange({ batch: selectedBatch === 'all' ? null : selectedBatch, level: level === 'all' ? null : level });
  };

  return (
    <div className="timetable-controls">
      <div className="filter-group">
        <label className="filter-label">Filter by Batch:</label>
        <select
          className="filter-select"
          value={selectedBatch}
          onChange={(e) => handleBatchChange(e.target.value)}
        >
          <option value="all">All Batches</option>
          {batches.map(batch => (
            <option key={batch} value={batch}>{batch}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Filter by Level:</label>
        <select
          className="filter-select"
          value={selectedLevel}
          onChange={(e) => handleLevelChange(e.target.value)}
        >
          <option value="all">All Levels</option>
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Main Timetable Component
export default function Timetable() {
  const [filters, setFilters] = useState({ batch: null, level: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get current day to highlight today's column
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();

  // Extract unique batches and levels for filters
  const getAllBatches = () => {
    const batches = new Set();
    timetable.forEach(day => {
      day.slots.forEach(slot => {
        batches.add(slot.batch);
      });
    });
    return Array.from(batches);
  };

  const getAllLevels = () => {
    const levels = new Set();
    timetable.forEach(day => {
      day.slots.forEach(slot => {
        if (slot.level) levels.add(slot.level);
      });
    });
    return Array.from(levels);
  };

  // Filter slots based on selected filters
  const getFilteredTimetable = () => {
    if (!filters.batch && !filters.level) return timetable;

    return timetable.map(day => ({
      ...day,
      slots: day.slots.filter(slot => {
        const batchMatch = !filters.batch || slot.batch === filters.batch;
        const levelMatch = !filters.level || slot.level === filters.level;
        return batchMatch && levelMatch;
      })
    }));
  };

  const filteredTimetable = getFilteredTimetable();
  const allBatches = getAllBatches();
  const allLevels = getAllLevels();

  return (
    <div className="page-wrapper page-fade-in">
      {/* Hero Section - Positioned just below the Rhythmique logo */}
      <div className="timetable-hero" style={{
        background: 'linear-gradient(135deg, #b45309, #7c3aed)',
        marginTop: '0', /* Remove any top margin to sit directly below logo */
        padding: '3rem 2rem',
        borderRadius: '0 0 20px 20px'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="pre-label-white" style={{
            fontSize: '0.9rem',
            letterSpacing: '2px',
            marginBottom: '1rem'
          }}>
            📅 Schedule
          </p>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Weekly Timetable
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Plan your dance journey with our structured classes
          </p>
        </div>
      </div>

      <section className="section" style={{ marginTop: '2rem' }}>
        <div className="container">
          {/* Controls Section */}
          {(allBatches.length > 1 || allLevels.length > 0) && (
            <TimetableControls
              onFilterChange={setFilters}
              batches={allBatches}
              levels={allLevels}
            />
          )}

          {/* Stats Summary */}
          <div className="timetable-stats">
            <div className="stat-card">
              <span className="stat-number">{timetable.reduce((acc, day) => acc + day.slots.length, 0)}</span>
              <span className="stat-label">Total Classes</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{allBatches.length}</span>
              <span className="stat-label">Batches</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{timetable.length}</span>
              <span className="stat-label">Days</span>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="timetable-grid">
            {filteredTimetable.map(dayData => (
              <DayColumn
                key={dayData.day}
                day={dayData.day}
                slots={dayData.slots}
                isToday={dayData.day === currentDay}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="timetable-legend">
            <h4>Legend</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color today-highlight"></div>
                <span>Today's Classes</span>
              </div>
              <div className="legend-item">
                <div className="legend-color beginner"></div>
                <span>Beginner Level</span>
              </div>
              <div className="legend-item">
                <div className="legend-color intermediate"></div>
                <span>Intermediate Level</span>
              </div>
              <div className="legend-item">
                <div className="legend-color advanced"></div>
                <span>Advanced Level</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
