import { useDispatch } from "react-redux";
import { removeComponent } from "../../../store/slices/componentSlice";
import { Link } from "react-router-dom";

const Component = ({ id, type }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <p>
        {type} - {id}
      </p>

      <Link to={`/edit/${id}`}>Edit</Link>
      <button
        onClick={() => {
          dispatch(removeComponent(id));
        }}
      >
        Remove
      </button>
    </li>
  );
};

export default Component;
