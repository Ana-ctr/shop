
import './App.css';
import Store3 from './component';

import Store from './one';
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter, Routes, Route } from "react-router-dom"
import Store4 from './two';
import Login from './login';
import SignUp from './signin';
import Download from './download';

import Page from './mypage';

import AdminUsers from './users';
import CategoryPage from './category';
import Product from './product';
import Update from './update';
import AddProduct from './add';
import Updatectg from './updatectg';
import Cart from './cart';
import Adminlog from './adminlog';
import { useState } from 'react';
import Footer from './footer';




function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme')!==null?localStorage.getItem('theme'):'light');

  return (
    <div className={""+ (theme=="light"?"bg-body-tertiary":"bg-dark ")} data-bs-theme={theme!=='light'?"dark":''}> <BrowserRouter>
      <Routes>

        <Route path="/" element={<Store />}> </Route>
        <Route path="/component/:id" element={<Store3/>}> </Route>
        <Route path="/two/:id" element={<Store4/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/signin" element={<SignUp/>}> </Route>
        <Route path="/download" element={<Download/>}> </Route>
        
        <Route path="/mypage" element={<Page/>}> </Route>
        <Route path="/product" element={<Product/>}> </Route>
        <Route path="/users" element={<AdminUsers/>}> </Route>
        <Route path="/category" element={<CategoryPage/>}> </Route>
        <Route path="/update/:id" element={<Update/>}> </Route>
        <Route path="/add" element={<AddProduct/>}> </Route>
        <Route path="/updatectg/:id" element={<Updatectg/>}> </Route>
        <Route path="/cart" element={<Cart/>}> </Route>
        <Route path="/adminlog" element={<Adminlog/>}> </Route>
        <Route path="/footer" element={<Footer/>}> </Route>



      </Routes> </BrowserRouter>
    </div>
  );
}

export default App;
