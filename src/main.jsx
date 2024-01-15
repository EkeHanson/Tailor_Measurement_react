import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
// import Landingpage from './Components/Landpage/Landingpage';

import CustomerList from './components/CustomerList/CustomerList.jsx';
import MeasurementDetail from './components/MeasurementDetails/MeasurementDetails.jsx';
import CreateCustomer from './components/CreateCustomer/CreateCustomer.jsx';
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    }, 
    {
      path: "/customers",
      element: <CustomerList/>,
    },
    {
      path: "/customerdetails",
      element: <MeasurementDetail/>,
    },
    {
      path: "/create-customer",
      element: <CreateCustomer/>,
    },
  
  ]);
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
