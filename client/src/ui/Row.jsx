function Row({ type, children }) {
  return (
    <div
      className={`flex ${
        type === 'horizontal'
          ? 'justify-between items-center'
          : 'flex-col gap-1.6rem'
      }`}
    >
      {children}
    </div>
  );
}

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
