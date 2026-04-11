import React, { useEffect, useState } from 'react'
import PublicLayout from '../Component/PublicLayout'
import { Link, useLocation } from 'react-router-dom'
import './styles/public.css'

const SearchPages = () => {

    const query = new URLSearchParams(useLocation().search).get('q') || '';

    const [foods, setFoods] = useState([]);

    useEffect(()=>{
        if (query) {
            fetch(`http://127.0.0.1:8000/api/food_search/?q=${query}`)
            .then(res => res.json())
            .then(data => {
                setFoods(data)
            }).catch(e => {
                alert("has error:", e.message)
            }).finally((res) => {

            })
        }
    }, [query])
    const a = useLocation().search
  return (
    <div>
        <PublicLayout >
            <div className='container py-4'>
                <h3 className='text-center text-primary'>Result for : {query}</h3>
                <h3 className='text-center text-primary'>Result for : {a}</h3>

                <div className='row mt-4'>
                    {foods.length === 0 ? (
                        <p className='text-center lead'>No Food Found</p>
                    ) : (
                        foods.map((food, index) => (
                    <div className='col-md-4 mb-4'>
                        <div className='card hoverEffect'>
                           <img src={`http://127.0.0.1:8000${food.image}`} alt={food.item_name} className='card-img-top' />
                            <div className='card-body'>
                                <h5>
                                    <Link>{food.item_name}</Link>
                                </h5>
                                <p className='card-text text-muted'>{food.item_description?.slice(0,50)}...</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>₹ {food.item_price}</span>

                                    {food.is_available ? (
                                        <Link className='btn btn-outline-primary btn-sm'>
                                    <i className='fas fa-basket-shopping me-1'></i>Order</Link>
                                    ) : (
                                        <div title='This food item is currently unavailabe, please try again later'>
                                            <button className='btn btn-outline-secondary btn-sm'>
                                    <i className='fas fa-basket-shopping me-1'></i>Currently Unavailable</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                        ))
                    )}
                </div>
            </div>
        </ PublicLayout >
    </div>
  )
}

export default SearchPages