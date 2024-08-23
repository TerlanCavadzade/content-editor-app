import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { editComponent } from "../../store/slices/componentSlice";
import FormFields from "./FormFields";
import { useEffect } from "react";

import styles from "./style.module.css"

const Edit = () => {
  const { id } = useParams();
  const components = useSelector((state) => state.component.components);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedComponent = useMemo(() => {
    return components.find((component) => component.id == id);
  }, [id, components]);

  useEffect(() => {
    if (!selectedComponent) {
      navigate("/");
    }
  }, [selectedComponent]);

  const [data, setData] = useState({});

  const formSubmitHandler = (e) => {
    e.preventDefault();




    dispatch(editComponent(data));

    // navigate("/");
  };

  return (
    <div>
      <h2>Edit - {id}</h2>

      <button onClick={() => navigate("/")}>X</button>

      <form onSubmit={formSubmitHandler} className={styles.formContainer}>
        <FormFields
          selectedComponent={selectedComponent}
          dataHandler={setData}
        />

        <br />

        <button className={styles.submitBtn}>Save</button>
      </form>
    </div>
  );
};

export default Edit;
