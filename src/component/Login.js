import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"


const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }),
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            console.log(json);
            //save the auth token and re direct 
            // window.localStorage.setItem('token', json.authToken);
            localStorage.setItem('token', json.authToken);
           
            props.showAlert("Login Succefully" , "success")
            navigate("/")
        }
        else {
           props.showAlert("Invalid Credentials" , "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }


    return (
        <div className=' container mt-4'>
        <h2>login to continue .....</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credential.email} className="form-control" name='email' id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credential.password} className="form-control" name='password' id="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
