import React from 'react';

const Input = React.forwardRef(
  ({ id, type, disabled, extra, ...rest }, ref) => {
    return (
      <input
        ref={ref} // Forward the ref here
        type={type}
        id={id}
        className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${extra}`}
        disabled={disabled}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
