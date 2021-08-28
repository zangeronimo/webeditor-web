import React, { createContext, useContext, useState } from 'react';

type TitleContextData = {
  title: string;
  setTitle: (title: string) => void;
};

const TitleContext = createContext({} as TitleContextData);

const TitleProvider: React.FC = ({ children }) => {
  const [title, setTitle] = useState('');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

function useTitle(): TitleContextData {
  const context = useContext(TitleContext);

  if (!context) {
    throw new Error('useTitle must be used within a TitleProvider');
  }

  return context;
}

export { TitleProvider, useTitle };
