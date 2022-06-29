import "./App.css";
import "./Main";
import Navbar from "./components/Navbar/Navbar";
import Main from "./Main";
import AllProducts from "./components/Products/AllProducts";
import ProductDetail from "./components/Products/ProductDetail";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/browse" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
