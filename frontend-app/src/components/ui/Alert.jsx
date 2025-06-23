import React from 'react'
import { cn } from '../../lib/utils'

export const Alert = ({ title, children, className }) => {
  return (
    <div className={cn('rounded-md border border-destructive bg-destructive/20 p-4', className)}>
      {title && <h3 className='font-medium mb-2'>{title}</h3>}
      {children && <p className='text-sm'>{children}</p>}
    </div>
  )
}
