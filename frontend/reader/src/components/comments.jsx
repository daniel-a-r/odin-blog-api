import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from '@/components/ui/item';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { READER_POST_ENDPOINT } from '@/utils/endpoints';
import api from '@/utils/api';
import { useParams } from 'react-router';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Comments = ({ comments, setComments }) => {
  const { user } = useAuth();
  const params = useParams();

  const handleCommentSubmit = async (formData) => {
    const body = {
      content: formData.get('comment'),
    };

    try {
      const { data } = await api.post(
        `${READER_POST_ENDPOINT}${params.postId}/comment`,
        body,
        {
          withCredentials: true,
        },
      );

      const newComment = { ...data, commenter: { username: user.username } };
      setComments((comments) => [...comments, newComment]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await api.delete(
        `${READER_POST_ENDPOINT}${params.postId}/comment/${commentId}`,
      );
      setComments((comments) =>
        comments.filter((comment) => comment.id !== commentId),
      );
    } catch (e) {
      if (e.status === 404 || e.status === 403) {
        console.warn(e.response.data.message);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <>
      {comments.length > 0 && (
        <>
          <h1>Comments</h1>
          <ul className='flex flex-col gap-4'>
            {comments.map((comment) => (
              <li key={comment.id}>
                <Item variant='outline'>
                  <ItemContent>
                    <ItemTitle>{comment.commenter.username}</ItemTitle>
                    <ItemDescription>{comment.content}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    {comment.commenterId === user.id && (
                      <Button
                        variant='outline'
                        onClick={() => handleCommentDelete(comment.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </ItemActions>
                </Item>
              </li>
            ))}
          </ul>
        </>
      )}
      {_.isEmpty(user) ? (
        <p>Log in to post a comment</p>
      ) : (
        <form action={handleCommentSubmit} id='commentForm'>
          <FieldGroup>
            <Field>
              <FieldLabel>Add a comment</FieldLabel>
              <Textarea name='comment' required />
            </Field>
            <Field orientation='horizontal'>
              <Button type='submit'>Submit</Button>
            </Field>
          </FieldGroup>
        </form>
      )}
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  setComments: PropTypes.func.isRequired,
};

export default Comments;
