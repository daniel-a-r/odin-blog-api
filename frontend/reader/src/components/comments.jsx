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

const Comments = () => {
  const { user } = useAuth();
  console.log(JSON.stringify(user));
  if (JSON.stringify(user) == '{}') {
    console.log('no user is logged in', user);
  } else {
    console.log('user:', user);
  }

  const handleSubmitComment = (formData) => {
    console.log(formData.get('comment'));
  };

  return (
    <>
      <h1>Comments</h1>
      <Item variant='outline'>
        <ItemContent>
          <ItemTitle>Item title</ItemTitle>
          <ItemDescription>Item description</ItemDescription>
        </ItemContent>
      </Item>
      {JSON.stringify(user) == '{}' ? (
        <p>Log in to post a comment</p>
      ) : (
        <form action={handleSubmitComment} id='commentForm'>
          <FieldGroup>
            <Field>
              <FieldLabel>Add a comment</FieldLabel>
              <Textarea name='comment' />
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

export default Comments;
