import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';

function Login() {
  return (
    <main className="min-h-screen grid grid-cols-1 justify-items-center place-content-center gap-8 bg-gray-200 dark:bg-gray-800">
      <Logo />
      <h4 className="text-2xl font-semibold">Log in to your account</h4>
      <LoginForm />
    </main>
  );
}

export default Login;
