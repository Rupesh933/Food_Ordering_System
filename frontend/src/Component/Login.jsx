import React, { useState } from 'react'
import PublicLayout from './PublicLayout';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { CgLogIn } from "react-icons/cg";
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { TbLockPassword } from "react-icons/tb";

const Login = () => {

    const [formData, setFormData] = useState({
        emailCont : '',
        password : '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ( {
            ...prev,
            [name] : value
        }));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {emailCont, password} = formData

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({emailCont, password})
            });
            const result = await response.json();

            if (response.status === 200){
                toast.success(result.message || 'Login successfully');
                setFormData({
                    // after submit form will be empty
                    emailCont : '',
                    password : '',
                })
                localStorage.setItem('userId', result.userId);
                localStorage.setItem('userName', result.userName);

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            else{
                toast.error(result.message || 'Something went wrong');
            }
        }
        catch(error) {
            toast.error('Error!!! Unable to connect django server')
        }
    }

  return (
    <>
    <PublicLayout>
        <div className='container py-5'>
            <div className='row '>
                <div className='col-md-6 p-4'>
                    <h3 className='text-center'><FaSignInAlt className='mb-2 me-0' /> User Login </h3>

                    <form onSubmit={handleSubmit} className='card p-4 shadow-lg' >
                        <div className='mb-3 d-flex'>
                           <FaUserAlt size={25} className='mt-2 me-2' /> <input type="text" name='emailCont' className='form-control' value={formData.emailCont} onChange={handleChange} placeholder='Enter your email/contact number' required />
                        </div>
                        <div className='mb-3 d-flex'>
                            <TbLockPassword size={25} className='mt-2 me-2' /><input type="password" name='password' className='form-control' value={formData.password} onChange={handleChange} placeholder='Enter your password' required />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-outline-primary'><CgLogIn className='me-1' />Login</button>
                            <button 
                            type="button"
                            className='btn btn-outline-secondary' 
                            onClick={()=>navigate('/registration')}
                            >
                            </button>
                            </div>
                        </form>
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
                        <img src="/images/login_img.jpg" alt="login image" className='img-fluid rounded-4' style={{maxHeight: '400px'}} />
                        <h5 className='mt-3 text-center'>Registration is fast, secure and free</h5> 
                        <p className='text-muted small'>Join our food family and enjoy delicious food to your door</p>
                </div>
            </div>
        </div>
    </PublicLayout>
    <ToastContainer position='top-right' autoClose={2000} />
    </>
  )
}

export default Login