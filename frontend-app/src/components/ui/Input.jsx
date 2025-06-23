import React from 'react'

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return <input ref={ref} className={`shadcn-input ${className}`} {...props} />
})

export default Input
