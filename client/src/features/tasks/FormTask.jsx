import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

import { useCreateTask } from './useCreateTask';
import { useState } from 'react';

function FormTask({ onCloseModal }) {
  const { isCreating, createThisTask } = useCreateTask();
  const isWorking = isCreating;
  const [task, setTask] = useState('');

  //createThisTask(task, { onSuccess: () => (setTask(''), onCloseModal()) });

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;

    createThisTask(
      { description: task },
      {
        onSuccess: () => {
          e.target.reset();
        },
      }
    );
  }

  return (
    <>
      <Form type={onCloseModal ? 'modal' : 'regular'} onSubmit={handleSubmit}>
        <FormRowVertical label="Task">
          <Input
            type="string"
            id="description"
            disabled={isWorking}
            onChange={(e) => setTask(e.target.value)}
          />
        </FormRowVertical>

        <FormRowVertical>
          <div className="flex justify-around mt-5">
            <Button variation="primary" disabled={isWorking}>
              Create
            </Button>
          </div>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default FormTask;
