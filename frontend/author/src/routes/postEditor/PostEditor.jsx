import styles from './PostEditor.module.css';
import { useState } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { POST_ENDPOINT } from '@/utils/utils';
import { authInterceptor } from '@/utils/axios';
import PostForm from '@/components/PostForm';
import ConfirmDeleteModal from '@/components/confirmDeleteModal/ConfirmDeleteModal';

const PostEditor = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [isPublished, setIsPublished] = useState(data.published);
  const [updatedAt, setUpdatedAt] = useState(data.updatedAt);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const states = { title, body, isPublished, updatedAt };

  const handleCancel = () => setIsModalOpen(false);
  const handleConfirm = async () => {
    try {
      const path = `${POST_ENDPOINT}${data.id}`;
      await authInterceptor.delete(path);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  };
  const handleOpenModal = () => setIsModalOpen(true);

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
        handleOpenModal={handleOpenModal}
      />
      <ConfirmDeleteModal
        isModalOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={title}
        id={data.id}
      />
    </>
  );
};

export default PostEditor;
