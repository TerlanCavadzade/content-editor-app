import React from "react";

const Component = ({ type, content, style, url, components, properties }) => {
  const clickHandler = () => {
    window.open(url);
  };

  if(type === "img" || type === "video"){
    return React.createElement(
      type,
      { style, onClick: url ? clickHandler : null, ...properties }
    );
  }

  if (!components?.length) {
    return React.createElement(
      type,
      { style, onClick: url ? clickHandler : null, ...properties },
      content
    );
  }

  const nestedComponents = components.map((component) => {
    return <Component {...component} />;
  });

  return React.createElement(
    type,
    { style, onClick: url ? clickHandler : null, ...properties },
    content,
    ...nestedComponents
  );
};

export default Component;
