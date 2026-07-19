import styles from './PostCreator.module.css';
import { useId } from 'react';
import { Link } from 'react-router';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { POST_ENDPOINT } from '@/utils/utils';
import { authInterceptor } from '@/utils/axios';

const PostCreator = () => {
  const titleId = useId();
  const bodyId = useId();
  const isPublishedId = useId();

  const createPost = async (formData) => {
    const requestData = {
      title: formData.get('title'),
      body: formData.get('body'),
      published: Boolean(formData.get('published')),
    };

    try {
      const path = `${POST_ENDPOINT}`;
      const response = await authInterceptor.post(path, requestData);
      const { post } = response.data;
      console.log(post);
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
        <h1>Create Post</h1>
      </header>
      <form action={createPost} className={styles.form}>
        <div className={styles.titleContainer}>
          <label htmlFor={titleId} className={styles.fieldName}>
            Title
          </label>
          <input
            id={titleId}
            name='title'
            type='text'
            minLength={1}
            maxLength={75}
            className={styles.titleText}
            required={true}
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
          ></textarea>
        </div>
        <div className={styles.checkboxContainer}>
          <label htmlFor={isPublishedId}>Published:</label>
          <input
            id={isPublishedId}
            type='checkbox'
            name='published'
            defaultChecked={false}
            className={styles.checkbox}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </>
  );
};

export default PostCreator;
