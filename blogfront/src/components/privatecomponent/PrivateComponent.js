import { Navigate, Outlet } from 'react-router-dom';
import { UseGlobalContext } from '../context/Context'

const PrivateComponent = () => {
   let user = JSON.parse(localStorage.getItem("user"));
    
  return user? <Outlet/>:<Navigate to='/login' replace/>
}

export default PrivateComponent;


