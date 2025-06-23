import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="dialog-overlay" />
    <DialogPrimitive.Content
      ref={ref}
      className={clsx('dialog-content', className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

export const DialogHeader = ({ children }) => (
  <div className="dialog-header">{children}</div>
)

export const DialogBody = ({ children }) => (
  <div className="dialog-body">{children}</div>
)
