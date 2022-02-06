import * as React from "react";
import {BrowserRouter,Routes, Route, Link} from 'react-router-dom';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import NoMatch from "./pages/NoMatch";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
      <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
                    </ul>

                    <div className="text-end">
                        <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                        <Link to="/register" className="btn btn-outline-light me-2">Register</Link>
                    </div>
                </div>
            </div>
        </header>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>} />
              <Route path="/login" element={<Login/>} />
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
