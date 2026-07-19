import styles from './PostCreator.module.css';
import { Link } from 'react-router';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { POST_ENDPOINT } from '@/utils/utils';
import { authInterceptor } from '@/utils/axios';
import PostForm from '@/components/PostForm';

const PostCreator = () => {
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
