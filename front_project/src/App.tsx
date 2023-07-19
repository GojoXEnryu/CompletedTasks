import * as React from 'react';
import {Routes, Route} from 'react-router-dom'

import Login from "./components/Login"
import Register from "./components/Register";
import UsersPage from "./components/UsersPage";
import CartsPage from "./components/CartsPage";
import ProductsPage from "./components/ProductsPage";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/users" element={<UsersPage/>}/>
                <Route path="/carts" element={<CartsPage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
