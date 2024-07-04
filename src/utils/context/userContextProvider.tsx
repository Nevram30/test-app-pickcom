"use client";
import React, { createContext, useEffect, useState } from "react";
import { api as trpc } from "~/trpc/react";

type User = {
  id: string;
  name: string;
  email: string;
};

interface UserContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  isLoading: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //conntecting to trpc server
  const { data, isPending } = trpc.user.createUser.useMutation();

  useEffect(() => {
    if (!isPending) {
      if (data) {
        const { id, email, name } = data;
        setUser({
          id: id.toString(),
          name: name ?? "",
          email,
        });
        setIsLoading(false);
      }
    }
  }, [data, isPending]);

  return (
    <UserContext.Provider value={{ user, token: userToken, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
