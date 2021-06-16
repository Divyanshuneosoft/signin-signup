import React from 'react';
import {Card,Button} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

const Dashboard = () => {
    const {currentUser,Logout} = useAuth();
    const history = useHistory()
    const handleLogout = async()=>{
        await Logout()
        history.push('/')
    }
    return (
        <>
        <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email:</strong> {currentUser.email}
        
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      </>
    )
}

export default Dashboard
