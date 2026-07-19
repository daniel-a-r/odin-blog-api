import styles from './PostEditor.module.css';
import { useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { POST_ENDPOINT } from '@/utils/utils';
import { authInterceptor } from '@/utils/axios';
import PostForm from '@/components/PostForm';

const PostEditor = () => {
  const data = useLoaderData();
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [isPublished, setIsPublished] = useState(data.published);
  const [updatedAt, setUpdatedAt] = useState(data.updatedAt);

  const states = { title, body, isPublished, updatedAt };

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
      <PostForm
        formAction={updatePost}
        styles={styles}
        formType={'edit'}
        submitText={'Save'}
        data={data}
        states={states}
      />
    </>
  );
};

export default PostEditor;
