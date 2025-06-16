import prisma from '../../prisma/client.js';

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
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'post not found' });
  }
};

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
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

const commentDelete = async (req, res) => {
  await prisma.comment.delete({
    where: {
      post: {
        id: req.params.postId,
        published: true,
      },
      id: req.params.commentId,
    },
  });
  res.json({ message: 'comment deleted' });
};

export default {
  commentPost,
  allCommentsGet,
  commentDelete,
};
