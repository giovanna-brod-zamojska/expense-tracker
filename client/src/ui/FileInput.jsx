function FileInput({ id, accept, onChange, disabled }) {
  return (
    <div>
      <input
        id={id}
        accept={accept}
        onChange={onChange}
        disabled={disabled}
        className="block w-full text-sm px-2.5 py-2 shadow-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-200 dark:shadow-sm-light focus:outline-none dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500   dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="file"
      />
    </div>
  );
}
//relative text-1.4rem border border-gray-300 rounded-sm overflow-hidden

export default FileInput;
