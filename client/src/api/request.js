
export default async (endpoint, method, body = {}, headers = {}) => (
  await fetch(`http://localhost:8080${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
)
