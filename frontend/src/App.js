import * as React from "react";
import {BrowserRouter,Routes, Route,} from 'react-router-dom';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import NoMatch from "./pages/NoMatch";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
    {/*<Nav/>*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Login/>} />
            <Route path="/register" element={<RegisterUser/>} />
            
            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            <Route path="/*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
