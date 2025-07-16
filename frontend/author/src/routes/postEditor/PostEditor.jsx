import styles from './PostEditor.module.css';
import { useState, useId } from 'react';
import { useLocation, Link, Form } from 'react-router';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiPencil } from '@mdi/js';
import { formatDate } from '@/utils/utils';

const PostEditor = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState(state.title);
  const titleId = useId();
  const [body, setBody] = useState(state.body);
  const bodyId = useId();
  const [isPublished, setIsPublished] = useState(state.published);
  const isPublishedId = useId();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const updatePost = (formData) => {
    console.log('form submit');
    console.log(formData);
    const body = {
      title: formData.get('title'),
      body: formData.get('body'),
      published: formData.get('published') ? true : false,
    };
    console.log(body);
  };

  return (
    <>
      <header className={styles.header}>
        <Link to={'/dashboard'} className={styles.link}>
          <Icon path={mdiArrowLeft} size={1.375} className={styles.arrowLeft} />
        </Link>
        <h1>Post Editor</h1>
      </header>
      <form action={updatePost} className={styles.form}>
        <div className={styles.titleContainer}>
          <label htmlFor={titleId} className={styles.fieldName}>
            Title
          </label>
          <input
            id={titleId}
            name='title'
            type='text'
            defaultValue={title}
            // onChange={handleTitleChange}
            className={styles.titleText}
          />
        </div>
        <div className={styles.bodyContainer}>
          <label htmlFor={bodyId} className={styles.fieldName}>
            Body
          </label>
          <textarea
            name='body'
            id={bodyId}
            defaultValue={body}
            className={styles.bodyText}
          ></textarea>
        </div>
        <label htmlFor={isPublishedId}>Published:</label>
        <input
          id={isPublishedId}
          type='checkbox'
          name='published'
          defaultChecked={isPublished}
        />
        <p>Updated: {formatDate(state.updatedAt)}</p>
        <p>Created: {formatDate(state.createdAt)}</p>
        <p>id: {state.id}</p>
        <button type='submit'>Save</button>
      </form>
    </>
  );
};

export default PostEditor;
