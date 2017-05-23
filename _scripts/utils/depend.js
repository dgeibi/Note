const depend = (url, test, callback) => {
  if (!test()) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
};
export default depend;
