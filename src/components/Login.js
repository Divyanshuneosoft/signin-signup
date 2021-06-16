import React, { useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const loginObj = { 'email': '', 'password': '' }
    const [logObj, setLogObj] = useState(loginObj)
    const [error, setError] = useState('')
    const { signIn } = useAuth();
    const history = useHistory()

    const changeText = (e) => {
        setLogObj({
            ...logObj,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        let objTosend = {};
        e.preventDefault()
        for (let key in logObj) {
            if (logObj[key]) objTosend[key] = logObj[key];
        }
        await signIn(logObj.email, logObj.password, () => {
            setLogObj(loginObj)
            history.push('/')
        })
    }
    return (
        <div className="container-md" style={{ marginTop: '1.5rem', maxWidth: '80%' }}>
            <Card>
                <Card.Body>
                    <h1 className="large text-primary">SignIn</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="email" name="email" value={logObj.email} onChange={changeText} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="password" name="password" value={logObj.password} onChange={changeText} />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary" disabled={error ? true : false}>
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">forgot password</Link>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/register">Sign Up</Link>
            </div>
        </div>
    )
}

export default Register
