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

        fetch(`http://127.0.0.1:8000/api/order_address/${order_number}/`)
        .then(res => res.json())
        .then(data => {
            setOrderAddress(data)
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
                                <img
                        src={`http://127.0.0.1:8000${item.food.image}`}
                        alt="food image"
                        className="img-fluid rounded-start"
                        style={{ maxHeight: "300px" }}
                            />
                            </div>
                            <div className='col-md-8'>
                                <h5 className='mt-2'>{item.food.item_name} ({item.food.item_quantity})</h5>
                                <p>{item.food.item_description?.slice(0,70)}</p>
                                <p><strong>Price:</strong> ₹{item.food.item_price}</p>
                                <p><strong>Quantity: </strong>{item.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='col-md-4'>
                { orderAddress && (
                    <div className='card shadow-sm py-4 border-0 bg-light'>
                        <h5 className='fw-semibold mb-3'>
                            <i className='fas fa-map-marker-alt me-2 text-danger'></i>Delivery Details</h5>
                        <p className='ms-1'><strong>Date: </strong>{ new Date(orderAddress.order_time).toLocaleString()}</p>
                        <p><strong>Address: </strong>{ orderAddress.address }</p>
                        <p><strong>Status: </strong>{ orderAddress.order_final_status || 'Waiting for Resturant Confirmation'}</p>
                        <p><strong>Payment Mode: </strong><span className='badge bg-info text-dark ms-2'>{ orderAddress.payment_mode }</span></p>
                        <p><strong>Total: </strong> { total }</p>

                    <a href={`http://127.0.0.1:8000/api/invoice/${order_number}`} target='_blank' className='btn btn-primary my-2 w-100'>
                        <i className='fas fa-file-invoice me-2'></i> Invoice
                    </a>
                    <a href="" className='btn btn-danger my-2 w-100'>
                        <i className='fas fa-times-circle me-2'></i>Cancle Order
                    </a>
                    </div>
                )}
            </div>
        </div>
    </div>
    </PublicLayout>
  )
}

export default OrderDetails