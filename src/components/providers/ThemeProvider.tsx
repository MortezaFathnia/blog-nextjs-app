'use client'
import { ReactNode, useState } from "react"
import { ThemeContext } from "../../context/ThemeContext"
type Props = {
  children: ReactNode
}
export const ThemeProvider: React.FC<Props> = ({ children }): JSX.Element => {
  let local
  if (typeof window !== 'undefined') {
    local = localStorage.getItem("ui.theme")
  }
  const [theme, setTheme] = useState<"light" | "dark">(
    (local as "light" | "dark") || "dark"
  )
  const toggleTheme = (): void => {
    const val = theme === "light" ? "dark" : "light"
    setTheme(val)
    localStorage.setItem("ui.theme", val)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider