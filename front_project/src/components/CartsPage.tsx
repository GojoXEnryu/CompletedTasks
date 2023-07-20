import React from "react";
import { cartAPI } from "../redux/services/cartApi";
import CartCard from "./users/cartCard";
import {useNavigate} from "react-router";

const CartsPage = () => {

    const navigate = useNavigate();
    function changeRoute(where: string)
    {
        navigate(where);
    }

    const { data: carts } = cartAPI.useGetCartsQuery();

    return (
        <div>
            {
                !carts || carts.length === 0 ?
                    (<p style={ {color: `rgb(255, 255, 255)` , fontSize: "19px"}}>Список корзин пуст</p>) :
                    (carts.map((cart) => <CartCard key={cart.id} cart={cart} />))
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

export default CartsPage;