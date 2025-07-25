import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router';

import { API } from '../service/api';
import { DataContext } from '../context/DataProvider';
import { isUserAuthenticated } from '../utils/authHelper';


const PageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:100vw;
  background-color: #f5f5f5;
`;

const Component = styled(Box)`
  width: 400px;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:40px 0;
`;

const Image = styled('img')({
  width: 100,
  display: 'flex',
  margin: 'auto',
  padding: '50px 0 0'
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  & > div, & > button, & > p {
    margin-top: 20px;
  }
`;


const LoginButton = styled(Button)`
  text-transform: none;
  background: #FB641B;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: '',
  password: ''
};

const signupInitialValues = {
  name: '',
  username: '',
  password: ''
};

const Login = () => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState('');
  const [account, toggleAccount] = useState('login');

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    console.log("Login form payload:", login);
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError('');

      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
      setAccount({ name: response.data.name, username: response.data.username });

      navigate('/home');
      setLogin(loginInitialValues);
      
    } else {
      showError('Something went wrong! Please try again later');
    }
  };

  const signupUser = async () => {
    console.log('Signup form data:', signup);
    const response = await API.userSignup(signup);
    if (response.isSuccess) {
      showError('');
      setSignup(signupInitialValues);
      toggleAccount('login');
    } else {
      showError('response.error');
    }
  };

  const toggleSignup = () => {
    account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
  };

  return (
    <PageContainer>
      <Component>
        <Image src={imageURL} alt="blog" />
        {
          account === 'login' ?
            <Wrapper>
              <TextField variant="standard" value={login.username} onChange={onValueChange} name='username' label='Enter Username' />
              <TextField variant="standard" value={login.password} onChange={onValueChange} name='password' label='Enter Password' />

              {error && <Error>{error}</Error>}

              <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
              <Text style={{ textAlign: 'center' }}>OR</Text>
              <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>Create an account</SignupButton>
            </Wrapper> :
            <Wrapper>
              <TextField 
              variant="standard" 
              name="name"
              label='Enter Name'
              value={signup.name||''} 
              onChange={onInputChange} 
              
              />
              <TextField 
              variant="standard" 
              onChange={onInputChange} 
              name='username'
              value={signup.username || ''} 
              label='Enter Username' />
              <TextField 
              variant="standard" 
              onChange={onInputChange}
              name='password'
              type='password' 
              value={signup.password||''}
              label='Enter Password' />

              <SignupButton onClick={signupUser}>Signup</SignupButton>
              <Text style={{ textAlign: 'center' }}>OR</Text>
              <LoginButton variant="contained" onClick={toggleSignup}>Already have an account</LoginButton>
            </Wrapper>
        }
      </Component>
    </PageContainer>
  );
};

export default Login;
