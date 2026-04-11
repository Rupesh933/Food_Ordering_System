import React, { useState } from 'react'
import PublicLayout from './PublicLayout';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaUserAlt } from 'react-icons/fa';

const Registration = () => {

    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        mobileNumber : '',
        password : '',
        repeatPassword : '',
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
        const {firstName, lastName, email, mobileNumber, password, repeatPassword} = formData

        if (password !== repeatPassword){
            toast.error('Password does not match');
            return;
        }
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({firstName, lastName, email, password, mobileNumber})
            });
            const result = await response.json();

            if (response.status === 201){
                toast.success(result.message || 'You have successfully register');
                setFormData({
                    // after submit form will be empty
                    firstName : '',
                    lastName : '',
                    email : '',
                    mobileNumber : '',
                    password : '',
                    repeatPassword : '',
                })
                setTimeout(() => {
                    navigate('/login');
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
            <div className='row shadow-lg rounded-4'>
                <div className='col-md-6 p-4'>
                    <h3 className='text-center'><i className='fas fa-user-plus me-2'></i>User Registration</h3>

                    <form onSubmit={handleSubmit} >
                        <div className='mb-3'>
                            <input type="text" name='firstName' className='form-control' value={formData.firstName} onChange={handleChange} placeholder='Enter First Name' required />
                        </div>
                        <div className='mb-3'>
                            <input type="text" name='lastName' className='form-control' value={formData.lastName} onChange={handleChange} placeholder='Enter Last Name' required />
                        </div>
                        <div className='mb-3'>
                            <input type="email" name='email' className='form-control' value={formData.email} onChange={handleChange} placeholder='Enter your Email' required />
                        </div>
                        <div className='mb-3'>
                            <input type="text" name='mobileNumber' className='form-control' value={formData.mobileNumber} onChange={handleChange} placeholder='Enter your contact Number' required />
                        </div>
                        <div className='mb-3'>
                            <input type="password" name='password' className='form-control' value={formData.password} onChange={handleChange} placeholder='Enter password' required />
                        </div>
                        <div className='mb-3'>
                            <input type="password" name='repeatPassword' className='form-control' value={formData.repeatPassword} onChange={handleChange} placeholder='Repeat your password' required />
                        </div>
                        <button className='btn btn-outline-primary w-100'><FaUserAlt /> Register</button>
                    </form>
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
                        <img src="/images/registration_img.avif" alt="Registration image" className='img-fluid rounded-4' style={{maxHeight: '400px'}} />
                        <h5 className='mt-3 text-center'>Registration is fast, secure and free</h5> 
                        <p className='text-muted small'>Join our food family and enjoy delicious food to your door</p>
                </div>
            </div>
        </div>
    </PublicLayout>
    <ToastContainer position='top-right' autoClose={3000} />
    </>
  )
}

export default Registration