import React, { createContext, useState } from "react";

type User = {
  avatar?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  orderStatuses?: boolean;
  passwordChanges?: boolean;
  specialOffers?: boolean;
  newsletter?: boolean;
};

export const defaultUser: User = { firstName: "", email: "" };

const UserContext = createContext({
  user: defaultUser,
  setUser: (user: User) => {},
});

export const UserProvider: React.FC<{
  children: React.ReactNode;
  initUser: User | null;
}> = ({ children, initUser }) => {
  const [user, setUser] = useState(initUser ?? defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
