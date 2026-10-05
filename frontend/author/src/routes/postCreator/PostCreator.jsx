import styles from './PostCreator.module.css';
import { Link, useNavigate } from 'react-router';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { POST_ENDPOINT } from '@/utils/utils';
import api from '@/utils/axios';
import PostForm from '@/components/PostForm';
import { useAuth } from '@/app/AuthContext';
import _ from 'lodash';
import { useEffect } from 'react';

const PostCreator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const createPost = async (formData) => {
    const requestData = {
      title: formData.get('title'),
      body: formData.get('body'),
      published: Boolean(formData.get('published')),
    };

    try {
      const path = `${POST_ENDPOINT}`;
      await api.post(path, requestData);
      return navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (_.isEmpty(user)) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <header className={styles.header}>
        <Link to={'/dashboard'} className={styles.link}>
          <Icon path={mdiArrowLeft} size={1.375} className={styles.arrowLeft} />
        </Link>
        <h1>Create Post</h1>
      </header>
      <PostForm
        formAction={createPost}
        styles={styles}
        formType={'create'}
        submitText={'Create'}
      />
    </>
  );
};

export default PostCreator;
