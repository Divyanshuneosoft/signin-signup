import React, { useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link,useHistory} from 'react-router-dom';
import { validate } from '../utils/validate';

const Register = () => {
    const registerobj = { 'email': '', 'password': '', 'confirmpassword': '' }
    const [regObj, setRegObj] = useState(registerobj)
    const [error, setError] = useState('');
    const {signUp} = useAuth();
    const history = useHistory()

    const changeText = (e) => {
        setRegObj({
            ...regObj,
            [e.target.name]: e.target.value
        })

    }
    const checkValidation = (e) => {
        let previousValue = e.target.name === "confirmpassword" ? regObj.password : "";
        setError(validate(e.target, previousValue))
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        for (let key in regObj) {
            if(!regObj[key]) return setError(`${key} is required.`)
        }
        await signUp(regObj.email,regObj.password,()=>{
            setRegObj(registerobj)
            setError('')
            history.push('/login')
        })
    }
    return (
        <div className="container-md" style={{ marginTop: '1.5rem', maxWidth: '80%' }}>
            <Card>
                <Card.Body>
                    <h1 className="large text-primary">Sign Up</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <p className="lead">
                        <i className="fas fa-user" /> Create Your Account
                    </p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="email" name="email" value={regObj.email} onChange={changeText} onBlur={checkValidation} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="password" name="password" value={regObj.password} onChange={changeText} onBlur={checkValidation} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="confirmpassword" name="confirmpassword" value={regObj.confirmpassword} onChange={changeText}  onBlur={checkValidation} />
                        </div>
                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary"  disabled={error? true : false}>
                                Sign UP
                            </button>
                        </div>
                    </form>

                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
       
        </div>
    )
}

export default Register
