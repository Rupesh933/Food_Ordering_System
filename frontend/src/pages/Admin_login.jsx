import React, { useState } from 'react'; 
import { FaUser, FaSignInAlt, FaLock } from "react-icons/fa";
import './styles/admin.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PublicLayout from '../Component/PublicLayout';

const Admin_login = () => {

  const [username, setusername ] = useState('');
  const [password, setpassword] = useState('');

  const handelLogin = async (e) => {
    e.preventDefault();    // to avoid page reload

    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin-login/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password})
      });

      const data = await response.json()

      if (response.status === 200){
        setTimeout(() => {
          toast.success(data.message);
          localStorage.setItem('adminUser', username);    // we store data into localStorage so that access other pages(order, food, category)
          window.location.href = '/admin-dashboard';
        }, 2000);
      }

      else {
        toast.error(data.message || "Login failed");
      }
    }

    catch (error) {
      console.error("Login Error:", error);
      toast.error("Could not connect to server. Make sure your Django backend is running!");
    }


  }
  return (
    <PublicLayout >
    <div className='d-flex justify-content-center align-items-center vh-100 vw-100' style={{ backgroundImage:'url("/images/admin_bg2.jpg")', backgroundSize:'cover'}}>
      <ToastContainer autoClose={2000} position='top-center' />
        <div className='card p-4 shadow-lg' style={{maxWidth:'400px', width:'100%', backgroundColor:'#f6dec4'}}>
          <h4 className='text-center mb-4'>
            <FaUser className='me-2 icon-fix'/>Admin Login</h4>
            <form action="#" onSubmit={handelLogin} >
              <div className='mb-3'>
                <label htmlFor="userName">
                  <FaUser className='me-1 icon-fix' />User Name </label>
                <input type="text" className='form-control' placeholder='Enter Admin UserName' required value={username} onChange={(e) => setusername(e.target.value)}/>
              </div>
              <div className='mb-3'>
                <label htmlFor="password">
                  <FaLock className='me-1 icon-fix2' />Password</label>
                  <input type="password" className='form-control' placeholder='Enter Password' required value={password} onChange={(e) => setpassword(e.target.value)} />
              </div>
              <button type='submit' className='btn btn-primary w-100'>
                <FaSignInAlt className='me-2' />Admin Login</button>
            </form>
        </div>
    </div>
    </PublicLayout>
  )
}

export default Admin_login