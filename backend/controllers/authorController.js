import prisma from '../prisma/client.js';

/**
 * Checks if the current user has a role of author
 * @param {Request} req  Express request
 * @param {Response} res Express response
 * @param {*} next next middleware function
 * @returns {void}
 */
const isAuthor = (req, res, next) => {
  const { user } = req;
  if (user.role !== 'AUTHOR') {
    res.status(403).json({ message: "not an 'AUTHOR'" });
    return;
  }
  next();
};

/**
 * Create a post from an Author user
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const createPost = async (req, res) => {
  const { title, body } = req.body;
  const { user } = req;

  await prisma.post.create({
    data: {
      title,
      body,
      authorId: user.id,
    },
  });

  res.json({ message: 'post created' });
};

/**
 * Get all unpublished and published posts for an Author user
 * @param {Request} req  Express request
 * @param {Response} res Express response
 */
const allPostsGet = async (req, res) => {
  const { user } = req;
  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
  });

  res.json(posts);
};

/**
 * Get a single post for an Author user
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
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
  } catch (ignoreError) {
    res.status(404).json({ message: 'post not found' });
  }
};

/**
 * Update a single post for an Author user
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const postUpdate = async (req, res) => {
  const { title, body, published } = req.body;
  const { user, params } = req;

  const data = await prisma.post.update({
    where: {
      id: params.id,
      authorId: user.id,
    },
    data: {
      title,
      body,
      published,
    },
  });

  res.json({ message: 'post sucessfully updated', post: data });
};

/**
 * Delete a single post for an Author user
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const postDelete = async (req, res) => {
  const { user, params } = req;

  await prisma.post.delete({
    where: {
      id: params.id,
      authorId: user.id,
    },
  });

  res.json({ message: 'post deleted', id: params.id });
};

export default {
  isAuthor,
  createPost,
  allPostsGet,
  singlePostGet,
  postUpdate,
  postDelete,
};
