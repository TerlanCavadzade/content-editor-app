import styles from "./style.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComponent } from "../../store/slices/componentSlice";

import FormFields from "./FormFields";

const AddComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(addComponent(data));

    navigate("/");
  };
  

  return (
    <div>
      <button onClick={() => navigate("/")}>X</button>

      <form onSubmit={formSubmitHandler} className={styles.formContainer}>
        <FormFields dataHandler={setData} />

        <br />
        <button className={styles.submitBtn}>Add</button>
      </form>
    </div>
  );
};

export default AddComponent;
