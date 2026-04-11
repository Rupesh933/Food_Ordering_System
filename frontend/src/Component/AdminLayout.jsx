import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useState, useEffect } from 'react'

const AdminLayout = ({ children }) => {

    const [ sideBarOpen, setSideBarOpen ] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768 ){
                setSideBarOpen(false);   // Mobile view
            }
            else {
                setSideBarOpen(true);  // Desktop view
            }
        }
        
        handleResize();  // Runs immediately when component loads 

        window.addEventListener('resize', handleResize)
        
        // Cleanup function
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const toggleSidebar = () => setSideBarOpen(prev => !prev);

  return (
    <div className='d-flex' >
        <AdminSidebar isOpen={sideBarOpen} />
        <div id='page-content-wrapper' className={`flex-grow-1 ${sideBarOpen ? 'with-sidebar' : 'full-sidebar'}`} >
            <AdminHeader toggleSidebar = { toggleSidebar } sideBarOpen = { sideBarOpen } />
            <div className='container-fluid mt-4'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default AdminLayout