import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from '@/components/ui/item';
import { useAuth } from '@/contexts/AuthContext';

const Comments = () => {
  const { user } = useAuth();
  console.log('user:', user);

  return (
    <Item variant='outline'>
      <ItemContent>
        <ItemTitle>Item title</ItemTitle>
        <ItemDescription>Item description</ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default Comments;
