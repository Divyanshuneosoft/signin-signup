import React, { useState } from 'react';
import {Card,Button} from 'react-bootstrap';
import {storageRef}  from '../firebase'
import { useAuth } from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

const Dashboard = () => {
    const profile = {'photoURL':''}
    const [profileData,setProfileData] = useState(profile)
    const {currentUser,Logout,updateProfile} = useAuth();
    const [user,setUser] = useState(currentUser)
    const history = useHistory()
    const [disabled,setDisabled] = useState(false)
    const handleLogout = async()=>{
        await Logout()
        history.push('/')
    }
    const selectChange = async(e)=>{
      const file = e.target.files[0];
      const uploadTask = storageRef.ref('allfiles').child(file.name).put(file)
      uploadTask.on('state_changed',(snapshot)=>{
        setDisabled(true)
      },(error)=>{
        console.log(error)
      },async()=>{
        const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL()
        setProfileData({
          ...profileData,
          photoURL:downloadUrl
        })
        setDisabled(false)
      })
    }
    const submitChange = async()=>{
      try {
        let updatedData = {};
        Object.keys(profileData).forEach(key=>profileData[key]&& (updatedData[key] = profileData[key] ) )
        if(!Object.keys(updatedData).length) return;
        await updateProfile(updatedData,(curuser)=>{
          setProfileData(profile)
          setUser(curuser)
        })
      } catch (error) {
        console.log(error)
      }
    }
    return (
        <>
        <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <div style={{textAlign:'center',margin:'auto'}}>
          <strong>Email:</strong> {user.email}

          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
          <img src={user.photoURL ?? "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"} style={{height:'20%',float:'left',minWidth:'20%',width:'20%',marginRight:'5%'}} alt="profile" />
          <input type="file" onChange={selectChange} />
          </div>
          <button className="btn btn-primary" type="submit" onClick={submitChange} disabled={disabled}>Update</button>
         
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
