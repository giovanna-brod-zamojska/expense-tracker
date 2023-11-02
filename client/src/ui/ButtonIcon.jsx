function ButtonIcon({ onClick, children, extra }) {
  return (
    <button
      onClick={onClick}
      className={`bg-transparent  flex items-center rounded-sm transition-all font-medium ${extra}`}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
