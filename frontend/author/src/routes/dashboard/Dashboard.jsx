import { useLoaderData } from 'react-router';
import axios from '@/utils/axios';
import { LOGOUT_ENDPOINT } from '@/utils/utils';
import { useNavigate, Link } from 'react-router';

const Dashboard = () => {
  const { data } = useLoaderData();
  const navigate = useNavigate();
  console.log(data);

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    await axios.get(LOGOUT_ENDPOINT, {
      withCredentials: true,
    });
    return navigate('/');
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {data.map((post) => (
          <Link to={`/dashboard/${post.id}`} key={post.id} state={post}>
            <li>
              <p>{post.title}</p>
              <p>{post.body}</p>
              <p>Published: {String(post.published)}</p>
              {post.createdAt !== post.updatedAt ? (
                <p>Updated at: {post.updatedAt}</p>
              ) : (
                <p>Created at: {post.createdAt}</p>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
