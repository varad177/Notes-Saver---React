import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Signup =  (props) => {
    const [credential, setCredential] = useState({name : "" ,  email: "", password: "" });
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: credential.name, email: credential.email, password: credential.password }),
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            console.log(json);
            //save the auth token and re direct 
            // window.localStorage.setItem('token', json.authToken);
            localStorage.setItem('token', json.authToken);
            navigate("/")
            props.showAlert("Account created Successfully" , "denger")
        }
        else{
            props.showAlert("Invalid details" , "denger")
        }
        
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-5'>
        <h2>Don't have account .. sign up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />

                </div><div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
                </div>
               

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup
