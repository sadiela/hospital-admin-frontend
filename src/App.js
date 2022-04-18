import {useState} from 'react';
//import './App.css';
import GoogleLogin from 'react-google-login'
import LoggedIn from './LoggedIn';

function App() {

  const admin_list = ['sadiela@bu.edu']

  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
    ? JSON.parse(localStorage.getItem('loginData'))
    : null
  )

  const handleFailure = (result) => {
    alert(result);
  }

  const handleLogin = async (googleData) => {
    console.log(googleData)
    console.log(googleData.Du.tf, googleData.Du.tv)
    var google_login_data = {
      "username": googleData.Du.tf,
      "user_email": googleData.Du.tv
    }

    setLoginData(google_login_data);
    localStorage.setItem('loginData', JSON.stringify(google_login_data))
  }

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {
            (loginData && admin_list.includes(loginData.user_email)) ? (
              <div>
                <LoggedIn/>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ):(
              <div>
              <h1>Login to Hospital Admin Page</h1>
              <GoogleLogin 
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
              </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
