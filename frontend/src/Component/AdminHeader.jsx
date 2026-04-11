import React, { useState } from 'react'
import { FaBars, FaBell, FaChevronLeft, FaChevronRight, FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({toggleSidebar, sideBarOpen}) => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('adminUser');    //  Remove adminUser from localStorage
        navigate('/admin-login');     // Redirect to /admin-login page
    }
  return (
    <nav className='navbar navbar-expand-lg nav-light bg-white border-bottom px-3 shadow-sm py-3'>
        <button className='btn btn-outline-dark me-3' onClick={toggleSidebar}>
            {sideBarOpen ? < FaChevronLeft /> : < FaChevronRight />}
        </button>
            <span className='navbar-brand fw-semibold mb-0'><i className='fas fa-utensils '></i>Food Ordering System</span>
            <button className='navbar-toggler border-0 ms-auto'>
                < FaBars />
            </button>
            <div className='d-none d-lg-flex collapse navbar-collapse'>
                    <ul className='navbar-nav ms-auto align-item-center gap-3'>
                        <li className='nav-item'>
                            <button className='btn btn-outline-secondary no-border'>< FaBell /></button>
                        </li>
                        <li className='nav-item'>
                            <button className='btn btn-outline-danger' onClick={handleLogout}>< FaSignInAlt className='me-2' />Logout</button>
                        </li>
                    </ul>
                </div>
    </nav>
  )
}

export default AdminHeader
