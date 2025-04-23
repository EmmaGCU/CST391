import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

const SignUp = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        let user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        await dataSource.post('/users', user);
        alert('Signup successful');
    };

    console.log("in SignUpPage", props);
    let navigate = useNavigate();
    let location = useLocation();
    let state = location.state
    let from =state?.from?.pathname ? state.from.pathname : '/';
    let text = '';

    //let user = props.user;
    if (from !== '/') {
        text = <h3>You must login to visit "{from}"</h3>
    }

    const handleChangeFirstName = (event) => {
        console.log(event.target.value);
        setFirstName(event.target.value);
    }

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div align="center" style={{marginLeft: 50, marginRight: 50}}>
            <div>
                <div className="form-group">
                    <label for="firstName">First Name:</label>
                    <input id="firstName" type="text" className="form-control" aria-describedby="helpFirstName" onChange={handleChangeFirstName} placeholder="Enter your first name" 
                    required name="firstName" />
                </div>
                <div className="form-group">
                    <label for="lastName">Last Name:</label>
                    <input id="lastName" type="text" className="form-control" aria-describedby="helpLastName" onChange={handleChangeLastName} placeholder="Enter your last name" required name="lastName" />
                </div>
                <div className="form-group">
                    <label for="username">Username:</label>
                    <input id="username" type="text" className="form-control" aria-describedby="helpUsername" onChange={handleChangeUsername} placeholder="Enter a username" 
                    required name="username" />
                </div>
                <div className="form-group">
                    <label for="password">Password:</label>
                    <input id="password" type="text" className="form-control" aria-describedby="helpPassword" onChange={handleChangePassword} placeholder="Enter a password" required name="password" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => handleSignUp()}>Submit</button>
            </div>
        </div>
    );
};

export default SignUp;