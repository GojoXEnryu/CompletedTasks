import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {userAPI} from "../redux/services/userApi";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

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

    const loginUser = async() =>{
        if(users)
        {
            if(users.some((user) => (user.login === login || user.emailAddress === login) && user.password === password))
            {
                await checkForLogin();
                return;
            }
            else
            {
                alert("Incorrect info");
                return;
            }
        }
        else alert("There are no users");
    }

    const loginUser2 = async() =>{
        await checkForInfo();
    }

    const checkForLogin = async() =>
    {
        const tokenKey = "accessToken";

        const response = await fetch("https://localhost:5555/login/auth", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                login: login,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem(tokenKey, data.accessToken);
            alert(`Status: ${data.accessToken}`);

            changeRoute(`/users/${login}`);

        }
        else {
            alert(`Status: ${response.status}`);
        }
    }

    const checkForInfo = async() =>
    {
        const tokenKey = "accessToken";

        const token = sessionStorage.getItem(tokenKey);
        try {
            const response = await fetch("https://localhost:5555/data", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else
                alert(`Status: ${response.status}`);
        }
        catch (e: any)
        {
            alert(e);
        }
    }

    return (
        <div id="Login">
            <button id="LoginButton" onClick={loginUser}
                    style = {{width: "200px", height:"50px",
                        left: "45%", top: "60%", position:"absolute", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Log in
            </button>
            <button id="RegistrationButton" onClick={(e) => changeRoute("/register")}
                    style = {{width: "200px", height:"50px",
                        left: "45%", top: "66%", position:"absolute", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Register
            </button>

            <input type="string" id="LoginInput" onChange={handleLogin}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "47%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p id="LoginText"
               style = {{width: "15px", height:"15px",
                   left: "40%", top: "42%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                Login/Email:
            </p>
            <input type="string" id="PasswordInput" onChange={handlePassword}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "55%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p id="PasswordText"
               style = {{width: "15px", height:"15px",
                   left: "40%", top: "50%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                Password:
            </p>
        </div>
    );
}

export default Login;
