import React from 'react';
import PropTypes from 'prop-types';

const Desktop = ({ icons, onIconClick }) => {
  return (
    <div className="win98-desktop">
      <div className="win98-desktop-icons">
        {icons.map((icon, index) => (
          <div 
            key={index} 
            className="win98-desktop-icon" 
            onClick={() => onIconClick(icon.name)}
          >
            <div className="win98-desktop-icon-image">
              {icon.icon}
            </div>
            <div className="win98-desktop-icon-text">
              {icon.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Desktop.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired
    })
  ).isRequired,
  onIconClick: PropTypes.func.isRequired
};

export default Desktop;
