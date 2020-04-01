import request from './request'

export const getPosts = async () => {
  try {
    const response = await request('/api/v1/posts', 'get')
    const body = await response.json()

    return body
  }
  catch {
    return []
  }
}

export const getPost = async (id) => {
  try {
    const response = await request(`/api/v1/posts/${id}`, 'get')
    const body = await response.json()

    console.log(body)

    return body
  }
  catch {
    return []
  }
}
