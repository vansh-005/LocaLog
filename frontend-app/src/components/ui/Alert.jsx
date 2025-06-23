import React from 'react'

const Alert = ({ children, className = '' }) => {
  return <div className={`shadcn-alert ${className}`}>{children}</div>
}

export default Alert
