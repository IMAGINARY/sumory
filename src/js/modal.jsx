import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Modal(props) {
  const { children, onClose, showCloseButton } = props;
  useEffect(() => {
    document.querySelector('body').classList.add('with-modal');
    return () => {
      document.querySelector('body').classList.remove('with-modal');
    };
  });
  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Fragment>
      <div className="overlay" />
      <div className={classnames('s-modal', { 's-modal-with-close': showCloseButton })}>
        { showCloseButton && (
          <button type="button" className="s-modal-close" onClick={handleClick}>
            <span className="fas fa-times" />
          </button>
        )}
        <div className="s-modal-content">
          { children }
        </div>
      </div>
    </Fragment>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
};

Modal.defaultProps = {
  children: null,
  onClose: null,
  showCloseButton: true,
};
