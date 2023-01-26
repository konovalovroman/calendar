import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddEventForm.css';
import { useState } from 'react';
import { buildEvent } from './utils';
import { ApiService } from '../ApiService/ApiService';
import { inputChangeHandler } from '../common/utils';
import { decodeToken } from 'react-jwt';

export function AddEventForm({token}) {
  const api = new ApiService();
  const decodedToken = decodeToken(token);

  const [title, setTitle] = useState();
  const [startTime, setStartTime] = useState();
  const [finishTime, setFinishTime] = useState();
  
  const submitForm = async (event) => {
    if (title && startTime &&  finishTime) {
      const newEvent = buildEvent(title, startTime, finishTime, decodedToken.username);
      if (newEvent.start < 0 || newEvent.start >= 540 || newEvent.duration > 540) {
        alert('Events must be between 8am and 5pm');
        return;
      }
      try {
        await api.postData('events', newEvent);
      } catch(e) {
        alert(`Error: ${e}`);
      }
    } else {
      return alert('There are empty fields')
    }
  }
 
    return (
        <Form className="add-event-form" onSubmit={(e) => submitForm(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add new event</Form.Label>
            <Form.Control type="text" placeholder="Event title" onChange={(e)=>inputChangeHandler(setTitle, e)} required/>
            <Form.Label>Time start (8:00 - 17:00)</Form.Label>
            <Form.Control type="time" min="08:00" max="17:00" onChange={(e)=>inputChangeHandler(setStartTime, e)} required/>
            <Form.Label>Time finish (8:00 - 17:00)</Form.Label>
            <Form.Control type="time" min="08:00" max="17:00" onChange={(e)=>inputChangeHandler(setFinishTime, e)} required/>
          </Form.Group>
       <Button variant="primary" type="submit">
        Add
      </Button>
        </Form>
      );
}