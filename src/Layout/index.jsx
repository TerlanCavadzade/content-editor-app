import Preview from "../components/Preview";
import styles from "./style.module.css";

import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div className={styles.mainContainer}>
      <Outlet />
      <Preview />
    </div>
  );
};

export default Layout;
