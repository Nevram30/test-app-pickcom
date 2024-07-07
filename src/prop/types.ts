export type CreateUserProps = {
    id?: number;
    email?: string;
    name?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  } | null

export type AppProps = {
    name: string;
  };

export type userViewData = {
  data?: CreateUserProps | undefined;
}