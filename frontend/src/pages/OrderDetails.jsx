import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PublicLayout from '../Component/PublicLayout';

const OrderDetails = () => {

    const userId = localStorage.getItem('userId');
    const [ orderItem, setOrderItem ] = useState([]);
    const [ orderAddress, setOrderAddress ] = useState(null);
    const [ total, setTotal ] = useState(0)

    const navigate = useNavigate();

    const { order_number } = useParams();

    useEffect (() => {
        if (!userId) {
            navigate('/login')
        }

        fetch (`http://127.0.0.1:8000/api/orders/by_order_number/${order_number}/`)
        .then(res => res.json() )
        .then(data => {
            setOrderItem(data);
        const totalAmount = data.reduce(
          (sum, item) => sum + item.food.item_price * item.quantity,
          0,
        ); // calcualte total price
        setTotal(totalAmount)
        })
    },[order_number])
  return (
    < PublicLayout >
    <div className='container py-5'>
        <h3 className='mb-4 text-primary'>
            <i className='fas fa-receipt me-2'></i> Order #{order_number} Details
        </h3>
        <div className='row'>
            <div className='col-md-8'>
                {orderItem.map((item, index) => (
                    <div className='card mb-3 shadow-sm'>
                        <div className='row'>
                            <div className='col-md-4'>
                                ffffff
                            </div>
                            <div className='col-md-8'>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='col-md-4'></div>
        </div>
    </div>
    </PublicLayout>
  )
}

export default OrderDetails