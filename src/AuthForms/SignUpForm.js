import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AuthForms.css';
import { useState } from 'react';
import { ApiService } from '../ApiService/ApiService';
import { inputChangeHandler } from '../common/utils';

export const SignUpForm = () => {
  const api = new ApiService();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  
  const signUp = async (event) => {
    if (!username || !password || !password) return alert('All fields must be field');
    if (password !== confirmedPassword) return alert('Passwords must be equal');
    try {
      const result = await api.postData('users/signup', {username, password});
      console.log(result);
      alert(`Created new user with username ${username}`);
    } catch(e) {
      alert('Username are taken');
    };
  }

  return (
    <Form onSubmit={async (e) => await signUp(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={(e)=>inputChangeHandler(setUsername, e)} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>inputChangeHandler(setPassword, e)} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>inputChangeHandler(setConfirmedPassword, e)} required />
      </Form.Group>
      <Button variant="primary" type="submit" >
         Create new account
      </Button> 
    </Form>
  );
}