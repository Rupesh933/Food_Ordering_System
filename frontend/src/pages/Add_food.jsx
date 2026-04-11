import React, { useEffect, useState } from 'react'
import AdminLayout from '../Component/AdminLayout'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaSignInAlt } from 'react-icons/fa';

const Add_food = () => {

    const [categories, setCategories] = useState([]);    // empty array because
    const [formData, setFormData] = useState({
        category : '',
        item_name : '',
        item_price : '',
        item_description : '',
        image : null,
        item_quantity : '',
    })
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/')
        .then(res => res.json())
        .then(data => {
            setCategories(data)
        })
    },[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }))
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0]
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();     // when textual and document send with combine
        data.append('category', formData.category);
        data.append('item_name', formData.item_name);
        data.append('item_price', formData.item_price);
        data.append('item_description', formData.item_description);
        data.append('item_quantity', formData.item_quantity);
        // data.append('image', formData.image);   sends 'null' string to Django
        if (formData.image) data.append('image', formData.image);    // only sends image if user selected one

        try{
            const response = await fetch('http://127.0.0.1:8000/api/add-food-item/', {
            method : 'POST',
            body : data,
            });

            const result = await response.json();

            if (response.status === 201){
                toast.success(result.message);
                // after submit form all data will be erase
                setFormData({
                    category : '',
                    item_name : '',
                    item_price : '',
                    item_description : '',
                    image : null,
                    item_quantity : '',
                });
            }
            else{
                toast.error(result.message)
            }
        }
        catch (error) {
            console.error(error);
            toast.error('Django Server is not running...!')
        }
    }
    
  return (
    <AdminLayout>
        <ToastContainer position='top-right' autoClose={2000} />
        <div className='row d-flex justify-content-center align-items-center' style={{backgroundColor: '#eddba8'}}>
            <div className='col-md-8 p-4 shadow-sm rounded '>
                <h2 className='mb-4'>
                    <i className='fas fa-plus-circle text-primary me-1'></i>Add Food Item</h2>

                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className='mb-3'>
                        <label htmlFor="categoryName" className='form-label'>Category Name</label>
                        {/* Bug 7: <select> must have a name attr for handleChange to work */}
                        <select name='category' className='form-select' value={formData.category} onChange={handleChange} >
                            <option value=''>-- Select Category --</option>
                            {categories.map((cat) =>
                            <option key={cat.id} value={cat.id} required>{cat.category_name}</option>  // category access from id 
                            )}
                        </select>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="foodName" className='form-label'>Enter Food Item Name</label>
                        <input type="text" name='item_name' className='form-control' value={formData.item_name} onChange={handleChange} placeholder='Enter Food Item Name' required />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="description" className='form-label'>Description of Food</label>
                        <textarea name='item_description' className='form-control' value={formData.item_description} onChange={handleChange} placeholder='food description' rows='3' required />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="quantity" className='form-label'>Quantity of Item</label>
                        <input type="text" name='item_quantity' className='form-control' value={formData.item_quantity} onChange={handleChange} placeholder='e.g. 2 pcs / Large' required />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="price" className='form-label'>Price (₹)</label>
                        <input type="number" name='item_price' step='0.01' className='form-control' value={formData.item_price} onChange={handleChange} placeholder='e.g. 199.99' required />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="image" className='form-label'>Enter Image</label>
                        <input type="file" name='image' accept='image/*' onChange={handleFileChange} />
                    </div>

                    <button type='submit' className='btn btn-primary mt-3'>
                        <FaSignInAlt className='me-1' /> Add Food Item
                    </button>
                </form>
            </div>
            <div className='col-md-4 d-flex justify-content-center align-items-center rounded ' style={{backgroundImage: 'url("/images/food_addJSX.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '670px'}} ></div>
        </div>
    </AdminLayout>
  )
}

export default Add_food