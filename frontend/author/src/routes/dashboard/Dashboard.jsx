import { useLoaderData } from "react-router";

const Dashboard = () => {
  const { data } = useLoaderData();
  console.log(data);

  return <h1>dashboard</h1>
}

export default Dashboard;