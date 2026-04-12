import React, { useEffect, useState } from 'react'
import PublicLayout from '../Component/PublicLayout'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaShoppingCart } from 'react-icons/fa';

const Cart = () => {

  const userId = localStorage.getItem('userId');
  const [cartItem, setCartItem] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(()=>{
    if(!userId) {
      return;
    }
    fetch(`http://127.0.0.1:8000/api/cart/${userId}`)
    .then(res => res.json())
    .then(data => {
      setCartItem(data)
      const total = data.reduce((sum, item) => sum + item.food.item_price * item.quantity, 0);  // calcualte total price
      setGrandTotal(total);  // set total price of item 
    })
  }, [userId]);   // whenever userid will be changed useEffect reload the page
  return (
    <PublicLayout >
      <ToastContainer position='top-center' autoClose={2000}/>
    <div className='container py-5'>
      <h2 className='mb-4 text-center'><FaShoppingCart className='me-2 mb-2' />Your Cart</h2>
      {cartItem.length === 0 ? (
        <p>Your Cart is Empty</p>
      ) : (
        <div className='row'>
          {cartItem.map((item) => {
            <div className='col-md-6 mb-4'>
              <div className='card shadow-sm'>
                <div className='row'>
                  <div className='col-md-4'>
                    <img src={`http://127.0.0.1:8000${item.food.image}`} className='image-fluid ' alt="food image" />
                  </div>
                  <div className='col-md-8'></div>
                </div>
              </div>
            </div>
          })}
        </div>
      )
      } 
    </div>
    </ PublicLayout>
  )
}

export default Cart