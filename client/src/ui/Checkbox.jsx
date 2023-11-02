/* import { forwardRef } from 'react';

const Checkbox = forwardRef(
  ({ checked, onChange, id, children, disabled }, ref) => {
    return (
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id={id}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          ref={ref}
          className="h-6 w-6  rounded  checked:bg-main-2 checked:border-transparent"
        />
        <label htmlFor={id} className="flex-1">
          {children}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox; */
import { forwardRef } from 'react';

const Checkbox = forwardRef(
  (
    { checked, onChange, id, disabled, label, linkText, linkUrl, required },
    ref
  ) => {
    return (
      <div className="flex items-start  p-3">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            disabled={disabled}
            id={id}
            checked={checked}
            onChange={onChange}
            ref={ref}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required={required}
          />
        </div>
        <label
          htmlFor={id}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}{' '}
          <a
            href={linkUrl}
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            {linkText}
          </a>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
