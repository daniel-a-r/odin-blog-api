import styles from './PostEditor.module.css';
import { useState, useId } from 'react';
import { useLoaderData, Link } from 'react-router';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { formatDate, POST_ENDPOINT } from '@/utils/utils';
import { authInterceptor } from '@/utils/axios';

const PostEditor = () => {
  const data = useLoaderData();
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [isPublished, setIsPublished] = useState(data.published);
  const [updatedAt, setUpdatedAt] = useState(data.updatedAt);
  const titleId = useId();
  const bodyId = useId();
  const isPublishedId = useId();

  const updatePost = async (formData) => {
    const requestData = {
      title: formData.get('title'),
      body: formData.get('body'),
      published: Boolean(formData.get('published')),
    };

    try {
      const path = `${POST_ENDPOINT}${data.id}`;
      const response = await authInterceptor.put(path, requestData);
      const { post } = response.data;
      setTitle(post.title);
      setBody(post.body);
      setIsPublished(post.published);
      setUpdatedAt(post.updatedAt);
    } catch (error) {
      console.error(error);
    }
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
        <p>Updated: {formatDate(updatedAt)}</p>
        <p>Created: {formatDate(data.createdAt)}</p>
        <p>id: {data.id}</p>
        <button type='submit'>Save</button>
      </form>
    </>
  );
};

export default PostEditor;
