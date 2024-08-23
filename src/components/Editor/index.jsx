import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import ComponentList from "../ComponentList";
import { useDispatch, useSelector } from "react-redux";

import { undoHandler, redoHandler } from "../../store/slices/componentSlice";

const Editor = () => {
  const navigate = useNavigate();
  const undo = useSelector((state) => state.component.undo);
  const redo = useSelector((state) => state.component.redo);

  const dispatch = useDispatch();

  return (
    <div className={styles.editorContainer}>
      <h2>Editor</h2>

      <div className={styles.history}>
        {undo && <button onClick={() => dispatch(undoHandler())}>Undo</button>}
        {redo && <button onClick={() => dispatch(redoHandler())}>Redo</button>}
      </div>

      <ComponentList />

      <div className={styles.actions}>
        <button
          onClick={() => {
            navigate("/add");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Editor;
