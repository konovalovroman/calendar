import Button from 'react-bootstrap/Button';
import './AuthForms.css';
import { useState } from 'react';
import { LocalStorageService } from '../LocalStorageServive/LocalStorageService';

export const Profile = (user) => {

    const storage = new LocalStorageService();

    const [username, setUsername] = useState(user.user.username);


    const logOut = () => {
        storage.set('token', '');
    }

    return (
    <>
      <h1>Hello, {username}</h1>
      <Button href='/signin' variant="danger" onClick={logOut}>
        Log out
      </Button>
      </>
  );
}