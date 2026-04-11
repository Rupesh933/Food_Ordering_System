import React, { useState } from 'react'
import AdminLayout from '../Component/AdminLayout'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaSignInAlt } from 'react-icons/fa';

const AddCategory = () => {

    const [categoryName, setCategoryName] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/api/add-category/', {
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({'category_name' : categoryName})
            });
            const data = await response.json();

            if (response.status === 201){
                toast.success(data.message);
            }
            else{
                toast.error(data.message)
            }
        }
        catch (error) {
            console.error(error);
            toast.error('Django Server is not running...!')
        }
    }

  return (
    <>
    <AdminLayout>
        < ToastContainer position='top-right' autoClose={2000} />
        <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-md-8 p-4 shadow-sm rounded '>
                <h2 className='mb-4'>
                    <i className='fas fa-plus-circle text-primary me-1'></i>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="categoryName" className='form-label'>Category Name</label>
                        <input type="text" className='form-control' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder='Enter Category Name' />
                    </div>
                    <button type='submit' className='btn btn-primary mt-3'>
                        < FaSignInAlt className='me-1' /> Add Category
                    </button>
                </form>
            </div>
            <div className='col-md-4 d-flex justify-content-center align-item-center'>
                    <i className='fas fa-utensils ' style={{fontSize:'180px', color:'#b0b0b0ff'}}></i>
            </div>
        </div>
    </AdminLayout>
    </>
  )
}
export default AddCategory