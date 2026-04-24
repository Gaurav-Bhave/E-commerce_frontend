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

import { MyAuthprovider } from './Context/Authcontext';

import Customerlayout from './Components/Customerlayout';
import Customerdefaulthome from './Components/Customerdefaulthome';
import Customerprofile from './Pages/Customerdashboard/Customerprofile';
import Customerorders from './Pages/Customerdashboard/Customerorders';
import Customerproduct from './Pages/Customerdashboard/Customerproduct';
import Addproduct from './Pages/Admindashboard/Addproduct';


function App() {
  return (
    <>
      <MyAuthprovider>

        <BrowserRouter>
          <Routes>

            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='*' element={<h2>Page Not Found</h2>} />

            //admin dashboard
            <Route path='/admin' element={<Protectedroute><Adminlayout /></Protectedroute>}>
              <Route index element={<Dashboard />} />
              <Route path='users' element={<Users />} />
              <Route path='products' element={<Product />}>
                <Route path='add-product' element={<Addproduct />} />
              </Route>
              <Route path='orders' element={<Orders />} />
            </Route>



            //customer dashboard
            <Route path='/customer' element={<Protectedroute><Customerlayout /></Protectedroute>}>
              <Route index element={<Customerdefaulthome />} />
              <Route path='profile' element={<Customerprofile />} />
              <Route path='orders' element={<Customerorders />} />
              <Route path='product' element={<Customerproduct />} />
            </Route>


          </Routes>
        </BrowserRouter>

      </MyAuthprovider>


    </>
  );
}

export default App;
