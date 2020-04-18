import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function Dropdown(props) {
  const {
    children, items, selected, onSelect, className,
  } = props;
  const [open, setOpen] = useState(false);

  const openDropdown = (ev) => { ev.preventDefault(); ev.stopPropagation(); setOpen(true); };
  const closeDropdown = () => { setOpen(false); };

  useEffect(() => {
    window.addEventListener('click', closeDropdown);
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div className={classnames('s-dropdown', className, { open })}>
      <button type="button" className={classnames('s-btn trigger', { active: open })} onClick={openDropdown}>
        { children }
        { selected
          && items[selected]
          && <span className="selected-value">{items[selected]}</span>
        }
      </button>
      <div className="s-dropdown-menu">
        {
          Object.entries(items).map(([key, value]) => (
            <button
              className="s-dropdown-item"
              key={key}
              type="button"
              onClick={onSelect.bind(null, key)}
            >
              {value}
            </button>
          ))
        }
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  items: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
};

Dropdown.defaultProps = {
  children: null,
  selected: null,
  className: '',
  onSelect: () => {},
};
