import React, { useState } from "react";
import { CreateUserProps } from "~/app-props/types";
import { api } from "~/trpc/react";

// # place the properties in the right-side of the React.FC..
// const LogInComponent: React.FC<AppProps> = ({}) => ...

// # when using the properties, destructure them in the function signature..
// const CreateAccountComponent: React.FC<CreateUser> = ({ name, email }) =>..

const CreateAccountComponent: React.FC<CreateUserProps> = ({ name, email }) => {
  const [username, setUsername] = useState(name || "");
  const [password, setPassword] = useState(email || "");

  const createUser = api.user.createUser.useMutation({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser.mutate({
      name: username,
      email: password,
      isLoading: true,
    });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccountComponent;
