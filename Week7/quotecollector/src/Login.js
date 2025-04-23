import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const handleLogin = () => {
        console.log('Logging in: Login.js');
        props.onClick(from, navigate, username, pass);
    };

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPass(event.target.value);
    }

    console.log("in LoginPage", props);
    let navigate = useNavigate();
    let location = useLocation();
    let state = location.state
    let from =state?.from?.pathname ? state.from.pathname : '/';
    let text = '';
    let user = props.user;
    if (from !== '/') {
        text = <h3>You must login to visit "{from}"</h3>
    }

    return (
        <div align="center" style={{marginLeft: 50, marginRight: 50}} >
            <div>
                <div className="form-group">
                    <label>Username:</label>
                    <input id="username" type="text" className="form-control" aria-describedby="helpUsername" onChange={handleChangeUsername} placeholder="Enter your username" 
                    required name="username" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input id="password" type="text" className="form-control" aria-describedby="helpPassword" onChange={handleChangePassword} placeholder="Enter your password" required name="password" />
                </div>
                <button className="btn btn-primary" onClick={handleLogin} >Submit</button>
            </div>
        </div>
    );
};

export default Login;