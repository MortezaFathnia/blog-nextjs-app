import { Fragment, ReactNode } from "react"
import Header from "../ui/Header"
import { FC } from 'react'

interface layoutProps {
  children:ReactNode
}

const ThemeWrapper: FC<layoutProps> = ({children}) => {
  return(
    <Fragment>
      <Header />
      <main className="container">
        {children}
      </main>
    </Fragment>
  )
}

export default ThemeWrapper