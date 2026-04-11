import React, { useEffect, useState } from 'react'
import PublicLayout from './PublicLayout'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const FoodDetails = () => {

    const userId = localStorage.getItem('userId');  // to get user id from browser
    const [food, setFood] = useState(null)
    const {id} = useParams()   // Store food id

    useEffect(() => {   // run side effects(like api call) after component renders
        fetch (`http://127.0.0.1:8000/api/foods/${id}`)    // Makes an HTTP GET request to your Django backend. The id variable is interpolated into the URL (e.g., /api/foods/42).
            .then(res => res.json())   // Converts the raw HTTP response into JSON format.
            .then(data => {   // Updates React state with the fetched data, triggering a re-render to display the food item.
                setFood(data)
            })
    },[id]);

    const navigate = useNavigate()
    const handleAddToCart = async () => {
        if (!userId){
            navigate('/login'); // if userid is false navigate to login page
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart/add/', 
                {
                    method : 'POST',
                    headers : {'Content-Type': 'application/json'},
                    body : JSON.stringify({
                        userId : userId,
                        foodId : id,
                    })
                }
             )
             const result = await response.json()

             if (response.status === 200){
                toast.success(result.message || 'Item added to Cart')
             }
             else{
                toast.error(result.message || 'Something went wrong')
             }
        }
        catch(error) {
            toast.error('Error!!! Unable to connect to server')
        }

    }

    if (!food) return <div>Loading</div>   //  if food = empty
  return (
    <div>
        <PublicLayout >
            <ToastContainer position='top-right' autoClose={3000} />
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-5 text-center'>
                <img src={`http://127.0.0.1:8000/${food.image}`} style={{height:'300px', width:'100%'}} alt="food image" />
                </div>
                <div className='col-md-7 text-left'>
                <h2>{food.item_name}</h2>
                <p className='text-muted'>{food.item_description}</p>
                <p><strong>Category: </strong>{food.category_name}</p>
                <h4 className=''>Price: <strong>₹{food.item_price}</strong></h4>
                <p className='mt-3'>Shipping : free</p>
                <p>id : {food.id}</p>
                { food.is_available ? (
                <button className='btn btn-warning btn-lg mt-3 px-4' onClick={handleAddToCart}><i className='fas fa-cart-plus me-2'></i>Add to Cart</button>
            ) : (
                <button className='btn btn-secondary btn-lg mt-3 px-4'><i className='fas fa-cart-plus me-2'></i>Add to Cart</button>
            ) }
            </div>
                </div>
            </div>
        </PublicLayout>
    </div>
  )
}

export default FoodDetails