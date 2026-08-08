import { useLoaderData } from 'react-router';

const Home = () => {
  const posts = useLoaderData();

  console.log('Posts in Home component:', posts);

  return <>Hello world</>;
};

export default Home;
