import React,{useState} from 'react';
import { Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validate } from '../utils/validate';
const ForgotPassword = () => {
    const [error,setError] = useState('')
    const [email,setEmail] = useState('');
    const {forgotPassword} = useAuth()
    const changeText = (e)=>{
        setEmail(e.target.value)
        setError(validate(e.target,null))
    }
    const handleSubmit = async(e) => {
        e.preventDefault()

        await forgotPassword(email,()=>{
            setEmail('')
            setError('')
        })
    }
    return (
        <div className="container-md" style={{ marginTop: '1.5rem', maxWidth: '80%' }}>
        <Card>
            <Card.Body>
                <h1 className="large text-primary">Forgot Password</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control" placeholder="email" name="email" value={email} onChange={changeText} />
                    </div>

                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary" disabled={error ? true : false}>
                            Reset Password
                        </button>
                    </div>
                </form>
  
            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Sign Up</Link>
        </div>
    </div>
    )
}

export default ForgotPassword
