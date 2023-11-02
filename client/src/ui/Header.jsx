import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';

function Header() {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-200 dark:bg-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
        <a href="/" className="flex items-center">
          <Logo className />
          <span className="self-center text-2xl pl-4 pt-2 font-semibold whitespace-nowrap dark:text-white">
            ASTROSAURO
          </span>
        </a>

        <div className="hidden sm:block sm:w-auto">
          <ul className=" flex flex-row items-center align-middle py-4 mt-2">
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
    </nav>
  );
}

export default Header;
