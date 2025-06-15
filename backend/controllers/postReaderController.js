import prisma from '../prisma/client.js';

/**
 * Get all published posts from Authors for Readers
 * @param {Request} _req Express request
 * @param {Response} res Express response 
 */
const allPostsGet = async (_req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });

  res.json(posts);
};

/**
 * Get a single published post from an Author for
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
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
