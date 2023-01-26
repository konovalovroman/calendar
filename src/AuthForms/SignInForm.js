import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AuthForms.css';
import { ApiService } from '../ApiService/ApiService';
import { useState } from 'react';
import { LocalStorageService } from '../LocalStorageServive/LocalStorageService';
import { inputChangeHandler } from '../common/utils';

export const SignInForm = () => {

  const api = new ApiService();
  const storage = new LocalStorageService();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (event) => {
    event.preventDefault();
    if (!username || !password || !password) return alert('All fields must be field');
    try {
      const response = await api.postData('users/signin', {username, password});
      storage.set('token', `Bearer ${response.token}`);
      alert(`Hello, ${username}. Now you can use your calendar.`)
    } catch(e) {
      alert('Username or password incorrect');
    }
  } 

  return (
    <Form onSubmit={async (e) => await signIn(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={(e)=>inputChangeHandler(setUsername, e)} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>inputChangeHandler(setPassword, e)} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in
      </Button> 
      <Button href='/signup' variant="success">
        Create new account
      </Button>
    </Form>
  );
}