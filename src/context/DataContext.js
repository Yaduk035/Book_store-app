import { useState, createContext, useEffect, useContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [contBook, setBooks] = useState("");
  const [adminRentList, setAdminRentList] = useState("");
  const [adminSortBy, setAdminSortBy] = useState(true);
  const [bookUpdated, setBookUpdated] = useState(false);
  const [latestBooks, setLatestBooks] = useState("");

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

  const addLatestBooks = (books) => {
    setLatestBooks(books);
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
        latestBooks,
        addLatestBooks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataContext;
