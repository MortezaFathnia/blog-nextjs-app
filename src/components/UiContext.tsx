'use client';

import { useState, createContext, ReactNode, FunctionComponent } from 'react';

export interface UiContextInterface {
  setDarkTheme:Function;
  darkTheme:boolean
}

export type UiContextType={
  setDarkTheme:() => void;
  darkTheme:true
}

interface Props {
  children: ReactNode;
}

const UiContext = createContext({
  darkTheme: true,
  setDarkTheme: (theme: boolean) => {},
});

export const UiProvider:FunctionComponent<Props> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <UiContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export default UiContext;
