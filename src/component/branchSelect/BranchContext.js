import React, { createContext, useState } from "react";

export const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const [branchID, setBranchID] = useState(1);

  return (
    <BranchContext.Provider value={{ branchID, setBranchID }}>
      {children}
    </BranchContext.Provider>
  );
};
