import { createContext } from "react";
import { useState } from "react";
import React from "react";

// ...

export const TypeOfProductContext = createContext();

export const TypeOfProductProvider = ({ children }) => {
  const [typeOfProduct, setTypeOfProduct] = useState("");

  const handleSetTypeOfProduct = (newType) => {
    setTypeOfProduct(newType);
  };

  return (
    <TypeOfProductContext.Provider
      value={{ typeOfProduct, handleSetTypeOfProduct }}
    >
      {children}
    </TypeOfProductContext.Provider>
  );
};
