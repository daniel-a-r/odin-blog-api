import prisma from '../prisma/client.js';

/**
 * Get all published posts from Authors for Reader user
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
 * Get a single published post from an Author for Reader user
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const singlePostGet = async (req, res) => {
  try {
    const { params } = req;

    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: params.postId,
        published: true,
      },
    });

    res.json({ post });
  } catch (ignoreError) {
    res.status(404).json({ message: 'post not found' });
  }
};

/**
 * Create a comment on a published post.
 * Throws an error if the requested post is not published.
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const commentPost = async (req, res) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        post: {
          connect: {
            id: req.params.postId,
            published: true,
          },
        },
        commenter: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    if (comment.code === 'P2025') {
      throw new Error(comment);
    }

    res.json(comment);
  } catch (ignoreError) {
    res.status(404).json({ message: 'post not found' });
  }
};

/**
 * Get all comments on a published post.
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const allCommentsGet = async (req, res) => {
  try {
    const allComments = await prisma.comment.findMany({
      where: {
        post: {
          id: req.params.postId,
          published: true,
        },
      },
    });
    req.json(allComments);
  } catch (ignoreError) {
    res.status(400);
  }
};

/**
 * Delete a comment on a published post from the currently authenticated user.
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const commentDelete = async (req, res) => {
  await prisma.comment.delete({
    where: {
      post: {
        id: req.params.postId,
        published: true,
      },
      id: req.params.commentId,
      commenterId: req.user.id,
    },
  });
  res.json({ message: 'comment deleted' });
};

export default {
  allPostsGet,
  singlePostGet,
  commentPost,
  allCommentsGet,
  commentDelete,
};
