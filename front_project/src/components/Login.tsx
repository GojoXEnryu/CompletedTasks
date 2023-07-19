import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {userAPI} from "../redux/services/userApi";

function Login() {

    const navigate = useNavigate();
    function changeRoute(where: string)
    {
        navigate(where);
    }

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { data: users } = userAPI.useGetUsersQuery();

    const handleLogin = (e:any) => {
        setLogin(e.currentTarget.value);
    }
    const handlePassword = (e:any) => {
        setPassword(e.currentTarget.value);
    }

    const loginUser = async() => {
        if(users)
        {
            if(users.some((user) => (user.login === login || user.emailAddress === login) && user.password === password))
            {
                alert("Welcome!");
                return;
            }
            else
            {
                alert("Incorrect info");
                return;
            }
        }
    }

    return (
        <div className="Login">
            <button className="LoginButton" onClick={loginUser}
                    style = {{width: "200px", height:"50px",
                        left: "45%", top: "60%", position:"absolute", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Log in
            </button>
            <button className="RegistrationButton" onClick={(e) => changeRoute("/register")}
                    style = {{width: "200px", height:"50px",
                        left: "45%", top: "66%", position:"absolute", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Register
            </button>
            <button className="UsersButton" onClick={(e) => changeRoute("/users")}
                    style = {{width: "200px", height:"50px",
                        left: "45%", top: "72%", position:"absolute", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Check users
            </button>
            <button className="CartsButton" onClick={(e) => changeRoute("/carts")}
                    style = {{width: "200px", height:"50px",
                        left: "45%", top: "78%", position:"absolute", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Check carts
            </button>
            <button className="ProductsButton" onClick={(e) => changeRoute("/products")}
                    style = {{width: "200px", height:"50px",
                        left: "45%", top: "84%", position:"absolute", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Products catalog
            </button>
            <input type="string" className="LoginInput" onChange={handleLogin}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "47%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p className="LoginText"
               style = {{width: "15px", height:"15px",
                   left: "40%", top: "42%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                Login/Email:
            </p>
            <input type="string" className="PasswordInput" onChange={handlePassword}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "55%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p className="PasswordText"
               style = {{width: "15px", height:"15px",
                   left: "40%", top: "50%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                Password:
            </p>
        </div>
    );
}

export default Login;
