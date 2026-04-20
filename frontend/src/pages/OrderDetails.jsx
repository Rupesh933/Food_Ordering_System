import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

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
            setOrderAddress(data);
        const totalAmount = data.reduce(
          (sum, item) => sum + item.food.item_price * item.quantity,
          0,
        ); // calcualte total price
        setTotal(totalAmount)
        })
    },[order_number])
  return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails