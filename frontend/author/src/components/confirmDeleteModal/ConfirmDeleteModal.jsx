import PropTypes from 'prop-types';
import styles from './ConfirmDeleteModal.module.css';

const ConfirmDeleteModal = ({
  isModalOpen,
  onConfirm,
  onCancel,
  title,
  id,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.h2}>Are you sure you want to delete?</h2>
        <h3 className={styles.h3}>{title}</h3>
        <p className={styles.p}>id: {id}</p>
        <div className={styles.buttonContainer}>
          <button type='button' onClick={onCancel}>
            Cancel
          </button>
          <button type='button' onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDeleteModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ConfirmDeleteModal;
