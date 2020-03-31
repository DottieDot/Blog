import request from './request'

export const login = async (email, password) => {
  const response = await request('/api/v1/auth', 'post', {
    email, password
  })

  return response.status === 200
}

export const logout = async() => {
  const response = await request('/api/v1/auth', 'delete')

  return response.status === 200
}

export const isLoggedIn = async () => {
  const response = await request('/api/v1/auth', 'get')

  return response.status === 200
}
