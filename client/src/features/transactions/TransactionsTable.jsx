import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import SortIcon from '../../ui/SortIcon';

import { useExpenses } from './useExpenses';
import TransactionsTableRow from './TransactionsTableRow';
import { useState } from 'react';
import Pagination from '../../ui/Pagination';

function TransactionsTable() {
  const { data, isLoading, isError, error } = useExpenses();

  const [sortedData, setSortedData] = useState(data?.transactions);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: 'desc', // Default sorting direction
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <h1>
        Something went wrong:{' '}
        {error.response.data.message || 'Failed to fetch data'}
      </h1>
    );

  console.log('trans tot' + data.total);
  // Function to handle sorting
  const requestSort = (columnName) => {
    let direction = 'asc';
    if (sortConfig.column === columnName && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ column: columnName, direction });
    const sorted = sortData(data.transactions, columnName, direction);
    setSortedData(sorted);
  };

  // Function to perform sorting
  const sortData = (data, columnName, direction) => {
    const sorted = [...data];
    return sorted.sort((a, b) => {
      if (columnName === 'amount') {
        return direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (columnName === 'category') {
        return direction === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      if (columnName === 'date') {
        return direction === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  };

  return (
    <Menus>
      <Table>
        <Table.Header>
          <Table.Col>
            Amount
            <SortIcon onClick={() => requestSort('amount')} />
          </Table.Col>
          <Table.Col>
            Category
            <SortIcon onClick={() => requestSort('category')} />
          </Table.Col>

          <Table.Col>
            Date
            <SortIcon onClick={() => requestSort('date')} />
          </Table.Col>
          <Table.Col>Description</Table.Col>

          <Table.Col>Edit</Table.Col>
          <Table.Col>Delete</Table.Col>
        </Table.Header>

        {!isLoading && data.transactions && (
          <Table.Body
            data={sortedData ? sortedData : data.transactions}
            render={(transaction) => (
              <TransactionsTableRow
                transaction={transaction}
                key={transaction.id}
              />
            )}
          />
        )}
      </Table>

      <Pagination count={data?.total} />
    </Menus>
  );
}

export default TransactionsTable;
