import {BrowserRouter, Routes, Route} from "react-router-dom"
import UserList from "./components/User/Userlist";
import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import ProductList from "./components/Product/ProductList";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList/>}/>
        <Route path="user/add" element={<AddUser/>}/>
        <Route path="user/edit/:id" element={<EditUser/>}/>

        <Route path="product" element={<ProductList/>}/>
        <Route path="product/add" element={<AddProduct/>}/>
        <Route path="product/edit/:id" element={<EditProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
