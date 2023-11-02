import Button from './Button';
import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold">Page Not Found</h1>
      <p className="mt-2 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <span role="img" aria-label="Sad Face" className="text-4xl mt-4">
        😞
      </span>
      <br />
      <Button onClick={moveBack}>&larr; Go back</Button>
    </div>
  );
}

export default PageNotFound;
