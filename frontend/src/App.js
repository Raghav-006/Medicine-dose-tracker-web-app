import * as React from "react";
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import NewMedicine from "./pages/NewMedicine";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<RegisterUser/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/medicine" element={<NewMedicine/>}/>
          <Route path="/*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
