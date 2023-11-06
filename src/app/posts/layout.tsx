import { Fragment, ReactNode } from "react";

interface layoutProps{
  children:ReactNode
}

function Layout(props:layoutProps) {
  return (
    <Fragment>
      <main className="container">
        {props.children}
      </main>
    </Fragment>
  );
}

export default Layout;