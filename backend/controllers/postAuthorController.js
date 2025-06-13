import prisma from '../prisma/client.js';

const createPost = async (req, res) => {
  const { title, body } = req.body;
  const { user } = req;

  if (user.role !== 'AUTHOR') {
    res.status(403).json({ message: 'Not an AUTHOR' });
    return;
  }

  await prisma.post.create({
    data: {
      title,
      body,
      authorId: user.id,
    },
  });

  res.json({ message: 'post created' });
};

const allPostsGet = async (req, res) => {
  const { user } = req;
  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
  });

  res.json(posts);
};

const singlePostGet = async (req, res) => {
  try {
    const { params, user } = req;

    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: params.id,
        authorId: user.id,
      },
    });

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'post not found' });
  }
};

const postUpdate = async (req, res) => {
  const { title, body } = req.body;
  const { user, params } = req;

  await prisma.post.update({
    where: {
      id: params.id,
      authorId: user.id,
    },
    data: {
      title,
      body,
    },
  });

  res.json({ message: 'post updated', id: params.id });
};

const postDelete = async (req, res) => {
  const { user, params } = req;

  await prisma.post.delete({
    where: {
      id: params.id,
      authorId: user.id,
    },
  });

  res.json({ message: 'post deleted' });
};

export default {
  createPost,
  allPostsGet,
  singlePostGet,
  postUpdate,
  postDelete,
};
