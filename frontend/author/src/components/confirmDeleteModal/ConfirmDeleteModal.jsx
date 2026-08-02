import PropTypes from 'prop-types';

const ConfirmDeleteModal = ({
  isModalOpen,
  onConfirm,
  onCancel,
  title,
  id,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <h2>Are you sure you want to delete?</h2>
        <h3>{title}</h3>
        <p>id: {id}</p>
        <div className='modalButtons'>
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
