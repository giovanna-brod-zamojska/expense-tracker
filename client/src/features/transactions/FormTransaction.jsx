import { useForm } from 'react-hook-form';

import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

import { useUpdateExpense } from './useUpdateExpense';
import { useCreateExpense } from './useCreateExpense';
import { useEffect, useState } from 'react';
//import { useState } from 'react';

function FormTransaction({ transactionToUpdate = {}, onCloseModal, type }) {
  const [updateDate, setUpdateDate] = useState();
  const { isCreating, createThisExpense } = useCreateExpense();
  const { isUpdating, updateThisExpense } = useUpdateExpense();
  const isWorking = isCreating || isUpdating;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const defaultDate = `${year}-${month}-${day}`;

  const { id: toUpdateId, ...values } = transactionToUpdate;
  let isModifica = Boolean(toUpdateId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isModifica ? values : {},
  });

  const { errors } = formState;

  useEffect(() => {
    if (transactionToUpdate.date) {
      const date = transactionToUpdate.date.split('T');
      setUpdateDate(date[0]);
      console.log(transactionToUpdate);
    }
  }, [transactionToUpdate]);

  function onSubmit(data) {
    data.type = type;
    console.log(data);
    if (isModifica) {
      updateThisExpense(data, { onSuccess: () => (reset(), onCloseModal()) });
      isModifica = false;
    } else {
      createThisExpense(data, { onSuccess: () => (reset(), onCloseModal()) });
    }
  }

  return (
    <>
      <Form
        type={onCloseModal ? 'modal' : 'regular'}
        onSubmit={handleSubmit(onSubmit)}
      >
        {isModifica && (
          <FormRowVertical label="Type" error={errors?.amount?.message}>
            <Input
              type="String"
              id="type"
              disabled={true}
              value={transactionToUpdate.type}
              extra="!bg-gray-200 dark:!bg-gray-600 !text-gray-400 dark:!text-gray-400"
            />
          </FormRowVertical>
        )}
        <FormRowVertical label="Amount" error={errors?.amount?.message}>
          <Input
            type="number"
            id="amount"
            disabled={isWorking}
            {...register('amount', {
              required: 'This field is required!',
            })}
          />
        </FormRowVertical>

        <FormRowVertical label="Category" error={errors?.amount?.message}>
          <Input
            type="string"
            id="category"
            placeholder="other"
            disabled={isWorking}
            {...register('category', {
              required: 'This field is required!',
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label="Short description"
          error={errors?.description?.message}
        >
          <Input
            type="text"
            id="description"
            disabled={isWorking}
            {...register('description', {
              maxLength: {
                value: 50,
                message: 'Provide a shorter description!',
              },
            })}
          />
        </FormRowVertical>
        <FormRowVertical label="Date" error={errors?.codice?.message}>
          <Input
            type="date"
            id="date"
            disabled={isWorking}
            {...register('date', {
              required: 'This field is required!',
            })}
            defaultValue={
              isModifica ? updateDate : defaultDate ? defaultDate : null
            }
          />
        </FormRowVertical>
        <FormRowVertical>
          <div className="flex justify-around mt-5">
            <Button variation="primary" disabled={isWorking}>
              {isModifica ? 'Update' : 'Create'}
            </Button>
          </div>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default FormTransaction;
