import React, { useEffect, useRef } from 'react';
import styles from './ConfirmationDialog.module.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      dialogRef.current?.focus();
      document.addEventListener('keydown', keyHandler);
    }

    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title">Confirm Deletion</h2>
        <p id="dialog-description">Are you sure you want to delete this post?</p>
        <div className={styles.buttons}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm} className={styles.danger}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
