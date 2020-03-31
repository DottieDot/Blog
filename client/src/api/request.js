
export default async (endpoint, method, body = undefined, headers = {}) => (  
  await fetch(`http://localhost:8080${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include',
    body: body && JSON.stringify(body)
  })
)
