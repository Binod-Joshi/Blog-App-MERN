import React from 'react'
import './DeleteAccount.css'
import { useNavigate } from 'react-router-dom'
import { UseGlobalContext } from '../../context/Context'

const DeleteAccount = () => {
    let {user,deleteUser} = UseGlobalContext();
    const navigate = useNavigate();
    const deleteAccount = async() => {

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user?._id}`,{
        method:"delete",
       })
        console.log("account deleted sucessfully.")
        localStorage.clear();
        deleteUser();
        navigate('/login');
    }
    const cancel = () => {
         navigate(`/update`);
    }
  return (
    <div className="logouts">
    <div className='logout'>
        <h1 className='h1'>Confirm to delete account.</h1>
      <div className="buttons">
        <button onClick={deleteAccount} className='ok' >Ok</button>
        <button onClick={cancel} className='cancel'>Cancel</button>
      </div>
    </div>
    </div>
  )
}

export default DeleteAccount;
