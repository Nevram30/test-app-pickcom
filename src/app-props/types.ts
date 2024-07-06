export type CreateUserProps = {
    name?: string;
    email?: string;
    isLoading?: boolean;
    onCreateAccount?: () => void;
  };

export type AppProps = {
    name: string;
  };
  