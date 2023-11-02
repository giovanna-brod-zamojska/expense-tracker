import Modal from '../../ui/Modal';

import { HiPlus } from 'react-icons/hi2';
import Button from '../../ui/Button';
import FormTransaction from './FormTransaction';

function AddTransaction({ type }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="expense-form">
          <div className="flex flex-row items-center justify-center  mt-2">
            <Button variation="secondary">
              <div className="flex flex-inline gap-3 ">
                {type === 'expense' ? (
                  <HiPlus className="h-5 w-5 fill-red-500 my-auto" />
                ) : (
                  <HiPlus className="h-5 w-5 fill-green-500 my-auto" />
                )}

                <span className="text-sm ">New {type}</span>
              </div>
            </Button>
          </div>
        </Modal.Open>
        <Modal.Window name="expense-form">
          <FormTransaction type={type} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTransaction;
