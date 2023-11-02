import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex my-36 flex-col justify-between items-center">
        <h1 className="text-center pb-10 text-3xl sm:text-4xl lg:text-5xl font-semibold align-middle">
          The Expense Tracker which fits all your needs.
        </h1>
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold align-middle">
          Welcome to your new personal finance management tool.
        </h1>
        <div className="block w-auto sm:hidden ">
          <ul className="flex flex-row  mx-auto justify-center gap-5 py-4 mt-10">
            <li>
              <Button
                variation="special"
                span="special"
                onClick={() => navigate('/login')}
              >
                Sign in
              </Button>
            </li>
            <li>
              <Button
                variation="special"
                span="special"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Welcome;
