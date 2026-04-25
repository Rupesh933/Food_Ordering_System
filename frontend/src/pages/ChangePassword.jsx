import React from 'react'

const ChangePassword = () => {
  return (
    <PublicLayout > 
        <ToastContainer position="top-center" autoClose={2000} />
        <div className='container py-5'>
        <h3 className='text-center text-primary mb-4'>
            <i className='fas fe-key me-1'></i>Change Password
        </h3>
        <form onSubmit={handleSubmit} className='card p-4 shadow-sm'>
            <div className='row'>
                <div className='col-md-6 mb-3'>
                    <label className='mb-2'>Current Password: </label>
                    <input type='text' className='form-control' name='currentPassword' value={formData.currentPassword} onChange={handleChange} placeholder='Enter Your Current Password' />
                </div>
                <div className='col-md-6 mb-3'>
                    <label className='mb-2'>New Password: </label>
                    <input type='text' className='form-control' name='newPassword' value={formData.newPassword} onChange={handleChange} placeholder='Enter New Password'/>
                </div>
                <div className='col-md-6 mb-3'>
                    <label className='mb-2'>Confirm Password: </label>
                    <input type='text' className='form-control' name='confirmPassword' value={formData.confirmPassword} disabled/>
                </div>
            </div>
            <button type='submit' className='btn btn-primary mt-3'><i className='fas fe-key me-2'></i>Change Password</button>
        </form>
    </div>
    </PublicLayout>
  )
}

export default ChangePassword