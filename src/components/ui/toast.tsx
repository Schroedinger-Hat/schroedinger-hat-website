"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ToastProvider = React.createContext<{
  addToast: (props: Omit<ToastProps, "onClose">) => void
} | null>(null)

export function useToast() {
  const context = React.useContext(ToastProvider)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

const toastVariants = cva(
  "fixed bottom-4 right-4 flex items-center justify-between gap-2 rounded-md border p-4 shadow-md transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive: "bg-destructive text-destructive-foreground border-destructive",
        success: "bg-green-100 text-green-800 border-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  onClose: () => void
}

function Toast({ className, variant, children, onClose, ...props }: ToastProps) {
  return (
    <div className={cn(toastVariants({ variant }), className)} {...props}>
      <div className="flex-1">{children}</div>
      <button onClick={onClose} className="text-current hover:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastContainer({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<Array<ToastProps & { id: string }>>([])

  const addToast = React.useCallback((props: Omit<ToastProps, "onClose">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id, onClose: () => removeToast(id) }])

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const value = React.useMemo(() => ({ addToast }), [addToast])

  return (
    <ToastProvider.Provider value={value}>
      {children}
      <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastProvider.Provider>
  )
}

export { Toast, toastVariants } 