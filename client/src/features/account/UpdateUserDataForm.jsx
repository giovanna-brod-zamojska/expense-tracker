import { useContext, useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Card from '../../ui/Card';

import { useUser } from '../authentication/useUser';
import { useUpdateMe } from './useUpdateMe';
import AuthContext from '../../context/AuthProvider';
import useRefreshToken from '../../hooks/useRefreshToken';
import FormGroup from '../../ui/FormGroup';
import UserAvatar from '../authentication/UserAvatar';

function UpdateUserDataForm() {
  const { auth } = useContext(AuthContext);
  const { user, isLoading } = useUser();
  const { updateMe, isUpdating } = useUpdateMe();
  const refresh = useRefreshToken();
  const [name, setName] = useState(auth.username);
  const [photo, setPhoto] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(photo);
    console.log(e.target);
    if (!name) return;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);
    updateMe(formData, {
      onSuccess: () => {
        refresh();
        setPhoto(null);
        e.target.reset();
      },
    });
  }

  function handleCancel() {
    setName(auth.username);
    setPhoto(null);
  }

  if (isLoading) {
    return;
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormRow label="Email">
            <Input value={user.email} disabled />
          </FormRow>

          <FormRow label="Name">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              disabled={isUpdating}
            />
          </FormRow>
          <FormRow label="Profile pic">
            <FileInput
              id="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              disabled={isUpdating}
            />
          </FormRow>
          <FormRow>
            <UserAvatar extra="!outline-none !mt-5 !h-14 !w-14" />
          </FormRow>
        </FormGroup>
        <FormRow>
          <div className="inline-flex justify-end gap-3">
            <Button
              type="reset"
              variation="secondary"
              disabled={isUpdating}
              onClick={handleCancel}
              span="secondary"
            >
              Reset
            </Button>
            <Button disabled={isUpdating}>Update profile</Button>
          </div>
        </FormRow>
      </Form>
    </Card>
  );
}

export default UpdateUserDataForm;
