import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin_login from './pages/Admin_login'
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './pages/AddCategory'
import ManageCategory from './pages/ManageCategory'
import Add_food from './pages/Add_food'
import ManageFood from './pages/ManageFood'
import Home from './pages/Home'
import SearchPages from './pages/SearchPages'
import Registration from './Component/Registration'
import Login from './Component/Login'
import FoodDetails from './Component/FoodDetails'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/admin-login' element={ <Admin_login />} />
        <Route path='/admin-dashboard' element={ <AdminDashboard /> } />
        <Route path='/add-category' element={ <AddCategory/>} />
        <Route path='/manage-category' element={ < ManageCategory /> } />
        <Route path='/add-food' element={ <Add_food />} />
        <Route path='/manage-food' element={ <ManageFood />} />
        <Route path='/search-food' element={ <SearchPages />} />
        <Route path='/registration' element={ <Registration /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/food/:id' element={ <FoodDetails /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
