import React from 'react';
import PropTypes from 'prop-types';

const Window = ({ 
  title, 
  children, 
  isActive, 
  onClose, 
  onMinimize, 
  onClick, 
  iconComponent,
  showMenu = true,
  showStatusBar = true,
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`win98-window ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      <div className="win98-window-titlebar">
        <div className="win98-window-titlebar-left">
          {iconComponent && <span className="win98-window-icon">{iconComponent}</span>}
          <span className="win98-window-title">{title}</span>
        </div>
        <div className="win98-window-controls">
          {onMinimize && (
            <button 
              className="win98-window-control win98-window-minimize" 
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
            >
              <span>_</span>
            </button>
          )}
          <button 
            className="win98-window-control win98-window-close" 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <span>×</span>
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="win98-window-menu">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>
      )}
      <div className="win98-window-content">
        {children}
      </div>
      {showStatusBar && (
        <div className="win98-window-statusbar">
          <div className="win98-window-statusbar-item">Ready</div>
        </div>
      )}
    </div>
  );
};

Window.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onMinimize: PropTypes.func,
  onClick: PropTypes.func,
  iconComponent: PropTypes.node,
  showMenu: PropTypes.bool,
  showStatusBar: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

Window.defaultProps = {
  isActive: false,
  showMenu: true,
  showStatusBar: true,
  className: '',
  style: {}
};

export default Window;
