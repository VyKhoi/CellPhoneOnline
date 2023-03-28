import React, { useState } from "react";

const SearchContext = React.createContext();

function SearchProvider(props) {
  const [search, setSearch] = useState("trống");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export { SearchProvider, SearchContext };
