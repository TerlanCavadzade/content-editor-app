import { useEffect } from "react";
import { useState } from "react";
import { convert as componentConverter } from "../../../utils/componentConverter";
import ElementTypes from "../../../utils/ElementTypes";
import { convert as propertyConverter } from "../../../utils/propertyConverter";
import PropertyFields from "../../PropertyFields";

const Form = ({ dataHandler }) => {
  const [componentDetails, setComponentDetails] = useState({
    type: "a",
    url: "",
    content: "",
  });

  const [styles, setStyles] = useState([]);
  const [properties, setProperties] = useState([]);
  const [nestedComponent, setNestedComponent] = useState([]);

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
    if (componentDetails.type === "img" || componentDetails.type === "video") {
      if (!properties.find((propertyObj) => propertyObj.property === "src")) {
        setProperties((state) => [
          ...state,
          { id: Math.random(), property: "src", value: "" },
        ]);
      }
    }
  }, [componentDetails.type, properties]);

  useEffect(() => {
    dataHandler({
      id: Math.random(),
      ...componentDetails,
      style: propertyConverter(styles),
      properties: propertyConverter(properties),
      components: componentConverter(nestedComponent),
    });
  }, [componentDetails, styles, properties, nestedComponent]);
  return (
    <>
      <p>Element Type</p>
      <select name="type" onChange={componentDetailChangeHandler}>
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

      {componentDetails.type !== "img" && componentDetails.type !== "video" && (
        <>
          <p>Content</p>
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={componentDetails.content}
            onChange={componentDetailChangeHandler}
          />
        </>
      )}

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

      {nestedComponent?.map((component) => (
        <Form
          key={component.id}
          dataHandler={(data) => {
            nestedComponentHandler(data, component.id);
          }}
        />
      ))}
    </>
  );
};

export default Form;
