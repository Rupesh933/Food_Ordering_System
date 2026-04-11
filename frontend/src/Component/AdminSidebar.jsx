import React, { useState } from 'react'
import '../pages/styles/admin.css'
import { Link } from 'react-router-dom';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { FaBox, FaCheck, FaChevronDown, FaChevronUp, FaFile, FaTruck, FaUsers } from "react-icons/fa";
import { MdCancel, MdOutlineRateReview, MdPending, MdTakeoutDining } from "react-icons/md";
import { FcSearch } from "react-icons/fc";
import { IoMdAdd, IoMdCheckmarkCircle } from "react-icons/io";
import { SiManageiq } from "react-icons/si";


const AdminSidebar = ({ isOpen }) => {
  
  const [openMenus, setopenMenus] = useState({
    category : false,
    food : false,
    orders : false,
    food_item : false,
  });

  const toggleMenu = (menu) => {
    setopenMenus((prev) => ({...prev, [menu] : ! prev[menu]}))
  }


  return (
    <div className={`text-white sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`} style={{backgroundColor: '#212529'}}>
      <div className='text-center p-3'>
        <img src="/images/admin-work.jpg" className='img-fluid rounded-circle mb-1' width={'100px'} alt="Admin Image" />
        <h6 className='mb-0'>Admin</h6>
      </div>
      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white ' >
        <RiDashboardHorizontalFill className='me-1 mb-1 border-0' />Dashboard</Link>
      </div>


      <div className='list-group list-group-flush border-0'>
        <Link className='list-group-item list-group-item-action bg-dark text-white border-0' onClick={() => toggleMenu('category')}>
        <IoFastFood className='me-1 mb-1 border-0' />Food Category { openMenus.category ? < FaChevronUp /> : < FaChevronDown /> } </Link>
        {openMenus.category && (
          <>
            <Link className='list-group-item list-group-item-action bg-dark text-white ps-5 border-0' to={'/add-category'}>
              <IoMdAdd className='me-1 mb-1 border-0' />Add Category
            </Link>
            <Link className='list-group-item list-group-item-action bg-dark text-white ps-5' to={'/manage-category'}>
              <SiManageiq className='me-1 mb-1 border-0' />Manage Category
            </Link>
          </>
        )}
      </div>

      <div className='list-group list-group-flush border-0'>
        <Link className='list-group-item list-group-item-action bg-dark text-white border-0' onClick={() => toggleMenu('food_item')}>
        <FaBowlFood className='me-1 mb-1 border-0' />Food Menu { openMenus.food_item ? < FaChevronUp /> : < FaChevronDown /> } </Link>
        {openMenus.food_item && (
          <>
            <Link className='list-group-item list-group-item-action bg-dark text-white ps-5 border-0' to={'/add-food'}>
              <IoMdAdd className='me-1 mb-1 border-0' />Add food item
            </Link>
            <Link className='list-group-item list-group-item-action bg-dark text-white ps-5' to={'/manage-food'}>
              <SiManageiq className='me-1 mb-1 border-0' />Manage Foods
            </Link>
          </>
        )}
      </div>


      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white' >
        <FaUsers className='me-1 mb-1 border-0' />Register User</Link>
      </div>
      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white' >
        <MdOutlineRateReview className='me-1 mb-1 border-0' />Manage Review</Link>
      </div>
      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white' >
        <FcSearch className='me-1 mb-1 border-0' />Search</Link>
      </div>

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white border-0' onClick={() => toggleMenu('orders')}>
        <IoFastFood className='me-1 mb-1 border-0' />Order { openMenus.orders ? < FaChevronUp /> : < FaChevronDown /> }  </Link>

        {openMenus.orders && (
          <>
            <button className='list-group-item list-group-item-action bg-dark text-white ps-5 border-0'>
              <MdPending className='me-1 mb-1 border-0' />Not Confirmed
            </button>
            <button className='list-group-item list-group-item-action bg-dark text-white ps-5 border-0'>
              <FaCheck className='me-1 mb-1 border-0' />Confirmed
            </button>
            <button className='list-group-item list-group-item-action bg-dark text-white ps-5 border-0'>
              < FaBox className='me-1 mb-1 border-0' />Being Prepared
            </button>
            <button className='list-group-item list-group-item-action bg-dark text-white ps-5 border-0'>
              < MdTakeoutDining className='me-1 mb-1 border-0' />Pickup
            </button>
            <button className='list-group-item list-group-item-action bg-dark text-white ps-5 border-0'>
              <FaTruck className='me-1 mb-1 border-0' />Delivered
            </button>
            <button className='list-group-item list-group-item-action bg-dark text-white ps-5 border-0'>
              <MdCancel className='me-1 mb-1 border-0' /> Canceled
            </button>
          </>
        )}
      </div>

      <div className='list-group list-group-flush'>
        < Link className='list-group-item list-group-item-action bg-dark text-white' > 
          < FaFile className='me-1 mb-1 border-0' />B/w Dates Report </Link>
      </div>

    </div>
  )
}

export default AdminSidebar