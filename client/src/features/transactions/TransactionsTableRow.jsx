import { useDeleteExpense } from './useDeleteExpense';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { HiPencil } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { BsFillTrash3Fill } from 'react-icons/bs';
import FormTransaction from './FormTransaction';

function TransactionsTableRow({ transaction }) {
  const { id, amount, category, date, type, description } = transaction;
  const { isDeleting, deleteThisExpense, error } = useDeleteExpense();

  // Date parsing
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const readableDate = new Date(date).toLocaleDateString(undefined, options);

  if (error) {
    return toast.error(error.response.message);
  }
  return (
    <Table.Row>
      {type === 'expense' ? (
        <Table.RowCol>
          <span className="text-red-500 dark:text-red-500">-{amount}</span>
        </Table.RowCol>
      ) : (
        <Table.RowCol>
          <span className="text-green-500 dark:text-green-500">+{amount}</span>
        </Table.RowCol>
      )}

      <Table.RowCol>{category}</Table.RowCol>
      <Table.RowCol>{readableDate}</Table.RowCol>
      <Table.RowCol>{!description ? '-' : description}</Table.RowCol>

      <Table.RowCol>
        <Modal>
          <Modal.Open opens="update-form">
            <Menus.Button icon={<HiPencil />} />
          </Modal.Open>
          <Modal.Window name="update-form">
            <FormTransaction transactionToUpdate={transaction} />
          </Modal.Window>{' '}
        </Modal>

        {/* <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="update-form">
                <Menus.Button icon={<HiPencil />}>Modifica</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-window">
                <Menus.Button icon={<HiTrash />}>Elimina</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="update-form">
              <FormExpense expenseToUpdate={expense} />
            </Modal.Window>

            <Modal.Window name="delete-window">
              <ConfirmDelete
                resource="expense"
                onConfirm={() => deleteThisExpense(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal> */}
      </Table.RowCol>
      <Table.RowCol>
        <Modal>
          <Modal.Open opens="delete-window">
            <Menus.Button icon={<BsFillTrash3Fill />} />
          </Modal.Open>
          <Modal.Window name="delete-window">
            <ConfirmDelete
              resource="expense"
              onConfirm={() => deleteThisExpense(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </Table.RowCol>
    </Table.Row>
  );
}
export default TransactionsTableRow;
