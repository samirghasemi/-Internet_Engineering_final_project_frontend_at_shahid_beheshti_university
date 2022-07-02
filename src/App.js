import "./App.css";
import "./Main";
import Navbar from "./components/Navbar/Navbar";
import Main from "./Main";
import AllProducts from "./components/Products/AllProducts";
import ProductDetail from "./components/Products/ProductDetail";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Profile from "./components/profile/Profile";
import Manager from "./components/Manager/Manager";
import Shop from "./components/Shop/Shop";
import { useSelector } from "react-redux";
function App() {
  const auth = useSelector((state) => state.signin);
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/browse/" element={<AllProducts />} />
          <Route path="/browse/:id1/" element={<AllProducts />} />
          <Route path="/browse/:id1/:id2/" element={<AllProducts />} />
          <Route path="/browse/:id1/:id2/:id3" element={<AllProducts />} />
          {auth && <Route exact path="/profile" element={<Profile />} />}
          {!auth && (
            <Route
              exact
              path="/profile"
              element={<h1 style={{ marginRight: "50px" }}>not authorized</h1>}
            />
          )}
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/Manager" element={<Manager />} />
          <Route path="/Shops" element={<Shop />} />
          <Route
            path="*"
            element={<h1 style={{ marginRight: "50px" }}>not found</h1>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
