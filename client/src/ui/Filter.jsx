import { useSearchParams } from 'react-router-dom';

function Filter({ filterField, options, setPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;
  console.log('Current filter: ' + currentFilter);

  function handleChange(event) {
    const selectedValue = event.target.value;
    searchParams.set(`${filterField}`, selectedValue);
    setSearchParams(searchParams);
    if (setPage) {
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    }
  }

  return (
    <select
      className="bg-gray-50  dark:bg-gray-700 border max-w-[170px] text-gray-900 dark:text-gray-100 text-sm border-gray-200 dark:border-gray-800 dark:hover:bg-gray-700/50 hover:bg-gray-100/50 rounded-xl px-4 py-1.5 mb-2 focus:outline-none"
      onChange={handleChange}
      value={currentFilter}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          //defaultValue={currentFilter}
          //disabled={option.value === currentFilter}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Filter;
