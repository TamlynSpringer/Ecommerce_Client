import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../context/Store';

const SellerRoutes = ({children}) => {
  const { state } = useContext(Store);
  const { userInfo} = state;
  return (
    userInfo && userInfo.isSeller ? children : <Navigate to='/login' />
  )
};

export default SellerRoutes;