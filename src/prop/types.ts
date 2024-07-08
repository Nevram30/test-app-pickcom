export type CreateUserProps = {
    id?: number;
    email?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
  } 

export type AppProps = {
    name: string;
  };

export type userViewData = {
  data?: CreateUserProps | undefined;
}