import React, { useEffect, useState } from 'react'
import PublicLayout from '../Component/PublicLayout'
import './styles/public.css'
import { Link } from 'react-router-dom';


const Home = () => {

    const [foods, setFoods] = useState([]);

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/random_foods/`)
        .then(res => res.json())
        .then(data => {
            setFoods(data)
        })
    }, [])  // [] means run only once when component loads
  return (
   <>
   < PublicLayout >
   <section className='py-5 text-center hero' style={{background:"url('images/food_img1.jpg')"}}>
      <div style={{backgroundColor: 'rgba(0,0,0,0.5)', padding:'40px 20px', borderRadius: '10px'}}>
        <h1 className='display-4'>Quick & Hot Food, Delivered to you</h1>
        <p className='lead'>
            Craving something tasty ! Lets get it to your door!!
        </p>
        <form method='GET' action="/search-food" className='d-flex mt-3 gap-1' style={{maxWidth: '600px', margin: '20px 100px'}}>
            <input type="text" className='form-control' name='q' placeholder='i would to eat....' style={{borderTopRightRadius: '0px', borderBottomRightRadius:'0px'}}/>
            <button type='submit' className='btn btn-outline-warning ' style={{borderTopLeftRadius:'0px', borderBottomLeftRadius:'0px'}}>Search</button>
        </form>
      </div>
   </section>
   <section className='py-5 container'>
    <div className='text-center'>
        <h2 className='text-center'>
            Most loved Dishes This Month <span className='badge bg-success'>Top picks</span>
        </h2>
    </div>
    <div className='row mt-4'>
                    {foods.length === 0 ? (
                        <p className='text-center lead'>No Food Found</p>
                    ) : (
                        foods.map((food, index) => (
                    <div className='col-md-4 mb-4' >
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
                                        <Link className='btn btn-outline-primary btn-sm' to={`/food/${food.id}`}>
                                    <i className='fas fa-basket-shopping me-1'></i>Order Now</Link>
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
   </section>
   <section className='py-5 bg-dark text-white'>
    <div className="container text-center">
        <h2>Ordering in 3 simple steps</h2>
        <div className='row mt-4'>
            <div className='col-md-4'>
                <h4>Pack a dish you love</h4>
                <p>Explore hundreds of mouth watering option and choose what you crave</p>
            </div>
            <div className='col-md-4'>
                <h4>Pack a dish you love</h4>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea beatae odit aliquam quasi molestias ut odio delectus necessitatibus sapiente, dolore voluptates vel ipsa perspiciatis ipsum.</p>
            </div>
            <div className='col-md-4'>
                <h4>Pack a dish you love</h4>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, autem repellendus quia suscipit quas dolorum.</p>
            </div>
        </div>
    </div>
   </section>
   <section className='py-5 bg-warning text-center text-dark'>
     <h4>Ready to sarisfy your Hunger...</h4>
     <Link className='btn btn-dark btn-lg'>Browser for all Menu</Link>
   </section>
   </PublicLayout>
   </>
  )
}

export default Home