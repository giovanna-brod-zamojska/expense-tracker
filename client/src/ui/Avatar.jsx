function Avatar({ src, alt, extra }) {
  return (
    <img
      className={`w-20 h-20 rounded-full outline outline-2 outline-offset-2 outline-blue-400 dark:outline-blue-500 ${extra}`}
      src={src}
      alt={alt}
    ></img>
  );
}
export default Avatar;
