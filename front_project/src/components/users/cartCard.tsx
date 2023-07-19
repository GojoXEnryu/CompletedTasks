import React from "react";
import { ICart } from "../../types/ICart";

interface ICartCardProps {
    cart: ICart;
}

const CartCard = (props: ICartCardProps) => (
    <div>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Id: ${props.cart.id}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`UserId: ${props.cart.userId}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Products: ${props.cart.products}`}></input>
        <br/>
        <br/>
    </div>
);

export default CartCard;