import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import AddComponent from "./components/AddComponent";
import EditComponent from "./components/EditComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Editor />} />
        <Route path="add" element={<AddComponent />} />
        <Route path="edit/:id" element={<EditComponent />} />
      </Route>
      <Route path="*" element={<h2>Not Found</h2>}/>
    </Routes>
  );
}

export default App;
