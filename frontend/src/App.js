import * as React from "react";
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import NewMedicine from "./pages/NewMedicine";
import Reports from './pages/Reports'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Try from "./pages/try";

function App() {
  AOS.init({
    offset: 200,
  });
  AOS.refresh();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route index element={<Login/>} />
        <Route path="register" element={<RegisterUser/>} />
        <Route path="try" element={<Try/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="medicine" element={<NewMedicine/>}/>
        <Route path="reports" element={<Reports/>}/>
          <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
