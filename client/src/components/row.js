import React from 'react'

export default ({children}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      {children}
    </div>
  )
}
