import React from "react";
import { userAPI } from "../redux/services/userApi";
import UserCard from "./users/userCard";
import {useNavigate} from "react-router";

const UsersPage = () => {

    const navigate = useNavigate();
    function changeRoute(where: string)
    {
        navigate(where);
    }

    const { data: users } = userAPI.useGetUsersQuery();

    return (
        <div>
            {
                !users || users.length === 0 ?
                    (<p style={ {color: `rgb(255, 255, 255)` , fontSize: "19px"}}>Список пользователей пуст</p>) :
                    (users.map((user) => <UserCard key={user.id} user={user} />))
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

export default UsersPage;