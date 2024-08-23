const PropertyFields = ({ propertyObject, handler }) => {
  return (
    <div >
      <input
        type="text"
        value={propertyObject.property}
        name="property"
        placeholder="property"
        onChange={(e) => handler(propertyObject.id, e)}
      />
      <input
        type="text"
        value={propertyObject.value}
        name="value"
        placeholder="value"
        onChange={(e) => handler(propertyObject.id, e)}
      />
    </div>
  );
};

export default PropertyFields;
