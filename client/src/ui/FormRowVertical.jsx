function FormRowVertical({ error, children, label }) {
  return (
    <div className="flex flex-col gap-2 p-3">
      {label && (
        <label
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor={children.props.id}
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-red-700 text-base">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
