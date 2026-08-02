import { useId } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@/utils/utils';

const PostForm = ({
  formAction,
  styles,
  formType,
  submitText,
  data,
  states,
  handleOpenModal,
}) => {
  const titleId = useId();
  const bodyId = useId();
  const isPublishedId = useId();

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.titleContainer}>
        <label htmlFor={titleId} className={styles.fieldName}>
          Title
        </label>
        <input
          id={titleId}
          name='title'
          type='text'
          className={styles.titleText}
          required={true}
          defaultValue={formType === 'edit' ? states.title : null}
        />
      </div>
      <div className={styles.bodyContainer}>
        <label htmlFor={bodyId} className={styles.fieldName}>
          Body
        </label>
        <textarea
          name='body'
          id={bodyId}
          className={styles.bodyText}
          rows='15'
          minLength={1}
          required={true}
          defaultValue={formType === 'edit' ? states.body : null}
        ></textarea>
      </div>
      <div className={styles.checkboxContainer}>
        <label htmlFor={isPublishedId}>Published:</label>
        <input
          id={isPublishedId}
          type='checkbox'
          name='published'
          className={styles.checkbox}
          defaultChecked={formType === 'edit' ? states.isPublished : false}
        />
      </div>
      {formType === 'edit' ? (
        <>
          <p>Updated: {formatDate(states.updatedAt)}</p>
          <p>Created: {formatDate(data.createdAt)}</p>
          <p>id: {data.id}</p>
        </>
      ) : null}
      <div className={styles.buttonContainer}>
        <button type='submit'>{submitText}</button>
        {formType === 'edit' ? (
          <button type='button' onClick={handleOpenModal}>
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
};

PostForm.propTypes = {
  formAction: PropTypes.func.isRequired,
  styles: PropTypes.exact({
    form: PropTypes.string.isRequired,
    titleContainer: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    bodyContainer: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    buttonContainer: PropTypes.string.isRequired,
    checkboxContainer: PropTypes.string.isRequired,
    checkbox: PropTypes.string.isRequired,
    delete: PropTypes.string.isRequired,
  }).isRequired,
  formType: PropTypes.oneOf(['create', 'edit']).isRequired,
  submitText: PropTypes.oneOf(['Edit', 'Save']).isRequired,
  data: PropTypes.exact({
    createdAt: PropTypes.string.required,
    id: PropTypes.string.isRequired,
  }),
  states: PropTypes.exact({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
  handleOpenModal: PropTypes.func,
};

export default PostForm;
