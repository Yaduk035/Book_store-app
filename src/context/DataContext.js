import { useState, createContext, useEffect, useContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [contBook, setBooks] = useState("");
  const [adminRentList, setAdminRentList] = useState("");
  const [adminSortBy, setAdminSortBy] = useState(true);
  const [bookUpdated, setBookUpdated] = useState(false);

  const addBook = (newBook) => {
    setBooks(newBook);
  };
  const addToAdminRentlist = (newBook) => {
    setAdminRentList(newBook);
  };
  const adminPanelSortByState = (newState) => {
    setAdminSortBy(newState);
  };

  const reloadBooksPage = (newState) => {
    setBookUpdated(newState);
  };

  return (
    <DataContext.Provider
      value={{
        contBook,
        addBook,
        adminRentList,
        addToAdminRentlist,
        adminPanelSortByState,
        adminSortBy,
        bookUpdated,
        reloadBooksPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataContext;
