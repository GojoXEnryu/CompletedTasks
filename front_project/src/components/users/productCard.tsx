import React from "react";
import { IProduct } from "../../types/IProduct";

interface IProductCardProps {
    product: IProduct;
}

const ProductCard = (props: IProductCardProps) => (
    <div>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`UserId: ${props.product.id}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`FirstName: ${props.product.count}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`LastName: ${props.product.name}`}></input>
        <br/>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Login: ${props.product.price}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Password: ${props.product.description}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Email: ${props.product.category}`}></input>
        <br/>
        <br/>
    </div>
);

export default ProductCard;