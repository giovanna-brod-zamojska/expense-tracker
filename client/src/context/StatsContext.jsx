import { createContext, useState } from 'react';

const StatsContext = createContext({});

export const StatsProvider = ({ children }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  return (
    <StatsContext.Provider value={{ year, setYear, month, setMonth }}>
      {children}
    </StatsContext.Provider>
  );
};

export default StatsContext;
