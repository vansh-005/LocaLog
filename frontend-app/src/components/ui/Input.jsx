import React from 'react'
import { clsx } from 'clsx'

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={clsx(
      'flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring',
      className
    )}
    {...props}
  />
))

Input.displayName = 'Input'
export default Input
