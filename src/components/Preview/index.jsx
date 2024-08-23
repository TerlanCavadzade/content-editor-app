import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Component from "../ComponentPreview";

const Preview = () => {
  const components = useSelector((state) => state.component.components);


  return (
    <div>
      <h2>Preview</h2>
      {components?.map((component) => {
        return (
          <Fragment key={component.id}>
            <Component {...component} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default Preview;
