import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const TaskBar = ({ openWindows, onWindowClick, activeWindow, time }) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const startMenuRef = useRef(null);

  const toggleStartMenu = useCallback((e) => {
    e.stopPropagation();
    setStartMenuOpen(prev => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (startMenuRef.current && !startMenuRef.current.contains(event.target)) {
      setStartMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (startMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [startMenuOpen, handleClickOutside]);

  return (
    <div className="win98-taskbar">
      <div className="win98-taskbar-left">
        <button 
          className={`win98-start-button ${startMenuOpen ? 'active' : ''}`} 
          onClick={toggleStartMenu}
        >
          <span className="win98-start-icon">
            <img src="/windows-logo.png" alt="Start" className="win98-start-logo" />
          </span>
          <span>Start</span>
        </button>
        
        {startMenuOpen && (
          <div className="win98-start-menu" ref={startMenuRef}>
            <div className="win98-start-menu-header">
              <span>Windows 98</span>
            </div>
            <div className="win98-start-menu-items">
              <div className="win98-start-menu-item">
                <span className="win98-start-menu-icon">📁</span>
                <span>My Documents</span>
              </div>
              <div className="win98-start-menu-item">
                <span className="win98-start-menu-icon">🌐</span>
                <span>Internet Explorer</span>
              </div>
              <div className="win98-start-menu-item">
                <span className="win98-start-menu-icon">🎮</span>
                <span>Games</span>
              </div>
              <div className="win98-start-menu-separator"></div>
              <div className="win98-start-menu-item">
                <span className="win98-start-menu-icon">❓</span>
                <span>Help</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="win98-taskbar-middle">
        {openWindows.map((window, index) => (
          <button
            key={index}
            className={`win98-taskbar-item ${activeWindow === window ? 'active' : ''}`}
            onClick={() => onWindowClick(window)}
          >
            <span>{window}</span>
          </button>
        ))}
      </div>

      <div className="win98-taskbar-right">
        <div className="win98-taskbar-time">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      
      {startMenuOpen && (
        <div 
          className="win98-start-menu-overlay"
          onClick={handleClickOutside}
        />
      )}
    </div>
  );
};

TaskBar.propTypes = {
  openWindows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onWindowClick: PropTypes.func.isRequired,
  activeWindow: PropTypes.string,
  time: PropTypes.instanceOf(Date).isRequired
};

TaskBar.defaultProps = {
  openWindows: [],
  time: new Date()
};

export default TaskBar;
