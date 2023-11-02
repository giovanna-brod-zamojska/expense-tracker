import Filter from '../../ui/Filter';

function TransactionFilter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-7 gap-2">
      <Filter
        filterField="type"
        options={[
          {
            value: 'all',
            label: 'Type - All',
          },
          {
            value: 'expense',
            label: 'Expense',
          },
          {
            value: 'income',
            label: 'Income',
          },
        ]}
      />
      <Filter
        setPage={true}
        filterField="category"
        options={[
          {
            value: 'all',
            label: 'Category - All',
          },
          {
            value: 'food',
            label: 'Food',
          },
          {
            value: 'shopping',
            label: 'Shopping',
          },
          {
            value: 'bar',
            label: 'Bar',
          },
        ]}
      />
    </div>
  );
}

export default TransactionFilter;
