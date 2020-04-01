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

    return body
  }
  catch {
    return []
  }
}

export const savePost = async (title, summary, tags, content) => {
  try {
    const response = await request(`/api/v1/posts`, 'post', {
      title, summary, tags, content
    })
    const body = await response.json()

    return body.id
  }
  catch {
    return null
  }
}
