import React, { createContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

interface UserContextType {
  user: User | null;
  token: string | null;
  isLoaded: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  isLoaded: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setToken] = useState<string | null>(null);
  const [isLoaded, setIsLoading] = useState<boolean>(true);

  //conntecting to trpc server
  const { data, isLoaded: fetching } = trcp.useQuery(["me"]);
  const { data: fetchedToken, isLoaded: isTokenLoaded } = trpc.useQuery([
    "token",
  ]);

  useEffect(() => {
    if (!fetching) {
      setUser(data?.user ?? null);
      setToken(data?.token ?? null);
      setIsLoading(false);
    }
  }, [data, fetching]);

  return (
    <UserContext.Provider value={{ user, token: userToken, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
};
