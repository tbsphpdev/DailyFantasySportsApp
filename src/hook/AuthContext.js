import React from 'react';

export const AuthContext = React.createContext({
  userDetails: () => {},
  authToken: () => {},
  signOut: () => {}
});
