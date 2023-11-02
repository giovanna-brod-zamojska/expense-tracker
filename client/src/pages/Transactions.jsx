import AddTransaction from '../features/transactions/AddTransaction';
import TransactionFilter from '../features/transactions/TransactionFilter';
import TransactionsTable from '../features/transactions/TransactionsTable';
import Heading from '../ui/Heading';

function Transactions() {
  return (
    <>
      <Heading as="h3">Your transactions</Heading>
      <div className="flex flex-col md:flex-row  md:justify-start md:gap-2 mb-3">
        <AddTransaction type="expense" />
        <AddTransaction type="income" />
      </div>
      <TransactionFilter />
      <TransactionsTable />
    </>
  );
}

export default Transactions;
