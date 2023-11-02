function Card(props) {
  const { extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-lg shadow bg-gray-50 bg-clip-border   dark:!bg-navy-800 dark:text-white  ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
