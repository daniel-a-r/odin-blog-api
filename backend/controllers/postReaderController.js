import prisma from '../prisma/client.js';

const allPostsGet = async (_req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });

  res.json(posts);
};

const singlePostGet = async (req, res) => {
  try {
    const { params } = req;

    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: params.id,
        published: true,
      },
    });

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'post not found' });
  }
};

export default {
  allPostsGet,
  singlePostGet,
};
