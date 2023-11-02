import SignupForm from '../features/authentication/SignupForm';
import Logo from '../ui/Logo';

function Signup() {
  return (
    <main className="min-h-screen grid grid-cols-1 justify-items-center place-content-center gap-8 bg-gray-200 dark:bg-gray-800">
      <Logo />
      <h4 className="text-2xl font-semibold">Create a new account</h4>
      <SignupForm />
    </main>
  );
}

export default Signup;
