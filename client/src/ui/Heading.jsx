import React from 'react';

function Heading({ as, children, extra }) {
  let textStyle = '';
  if (as === 'h1') {
    textStyle = `text-3xl font-semibold my-4 ${extra}`;
  } else if (as === 'h2') {
    textStyle = `text-2xl font-semibold my-3 ${extra}`;
  } else if (as === 'h3') {
    textStyle = `text-xl font-medium my-2 ${extra}`;
  } else if (as === 'h4') {
    textStyle = `text-lg font-semibold text-center ${extra}`;
  }

  return (
    <div className={textStyle}>{React.createElement(as, null, children)}</div>
  );
}

export default Heading;
