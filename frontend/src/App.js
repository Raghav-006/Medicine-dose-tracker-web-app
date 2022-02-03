import react ,{useState} from 'react';
import './App.css';
const rootUrl = 'http://localhost:3010';

function App() {
  const [firstnme,setFirstName] = useState('')
  const [lastname,setLastName] = useState('')
  const [username,setUserName] = useState('')

  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!firstnme || !lastname || !username) return;
    const user = { firstnme, lastname,username };
    try {
      const response =  await fetch(rootUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      setFirstName('');
      setLastName('');
      setUserName('');
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">First name</label>
            <input type="text" className="form-control" id="validationCustom01" onChange={(e)=>setFirstName(e.target.value)} required/>
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">Last name</label>
            <input type="text" className="form-control" id="validationCustom02" onChange={(e)=>setLastName(e.target.value)} required/>
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustomUsername" className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text" id="inputGroupPrepend">@</span>
              <input type="text" className="form-control" onChange={(e)=>setUserName(e.target.value)} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
              <div className="invalid-feedback">
                Please choose a username.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">Submit form</button>
          </div>
        </form>
        </div>
      </header>
    </div>
  );
}

export default App;
