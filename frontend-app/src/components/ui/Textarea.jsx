import React from 'react'
import { clsx } from 'clsx'

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={clsx('shad-textarea', className)} {...props} />
))

export default Textarea
