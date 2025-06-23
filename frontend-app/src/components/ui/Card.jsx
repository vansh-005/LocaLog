import React from 'react'

const Card = ({ children, className = '' }) => {
  return <div className={`shadcn-card ${className}`}>{children}</div>
}

export default Card
