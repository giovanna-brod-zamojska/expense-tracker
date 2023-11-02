const Button = ({ variation, span, children, ...rest }) => {
  const spanClasses = {
    special:
      'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
    default: 'text-sm text-gray-100 dark:text-gray-100',
    secondary: 'text-sm text-gray-500 dark:text-gray-100',
  };

  /* const sizeClasses = {
    small: 'text-xs px-2 py-1 uppercase font-semibold text-center',
    medium: 'text-base px-4 py-3 font-medium',
    large: 'text-lg px-6 py-3 font-medium',
  }; */

  const variationClasses = {
    primary:
      ' bg-teal-500 hover:bg-teal-700 font-medium rounded-xl px-4 py-1.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none',
    secondary:
      'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-800 dark:hover:bg-gray-700/50 hover:bg-gray-100/50 rounded-xl px-4 py-1.5 mb-2 focus:outline-none',
    danger:
      'text-red-100 bg-red-700 hover:bg-red-800  border border-gray-200 dark:border-gray-800 dark:hover:bg-gray-700/50 hover:bg-gray-100/50 rounded-xl px-4 py-1.5 mb-2 focus:outline-none',
    special:
      'relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none ',
  };

  const buttonClasses = `${variationClasses[variation]} `; //inline-block border-none shadow-sm
  const textClasses = `${spanClasses[span]}`;
  return (
    <button className={buttonClasses} {...rest}>
      <span className={textClasses}>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  variation: 'primary',
  span: 'default',
};

export default Button;
