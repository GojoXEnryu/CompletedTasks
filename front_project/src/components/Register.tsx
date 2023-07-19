import React, {useState} from 'react';
import { userAPI } from "../redux/services/userApi";
import { IUser } from "../types/IUser";
import {useNavigate} from "react-router";

function Register() {

    const navigate = useNavigate();
    function changeRoute(where: string)
    {
        navigate(where);
    }

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [emailAddress, setEmail] = useState("");
    const [dateOfRegistration, {}] = useState(new Date());
    const [cartId, {}] = useState(-1);
    const [bonusAmount, {}] = useState(-1);

    const [createPost] = userAPI.useCreateUserMutation();
    const [updatePost] = userAPI.useUpdateUserMutation();
    const { data: users } = userAPI.useGetUsersQuery();

    const handleFirstName = (e: any) => {
        setFirstName(e.currentTarget.value);
    }
    const handleLastName = (e:any) => {
        setLastName(e.currentTarget.value);
    }
    const handleLogin = (e:any) => {
        setLogin(e.currentTarget.value);
    }
    const handlePassword = (e:any) => {
        setPassword(e.currentTarget.value);
    }
    const handleEmail = (e:any) => {
        setEmail(e.currentTarget.value);
    }

    const registerUser = async() => {
        if(firstName === "" || firstName.trim() === "" || /\d/.test(firstName))
        {
            alert("Type in your name correctly");
            return;
        }

        if(lastName === "" || lastName.trim() === "" || /\d/.test(lastName))
        {
            alert("Type in your last name correctly");
            return;
        }

        if(users && users.some((user) => user.login === login))
        {
            alert("This login is taken");
            return;
        }
        else if(login === "" || login.trim() === "" || login.indexOf(" ") > 0)
        {
            alert("Invalid login (is empty or contains spaces)");
            return;
        }
        else if(login.length < 6)
        {
            alert("Minimal login length is 6 characters");
            return;
        }
        else if(login.length > 16) {
            alert("Maximum login length is 16 characters");
            return;
        }

        if(password === "" || password.trim() === "" || password.indexOf(" ") > 0)
        {
            alert("Invalid password (is empty or contains spaces)");
            return;
        }
        else if(password.length < 8)
        {
            alert("Minimal password length is 8 characters");
            return;
        }
        else if(password.length > 16)
        {
            alert("Maximum password length is 16 characters");
            return;
        }

        if(users && users.some((user) => user.emailAddress === emailAddress))
        {
            alert("This email address is taken");
            return;
        }
        else if(emailAddress === "" || emailAddress.trim() === "" || emailAddress.indexOf(" ") > 0 ||
            emailAddress.indexOf("@") <= -1 || emailAddress.indexOf("@") === 0 ||  emailAddress.split("@").length !== 2 ||
            emailAddress.split("@")[1].indexOf(".") <= -1 || emailAddress.split("@")[1].indexOf(".") === 0 ||
            emailAddress.split("@")[1].indexOf(".") === emailAddress.split("@")[1].length - 1)
        {
            //слишком много проверок надо..оставлю пока так
            alert("Incorrect email");
            return;
        }

        const user: IUser = { id: 0, firstName, lastName, login, password, emailAddress, dateOfRegistration, cartId, bonusAmount};
        await createPost(user);// alert("Success!");
    }

    return (
        <div className="Register">
            <button className="BackToLoginButton" onClick={(e) => changeRoute("/")}
                    style = {{width: "200px", height:"50px",
                        left: "45%", top: "60%", position:"absolute", cursor: "pointer",
                        borderRadius: "5px", color: "rgb(255, 255, 255)", backgroundColor: "rgb(125, 125, 125)",
                        fontSize: "19px"}}>
                Go back
            </button>
            <button className="RegistrationButton" onClick={registerUser}
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
            <input type="string" className="FirstNameInput" onChange={handleFirstName}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "23%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p className="FirstNameText"
               style = {{width: "100px", height:"15px",
                   left: "40%", top: "18%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                First name:
            </p>
            <input type="string" className="LastNameInput" onChange={handleLastName}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "31%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p className="LastNameText"
               style = {{width: "100px", height:"15px",
                   left: "40%", top: "26%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                Last name:
            </p>
            <input type="string" className="LoginInput" onChange={handleLogin}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "39%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p className="LoginText"
               style = {{width: "100px", height:"20px",
                   left: "40%", top: "34%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                Login:
            </p>
            <input type="string" className="PasswordInput" onChange={handlePassword}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "47%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p className="PasswordLabel"
               style = {{width: "100px", height:"15px",
                   left: "40%", top: "42%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                Password:
            </p>
            <input type="string" className="EmailInput" onChange={handleEmail}
                   style = {{width: "325px", height:"25px",
                       left: "40%", top: "55%", position:"absolute",
                       fontSize: "19px"}}>
            </input>
            <p className="EmailText"
               style = {{width: "15px", height:"15px",
                   left: "40%", top: "50%", position:"absolute",
                   fontSize: "19px", color: "rgb(255, 255, 255)"}}>
                Email:
            </p>
        </div>
    );
}

export default Register;
