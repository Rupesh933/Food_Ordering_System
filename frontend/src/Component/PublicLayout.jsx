import React, { useEffect, useState } from 'react'
import { FaHeart, FaHome, FaShoppingCart, FaSignInAlt, FaUser, FaUserCircle } from 'react-icons/fa'
import { FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";

const PublicLayout = ({children}) => {

    const [isLogged, setIsLogged] = useState(false);
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');

    useEffect(()=>{
        if(userId){
            setIsLogged(true);
            setUserName(name);
        }
    },[userId]);

    const handleLogout = () =>{
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        setIsLogged(false);
        navigate('/login')
    }
  return (
     <div>
            <nav className="navbar navbar-expand-lg navbar-dark px-3" style={{backgroundColor: '#f7984c'}}>
                <div className="container-fluid">
                    <Link className="navbar-brand me-auto" to="/"><FaUtensils />Food Ordering System</Link>
                    <button className="navbar-toggler text-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active hover-underline " to="/"><FaHome className='me-1 mb-1' />Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to="#"><FaUtensils className='me-1 mb-1' />Menu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to="#"><FaTruck className='me-1 mb-1'/>Track</Link>
                            </li>
                            { !isLogged ? (
                                <>
                                <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to='/registration' ><FaUserPlus className='me-1 mb-1' />Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to="/login"><FaSignInAlt className='me-1 mb-1'/>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to="/admin-login"><FaUserShield className='me-1 mb-1'/>Admin</Link>
                            </li>
                            </>
                            ) : (
                                <>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to='/my-order' ><FaUser className='me-1 mb-1'/>My Order</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to="/cart"><FaShoppingCart className='me-1 mb-1'/>Cart</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to="/login" onClick={""}><FaHeart className='me-1 mb-1'/>Wishlist</Link>
                            </li>

                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle text-capitalize" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaUserShield className='me-1 mb-1'/>{userName}
                            </button>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" to='/profile'><FaUserCircle className='mb-1 me-1' />Profile</Link></li>
                                <li><Link class="dropdown-item" to='/change_password'><IoMdSettings className='mb-1 me-1' /> Change Password</Link></li>
                                <li className="nav-item">
                                <Link className="dropdown-item" to="/login" onClick={handleLogout}><CiLogout className='me-1 mb-1'/>Logout</Link>
                            </li>
                            </ul>
                            </div>
                            </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div>{children}</div>
            <footer className='text-center py-3 mt-5'>
                <div className='container'>
                    <p>&copy; 2026 food ordering system. All rights reserved</p>
                </div>
            </footer>
        </div>
  )
}

export default PublicLayout