import { useEffect, useState } from "react";

import { undoConvert, convert } from "../../../utils/propertyConverter";
import { undoConvert as componentUndoConvert } from "../../../utils/componentConverter";

import ElementTypes from "../../../utils/ElementTypes";
import PropertyFields from "../../PropertyFields";

const FormFields = ({ selectedComponent, dataHandler }) => {
  const [componentDetails, setComponentDetails] = useState({
    type: selectedComponent?.type,
    url: selectedComponent?.url,
    content: selectedComponent?.content,
  });

  const [styles, setStyles] = useState(undoConvert(selectedComponent?.style));
  const [properties, setProperties] = useState(
    undoConvert(selectedComponent?.properties)
  );

  const [nestedComponent, setNestedComponent] = useState(
    componentUndoConvert(selectedComponent?.components)
  );

  const styleChangeHandler = (id, e) => {
    setStyles((state) => {
      return state.map((style) => {
        if (style.id === id) {
          return { ...style, [e.target.name]: e.target.value };
        }
        return style;
      });
    });
  };

  const propertyHandler = (id, e) => {
    setProperties((state) => {
      return state.map((style) => {
        if (style.id === id) {
          return { ...style, [e.target.name]: e.target.value };
        }
        return style;
      });
    });
  };

  const componentDetailChangeHandler = (e) => {
    setComponentDetails((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const nestedComponentHandler = (data, id) => {
    setNestedComponent((state) => {
      return state.map((componentObj) => {
        if (componentObj.id === id) {
          return { ...componentObj, component: data };
        }
        return componentObj;
      });
    });
  };

  useEffect(() => {
    dataHandler({
      id: selectedComponent?.id,
      ...componentDetails,
      style: convert(styles),
      properties: convert(properties),
    });
  }, [componentDetails, styles, properties]);

  return (
    <>
      <p>Element Type</p>
      <select
        name="type"
        value={componentDetails.type}
        onChange={componentDetailChangeHandler}
      >
        {ElementTypes.map((element) => {
          return <option key={element}>{element}</option>;
        })}
      </select>

      <p>Url (Optional)</p>
      <input
        type="text"
        placeholder="url (optional)"
        value={componentDetails.url}
        name="url"
        onChange={componentDetailChangeHandler}
      />

      <p>Content</p>
      <input
        type="text"
        name="content"
        value={componentDetails.content}
        onChange={componentDetailChangeHandler}
      />

      <p>Styles</p>
      <button
        onClick={() =>
          setStyles((state) => [
            ...state,
            { id: Math.random(), property: "", value: "" },
          ])
        }
        type="button"
      >
        addStyle
      </button>

      {styles?.map((style) => {
        return (
          <PropertyFields
            key={style.id}
            propertyObject={style}
            handler={styleChangeHandler}
          />
        );
      })}

      <p>Properties</p>
      <button
        onClick={() =>
          setProperties((state) => [
            ...state,
            { id: Math.random(), property: "", value: "" },
          ])
        }
        type="button"
      >
        Add Property
      </button>

      {properties?.map((property) => {
        return (
          <PropertyFields
            key={property.id}
            propertyObject={property}
            handler={propertyHandler}
          />
        );
      })}

      <p>Nested Components</p>
      <button
        type="button"
        onClick={() =>
          setNestedComponent((state) => [
            ...state,
            { id: Math.random(), component: {} },
          ])
        }
      >
        Add Component
      </button>

      {nestedComponent?.map((componentObj) => (
        <FormFields
          key={componentObj.id}
          selectedComponent={componentObj.component}
          dataHandler={(data) => {
            nestedComponentHandler(data, componentObj.id);
          }}
        />
      ))}
    </>
  );
};

export default FormFields;
