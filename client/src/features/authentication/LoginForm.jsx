import { useContext, useEffect, useState } from 'react';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
import Checkbox from '../../ui/Checkbox';

import { useLogin } from './useLogin';
import AuthContext from '../../context/AuthProvider';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { persist, setPersist } = useContext(AuthContext);
  const { login, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <Form onSubmit={handleSubmit} className=" p-4">
      <div className=" w-90 md:w-[400px] mx-3">
        <FormRowVertical label="Email">
          <Input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <div>
          <Checkbox
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
            label="Remember me"
          />
        </div>
        <div className="px-3 flex justify-around">
          <Button variation="special" span="special" disabled={isLoading}>
            {!isLoading ? 'Log in' : <SpinnerMini />}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default LoginForm;
