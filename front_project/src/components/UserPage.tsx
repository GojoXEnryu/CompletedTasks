import React from "react";
import { userAPI } from "../redux/services/userApi";
import UserCard from "./users/userCard";
import {useLocation, useNavigate} from "react-router";

const UserPage = () => {

    const navigate = useNavigate();
    function changeRoute(where: string)
    {
        navigate(where);
    }

    const location = useLocation();
    const { data: users } = userAPI.useGetUsersQuery();

    return (
        <div>
            {
                users ? (users.map((user) => location.pathname.indexOf(user.login) > 0 ? <UserCard key={user.id} user={user} /> :
                        <p style={ {color: `rgb(255, 255, 255)` , fontSize: "19px"}}>Пользовател не найден</p>)) :
                (<p style={ {color: `rgb(255, 255, 255)` , fontSize: "19px"}}>Список пользователей пуст</p>)
            }
            <button id="BackToLoginButton" onClick={(e) => changeRoute("/")}
                    style = {{width: "200px", height:"50px", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Go back to login
            </button>
            <br/>
            <button id="UsersButton" onClick={(e) => changeRoute("/users")}
                    style = {{width: "200px", height:"50px", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Check users
            </button>
            <br/>
            <button id="CartsButton" onClick={(e) => changeRoute("/carts")}
                    style = {{width: "200px", height:"50px", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Check carts
            </button>
            <br/>
            <button id="ProductsButton" onClick={(e) => changeRoute("/products")}
                    style = {{width: "200px", height:"50px", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Products catalog
            </button>
        </div>
    );
};

export default UserPage;