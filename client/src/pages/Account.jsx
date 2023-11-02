import UpdatePasswordForm from '../features/account/UpdatePasswordForm';
import UpdateUserDataForm from '../features/account/UpdateUserDataForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Account() {
  return (
    <>
      <Row>
        <Heading as="h3">General info</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3" extra="mt-8">
          Password
        </Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
