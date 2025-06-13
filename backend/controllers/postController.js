import prisma from '../prisma/client.js';

const allPostsGet = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

export default { allPostsGet }