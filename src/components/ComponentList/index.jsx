import { useSelector } from "react-redux";
import Component from "./Component";

const ComponentList = () => {
  const components = useSelector((state) => state.component.components);

  return (
    <ul>
      {components?.map((component) => {
        return (
          <Component
            key={component.id}
            type={component.type}
            id={component.id}
          />
        );
      })}
    </ul>
  );
};

export default ComponentList;
