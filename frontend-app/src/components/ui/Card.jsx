import React from 'react'
import { cn } from '../../lib/utils'

export const Card = ({ className, children }) => {
  return <div className={cn('rounded-lg border bg-white p-6 shadow', className)}>{children}</div>
}
