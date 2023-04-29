import { Navigate, Outlet } from 'react-router-dom';
import { UseGlobalContext } from '../context/Context'

const PrivateComponent = () => {
    const {user} = UseGlobalContext();
    
  return user? <Outlet/>:<Navigate to='/login' replace/>
}

export default PrivateComponent;


