
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookDetails from "./pages/BookDetails";
import Main from "./pages/Main";
import BookInformations from "./components/BookInformations";
import Category from "./pages/Category";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<BookDetails />} />
        <Route path="/test" element={<BookInformations />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </>
  );
}

export default App;
