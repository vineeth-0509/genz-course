"use client"
//this provider helps to allow all our components to know whether it's light or dark theme.
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider 
  attribute='class'
  defaultTheme='system'
  enableSystem
  disableTransitionOnChange
  {...props}>{children}</NextThemesProvider>
}
