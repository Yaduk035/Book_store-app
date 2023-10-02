import { useState, createContext, useEffect, useContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [contBook, setBooks] = useState("");
  const addBook = (newBook) => {
    setBooks(newBook);
  };

  return (
    <DataContext.Provider value={{ contBook, addBook }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataContext;
