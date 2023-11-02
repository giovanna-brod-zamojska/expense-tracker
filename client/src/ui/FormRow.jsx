function FormRow({ label, error, children }) {
  return (
    <div>
      {label && (
        <label
          htmlFor={children.props.id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      {children}{' '}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  );
}

export default FormRow;
{
  /* <div
      className={`grid ${
        orientation === 'vertical' ? '' : 'grid-cols-[24rem,1fr,1.2fr]'
      } gap-${orientation === 'vertical' ? '0.8rem' : '2.4rem'} py-1.2 ${
        !label ? '' : 'border-b border-gray-100'
      } ${error ? 'border-red-700' : ''}`}
    >
      {label && (
        <label htmlFor={children.props.id} className="font-semibold">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-1.4rem text-red-700">{error}</span>}
    </div> */
}
