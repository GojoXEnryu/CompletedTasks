import React from "react";
import { productAPI } from "../redux/services/productApi";
import ProductCard from "./users/productCard";
import {useNavigate} from "react-router";

const ProductsPage = () => {

    const navigate = useNavigate();
    function changeRoute(where: string)
    {
        navigate(where);
    }

    const { data: products } = productAPI.useGetProductsQuery();

    return (
        <div>
            {
                !products || products.length === 0 ?
                    (<p style={ {color: `rgb(255, 255, 255)` , fontSize: "19px"}}> Список товаров пуст</p>) :
                    (products.map((product) => <ProductCard key={product.id} product={product} />))
            }
            <button id="BackToLoginButton" onClick={(e) => changeRoute("/")}
                    style = {{width: "200px", height:"50px", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Go back to login
            </button>
        </div>
    );
};

export default ProductsPage;