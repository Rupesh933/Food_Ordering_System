import React, { useEffect, useState } from 'react'
import AdminLayout from '../Component/AdminLayout'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv'
const ManageFood = () => {

    const [foods, setFoods] = useState([]);    // empty array because
        const [allFoods, setAllFoods] = useState([]);
    
        useEffect(() => {
            fetch('http://127.0.0.1:8000/api/manage-food/')
            .then(res => res.json())
            .then(data =>{
                setFoods(data)
                setAllFoods(data)
            })
        },[]);
    
        const handleSearch = (search) =>{
            const keyword = search.toLowerCase();
            if (!keyword){
                setFoods(allFoods);
            }
            else{
            const filtered = allFoods.filter((food) => food.category_name.toLowerCase().includes(keyword))
            setFoods(filtered)
            }
        };
                // when you download csv file this code show proper date and time
                const formattedData = foods.map(item => {
                const dateObj = new Date(item.creation_date);
    
                const date = dateObj.getDate().toString().padStart(2, '0');
                const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const year = dateObj.getFullYear();
                    console.log(new Date(item.creation_date));
                return {
                    ...item,
                    date: `${date}-${month}-${year}`,   // ✅ 31-03-2026
                    time: dateObj.toLocaleTimeString()
                };
                });

  return (
    <AdminLayout>
        <div className=''>
            <h3 className='text-center text-primary mb-4'>
                <i className='fas fa-list me-1'></i>Manage Foods
            </h3>
            <h5 className='text-end text-muted'>
                <i className='fas fa-database'></i>Total Foods
                <span className='ms-2 badge bg-success'>{foods.length}</span>
            </h5>

            <div className='mb-3 d-flex justify-content-between'>
                <input type="text" className='form-control w-50 d-block' placeholder='Search by Category name' onChange={(e) => handleSearch(e.target.value)} />
                <CSVLink data={formattedData} className='btn btn-success' filename="foods_list.csv"><i className='fas fa-file-csv me-2'></i>Export to</CSVLink>
            </div>

            {/* <p>{JSON.stringify(categories)}</p> */}

            <table className='table table-hover'>
                <thead className=''>
                    <tr>
                        <th>S.No</th>
                        <th>Food Item Name</th>
                        <th>Creation at</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { foods.map((fod,index)=>
                    <tr key={ fod.id }>
                        <td>{index +1}</td>
                        <td>{fod.category_name}</td>
                        <td>{fod.item_name }</td>
                        {/* <td>{new Date(fod.creation_date).toLocaleTimeString()}</td> */}
                        <td>
                            <Link className='btn btn-sm btn-primary me-2 gap-1'>
                            <i className='fas fa-edit'></i>Edit</Link>
                            <Link className='btn btn-sm btn-danger'>
                            <i className='fas fa-trash-alt me-1'></i>Delete</Link>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </AdminLayout>
  )
}

export default ManageFood