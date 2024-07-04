'use client'
import React, { useState } from 'react'
import { api } from '~/trpc/react'

type CreateUser = {
  name?: string
  email?: string
  isLoading?: boolean
  onCreateAccount?: () => void
}

const CreateAccount: React.FC<CreateUser> = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const createUser = api.user.createUser.useMutation({})
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser.mutate({
      name: username,
      email: password,
      isLoading: true,
    })
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

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
  )
}

export default CreateAccount
