import styles from './PostEditor.module.css';
import { useLocation, Link } from 'react-router';
import { formatDate } from '@/utils/utils';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const AuthorPost = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      <header className={styles.header}>
        <Link to={'/dashboard'} className={styles.link}>
          <Icon path={mdiArrowLeft} size={1.375} className={styles.arrowLeft} />
        </Link>
        <h1>Post Editor</h1>
      </header>

      <h2>{state.title}</h2>
      <p>{state.body}</p>
      <p>Updated: {formatDate(state.updatedAt)}</p>
      <p>Created: {formatDate(state.createdAt)}</p>
      <p>Published: {String(state.published)}</p>
      <p>id: {state.id}</p>
    </>
  );
};

export default AuthorPost;
