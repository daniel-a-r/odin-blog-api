import { useLocation } from 'react-router';
import { format } from 'date-fns';

const AuthorPost = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      <h2>{state.title}</h2>
      <p>{state.body}</p>
      <p>Updated: {format(state.updatedAt, 'PP p')}</p>
      <p>Created: {format(state.createdAt, 'PP p')}</p>
      <p>Published: {String(state.published)}</p>
      <p>id: {state.id}</p>
    </>
  );
};

export default AuthorPost;
