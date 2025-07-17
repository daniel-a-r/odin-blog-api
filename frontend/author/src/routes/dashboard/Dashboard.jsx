import styles from './Dashboard.module.css';
import { useLoaderData, useNavigate, Link } from 'react-router';
import axios from '@/utils/axios';
import { LOGOUT_ENDPOINT, formatDate } from '@/utils/utils';

const Dashboard = () => {
  const { data } = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    await axios.get(LOGOUT_ENDPOINT, {
      withCredentials: true,
    });
    return navigate('/');
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Posts</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <ul className={styles.ul}>
        {data.map((post) => (
          <Link
            to={`/dashboard/${post.id}`}
            key={post.id}
            className={styles.link}
          >
            <li className={styles.li}>
              <h2 className={styles.h2}>{post.title}</h2>
              <p>{post.body}</p>
              <p>Published: {String(post.published)}</p>
              <p>Created at: {formatDate(post.createdAt)}</p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
