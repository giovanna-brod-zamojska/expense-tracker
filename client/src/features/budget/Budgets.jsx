/* import { useForm } from 'react-hook-form';

import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

import { useUpdateExpense } from './useUpdateExpense';
import { useCreateExpense } from './useCreateExpense';
//import { useState } from 'react';

function FormExpense({ expenseToUpdate = {}, onCloseModal }) {
  const { isCreating, createThisExpense } = useCreateExpense();
  const { isUpdating, updateThisExpense } = useUpdateExpense();
  const isWorking = isCreating || isUpdating;

  const { id: toUpdateId, ...values } = expenseToUpdate;
  let isModifica = Boolean(toUpdateId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isModifica ? values : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
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
        <FormRowVertical label="Food budget" error={errors?.amount?.message}>
          <Input
            type="number"
            id="food-budget"
            disabled={isWorking}
            {...register('food-budget')}
          />
        </FormRowVertical>
        <FormRowVertical label="Shopping budget" error={errors?.amount?.message}>
          <Input
            type="string"
            id="type"
            placeholder="income/expense"
            disabled={isWorking}
            {...register('type')}
          />
        </FormRowVertical>
        <FormRowVertical label="Trip" error={errors?.codice?.message}>
          <Input
            type="date"
            id="date"
            disabled={isWorking}
            {...register('date', {
              required: 'This field is required!',
            })}
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

export default FormExpense;
 */
