import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Adminlayout from './Components/Adminlayout';
import Dashboard from './Pages/Admindashboard/Dashboard';
import Users from './Pages/Admindashboard/Users';
import Product from './Pages/Admindashboard/Product';
import Orders from './Pages/Admindashboard/Orders';
import Apitesting from './Pages/testing/Apitesting';
import Axiosapi from './Pages/testing/Axiosapi';
import Getapiaxios from './Pages/testing/Getapiaxios';
import Protectedroute from './Components/Protectedroute';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='*' element={<h2>Page Not Found</h2>} />


          <Route path='/admin' element= {<Protectedroute><Adminlayout /></Protectedroute>}>
            <Route index element={<Dashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='products' element={<Product />} />
            <Route path='orders' element={<Orders />} />
          </Route>


        </Routes>
      </BrowserRouter>

        
      {/* <Axiosapi/> */}
{/* 
      <Getapiaxios/> */}

      

    </>
  );
}

export default App;
