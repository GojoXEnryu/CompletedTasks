import React from "react";
import { IUser } from "../../types/IUser";

interface IUserCardProps {
    user: IUser;
}

const UserCard = (props: IUserCardProps) => (
    <div>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`UserId: ${props.user.id}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`FirstName: ${props.user.firstName}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`LastName: ${props.user.lastName}`}></input>
        <br/>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Login: ${props.user.login}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Password: ${props.user.password}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Email: ${props.user.emailAddress}`}></input>
        <br/>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Date of registration: ${props.user.dateOfRegistration}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`CartId: ${props.user.cartId}`}></input>
        <input disabled style={{width: "255px", backgroundColor: "white"}} placeholder={`Bonus amount: ${props.user.bonusAmount}`}></input>
        <br/>
        <br/>
    </div>
);

export default UserCard;