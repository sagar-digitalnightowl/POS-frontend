import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreement, setAgreement] = useState('');

  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    // Validate inputs
    if (!username || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    const loginData = {
      username: username,
      password: password,
      agreement: agreement
    };

    try {
      // Step 3: Make an API request to login
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/admin/adminSign/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {

          Cookies.set('token', data?.token, {
            expires: 3,
            path: '/',
            sameSite: 'Lax',
            secure: false,
          });

          setTimeout(() => {
            navigate('/');
          }, 100)

        }
      } else {
        setMessage('Error during login. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please check your connection.');
    }
  }


  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <div className="row eq-height-row" style={{ height: '100%' }}>
        <div className="col-md-5 col-sm-5 hidden-xs left-col eq-height-col" style={{ backgroundColor: 'green', height: '100%' }}>
          <div className="left-col-content login-header" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <Link to="/" style={{ fontSize: '24px', color: 'white' }}>POS APPLICATION</Link>
              <br />
              <small style={{ color: 'white' }}>Affinity Soft</small>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-sm-7 col-xs-12 right-col eq-height-col" style={{ height: '100%' }}>
          <div className="row" style={{ height: '100%' }}>
            <div className="col-md-3 col-xs-4" style={{ textAlign: 'left' }}>
              <select className="form-control input-sm" id="change_lang" style={{ margin: 10 }}>
                <option value="en" selected>English</option>
                <option value="ar">Arabic - العَرَبِيَّة</option>
              </select>
            </div>
            <div className="col-md-9 col-xs-8" style={{ textAlign: 'right', paddingTop: 10 }}>
            </div>
            <div className="login-form col-md-12 col-xs-12 right-col-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 50px)' }}>
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <p className="form-header text-white" style={{ fontSize: '24px', textAlign: 'center' }}>Login</p>
                <form onSubmit={handleLogin}>
                  {/* Username Field */}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />{' '}
                      Remember Me
                    </label>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={agreement}
                        onChange={(e) => setAgreement(e.target.checked)}
                        required
                      />{' '}
                      I agree to the{' '}
                      <Link to="/login/general_agreement" target="_blank">
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>

                  {/* Login Button */}
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Login
                    </button>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="form-group">
                    <Link to="/password/reset">Forgot Your Password?</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
