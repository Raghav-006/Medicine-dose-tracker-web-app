import React,{useState,useEffect} from "react";
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import NewMedicine from "./pages/NewMedicine";
import Reports from './pages/Reports'
//import Theatre from './component/Theatre'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Try from "./pages/React.Form.Hook";
import Profile from "./profile/Profile";
//import studio from "@theatre/studio"
import ScaleLoader from 'react-spinners/ScaleLoader'

function App() {
  const [loader,setLoader]= useState(false)
  AOS.init({
    offset: 200,
  });
  AOS.refresh();

  // initialize the studio so the editing tools will show up on the screen
//studio.initialize()
useEffect(() => {
  setLoader(true)
  setTimeout(() => {
    setLoader(false)
  },3000)
}, [])

  return (
    <>
    {
      loader ?
        <div style={styles.preloader}>
          <ScaleLoader size={30} color={'#F37A24'} loading={loader} />
        </div>
      :
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route index element={<Login/>} />
        <Route path="register" element={<RegisterUser/>} />
        <Route path="try" element={<Try/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="medicine" element={<NewMedicine/>}/>
        <Route path="reports" element={<Reports/>}/>
        <Route path="profile" element={<Profile/>}/>
          <Route path="*" element={<NoMatch />} />
      </Routes>
    }
    </>
  );
}

export default App;

const styles ={
  preloader:{
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
    zIndex: '999999',
    backgroundPosition: 'center center'
  }
}
