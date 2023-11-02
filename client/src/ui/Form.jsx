function Form({ children, type, onSubmit }) {
  // Define classes based on the 'type' prop
  const regularClasses = 'p-6  dark:bg-gray-700 rounded-md';
  const modalClasses = 'w-96';
  const classes = type === 'modal' ? modalClasses : regularClasses;

  return (
    <form onSubmit={onSubmit} className={`${classes} overflow-hidden`}>
      {children}
    </form>
  );
}

Form.defaultProps = {
  type: 'regular',
};

export default Form;
