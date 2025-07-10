import { useState } from 'react';
import { UserContext } from './UserContext';

function App({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <>
      <UserContext value={{ userLoggedIn, setUserLoggedIn }}>
        {children}
      </UserContext>
    </>
  );
}

export default App;
