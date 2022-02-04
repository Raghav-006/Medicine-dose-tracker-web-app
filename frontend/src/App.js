import {useState} from 'react';
import './Form.css';
const rootUrl = 'http://localhost:3010';

function App() {
  const [email,setEmail] = useState(' ');
  const [password,setPassword] = useState(' ');
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!email || !password) return;
    const user = { email, password };
    try {
      await fetch(rootUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      setEmail(' ');
      setPassword(' ');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='App-header'>
      <form className='form' onSubmit={handleSubmit}>
        <h4>login form</h4>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-input email-input'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            className='form-input password-input'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-block submit-btn'>
          submit
        </button>
      </form>

    </div>
  );
}

export default App;
