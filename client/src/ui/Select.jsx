function Select({ onChange, value, options, extra }) {
  /* const { year, month, setYear, setMonth } = useContext(StatsContext);
  const [selectedValue, setSelectedValue] = useState(year);
 */
  /* useEffect(() => {
    console.log('Year updated: ' + year);
    console.log('Month updated: ' + month);
  }, [year, month]);

  function handleClick(value) {
    console.log('click value: ' + value);
    if (SelectField === 'year') {
      setYear(value);
      setSelectedValue(value);
    }
    if (SelectField === 'month') {
      setMonth(value);
      setSelectedValue(value);
    }
  } */

  return (
    <select
      className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${extra}`}
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
