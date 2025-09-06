
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      expand={true}
      richColors={true}
      closeButton={true}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg mobile-toast",
          description: "group-[.toast]:text-muted-foreground mobile-body",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground touch-target",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground touch-target",
          closeButton: "touch-target",
          success: "mobile-toast-success",
          error: "mobile-toast-error", 
          warning: "mobile-toast-warning",
          info: "mobile-toast-info",
        },
        style: {
          maxWidth: 'calc(100vw - 2rem)',
          margin: '0 1rem',
        }
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
