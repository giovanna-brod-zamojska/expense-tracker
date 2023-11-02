import { useState } from 'react';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Card from '../../ui/Card';

import { useUpdateMe } from '../account/useUpdateMe';
import { useUser } from '../authentication/useUser';

function FormBudget() {
  const { updateMe, isUpdating } = useUpdateMe();
  const { user } = useUser();

  const [amount, setAmount] = useState(user ? user.monthlyBudget : null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount) return;

    updateMe(
      { monthlyBudget: amount },
      {
        onSuccess: () => {
          e.target.reset();
        },
      }
    );
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <FormRowVertical label="Set monthly budget">
            <Input
              value={amount}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              id="monthly"
              disabled={isUpdating}
            />
          </FormRowVertical>
        </div>

        <FormRowVertical>
          <div className="inline-flex justify-end gap-3">
            <Button disabled={isUpdating}>Add budget</Button>
          </div>
        </FormRowVertical>
      </Form>
    </Card>
  );
}

export default FormBudget;
