import React,{useState,useEffect} from "react";
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import MedicineEdit from "./pages/medicine/MedicineEdit"
import MedicineCreate from "./pages/medicine/MedicineCreate";
import Medicine from './pages/medicine/Medicine';
//import Theatre from './component/Theatre'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Profile from "./pages/users/Profile";
//import studio from "@theatre/studio"
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
  }, []);

  return (
    <>
    {
      loader ?
        <div style={style}>
          <ScaleLoader size={30} color={'#F37A24'} css={override} loading={loader} />
        </div>
      :
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route index element={<Login/>} />
        <Route path="register" element={<RegisterUser/>} />
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path="users" element={<Users/>}/>

          <Route path="medicine">
            <Route index element={<Medicine />} />
            <Route path=":create" element={<MedicineCreate/>}/>
            <Route path=":id/edit" element={<MedicineEdit/>} />
          </Route>

        <Route path="profile" element={<Profile/>}/>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    }
    </>
  );
}

export default App;

const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
