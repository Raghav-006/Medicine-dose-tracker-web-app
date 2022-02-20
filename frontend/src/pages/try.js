import React from 'react';

const Try =()=> {
  return (
    <>
            
    <div id="intro" className="bg-images shadow-2-strong" style={{height: '100vh'}}>
      <div className="mask d-flex align-items-center h-100 tt">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <form className="bg-white  rounded-5 shadow-5-strong p-5">
                
                <div className="form-outline mb-4">
                  <input type="email" id="form1Example1" className="form-control" />
                  <label className="form-label" htmlFor="form1Example1">Email address</label>
                </div>

                
                <div className="form-outline mb-4">
                  <input type="password" id="form1Example2" className="form-control" />
                  <label className="form-label" htmlFor="form1Example2">Password</label>
                </div>

                
                <div className="row mb-4">
                  <div className="col d-flex justify-content-center">
                    
                  <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked='true' />
                      <label className="form-check-label" for="form1Example3">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="col text-center">
                    
                    <a href="#!">Forgot password?</a>
                  </div>
                </div>

                
                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default Try
