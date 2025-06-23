import React from 'react'
import { clsx } from 'clsx'

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input ref={ref} className={clsx('shad-input', className)} {...props} />
))

export default Input
