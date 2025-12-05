"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Wraps provided children with the NextThemesProvider and forwards all received props.
 *
 * @param children - Content to render inside the theme provider
 * @returns A React element rendering `NextThemesProvider` with the forwarded props and children
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}