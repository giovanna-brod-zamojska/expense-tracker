/* function Table({ columns, data, render }) {
  
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0
                  ? 'dark:text-gray-200 bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                  : 'dark:text-gray-200 bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700'
              }
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {render ? render(item[column], item, column) : item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table; */

/* import { createContext, useContext } from 'react';

const TableContext = createContext();

function Table({ columns, children }) {
  //"border border-gray-200 text-sm bg-gray-100 rounded-lg overflow-hidden"
  return (
    <TableContext.Provider value={{ columns }}>
      <div className=" w-full border border-gray-200 text-sm bg-gray-100 rounded-lg overflow-x-auto">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`grid grid-cols-${columns} gap-2.4rem uppercase items-center p-1.6rem bg-gray-50 border-b border-gray-100 text-uppercase font-semibold text-gray-600`}
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`grid grid-cols-${columns} gap-2.4rem items-center p-1.2rem  border-gray-100 dark:text-gray-200 bg-white border-b dark:bg-gray-800 dark:border-gray-700`}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return (
      <p className="text-1.6rem font-medium text-center m-2.4rem">
        No data to show at the moment
      </p>
    );

  return <section className="m-0.4rem">{data.map(render)}</section>;
}

function Footer({ children }) {
  return (
    <footer className="bg-gray-50 flex justify-center p-1.2rem">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table; */

function Table({ children }) {
  //"border border-gray-200 text-sm bg-gray-100 rounded-lg overflow-hidden"
  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}

function Header({ children }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
      <tr>{children}</tr>
    </thead>
  );
}
function Col({ children }) {
  return (
    <th scope="col" className="px-6 py-3">
      <span className="flex items-center">{children}</span>
    </th>
  );
}

function Row({ children }) {
  return (
    <tr className="dark:text-gray-200 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {children}
    </tr>
  );
}
function RowCol({ children }) {
  return <td className="px-6 py-4">{children}</td>;
}
function Body({ data, render }) {
  if (!data.length)
    return (
      <span className="text-1.6rem font-medium text-center m-2.4rem">
        No data to show at the moment
      </span>
    );

  return <tbody className="">{data.map(render)}</tbody>;
}

Table.Header = Header;
Table.Col = Col;
Table.Body = Body;
Table.Row = Row;
Table.RowCol = RowCol;

export default Table;
