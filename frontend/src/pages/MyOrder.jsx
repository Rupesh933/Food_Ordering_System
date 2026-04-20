import React, { useEffect, useState } from 'react'
import PublicLayout from '../Component/PublicLayout'
import { Link, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaInfoCircle, FaMapMarked, FaMapMarkedAlt } from 'react-icons/fa';

const MyOrder = () => {

  const userId = localStorage.getItem('userId');
  const [ order, setOrder ] = useState([]);

  const navigate = useNavigate()

  useEffect (() =>{
    if (!userId) {
      navigate('/login');
      return;
    }

    fetch (`http://127.0.0.1:8000/api/orders/${userId}`)
    .then(res => {
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      return res.json();
    })
    .then(data => {
      setOrder(data)
    })
    .catch(err => console.error("Failed to fetch orders:", err))
  }, [userId])
  return (
    <PublicLayout>
      <div className='container py-5'>
        <h3 className='text-center mb-4'>
          <FaBoxOpen className='text-warning' size={40}/> My Orders 
        </h3>
        {order.length === 0 ? (
          <p className='text-center text-muted'>You have no placed any order yet..</p>
        ) : (
          order.map((orderItem, index) => (
            <div key={index} className='card mb-4 shadow-sm'>
              <div className='card-body d-flex align-items-center flex-wrap'>
                <div className='me-2'>
                  <FaBoxOpen/>
                </div>
                <div className='flex-grow-1'>
                  <h5 className='mb-1'>
                    <Link >
                    Order #{orderItem.order_number}
                    </ Link>
                  </h5>
                  <p className='text-muted mb-1'>
                    <strong>Date: </strong> {new Date (orderItem.order_time).toLocaleString()}
                  </p>
                  <span className='badge bg-secondary p-2'>{orderItem.order_final_status}</span>
                </div>
                <div className='mt-3 mt-md-0'>
                  <Link className='btn btn-outline-secondary btn-sm me-2 px-3'><FaMapMarkedAlt /> Track</Link>
                  <Link className='btn btn-outline-primary btn-sm me-2 px-3' to={`/order-details/${order.order_number}`}><FaInfoCircle className='mb-1 mx-1' />View Details</Link>
                </div>
              </div>
            </div>
          ))
        ) }
      </div>
    </PublicLayout>
  )
}

export default MyOrder