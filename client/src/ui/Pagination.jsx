import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';
import Card from './Card';

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);
  console.log('pageCount ' + pageCount);

  function next() {
    const nextPage = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', nextPage);
    setSearchParams(searchParams);
  }

  function prev() {
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prevPage);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;
  return (
    <Card extra="mt-2 pl-2 !bg-white">
      <div className="flex items-center justify-between">
        <div className="inline-flex">
          <span className=" p-1 text-sm text-gray-700 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {(currentPage - 1) * PAGE_SIZE + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {count}
            </span>{' '}
            Entries
          </span>
        </div>

        <div className="flex flex-end">
          <button
            disabled={currentPage === 1}
            onClick={prev}
            className="flex items-center justify-center px-3 h-8  shadow text-sm font-medium text-gray-600 bg-gray-100 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Prev
          </button>
          <button
            disabled={currentPage === pageCount}
            onClick={next}
            className="flex items-center justify-center px-3 h-8 text-sm shadow font-medium text-gray-600 bg-gray-100  border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}

export default Pagination;
