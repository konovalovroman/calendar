import styled from 'styled-components';
import './calendar.css'
import { ApiService } from '../ApiService/ApiService';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';


const HOUR_HEIGHT = 190;

export const Calendar = ({token}) => {
    const decodedToken = decodeToken(token);

    const api = new ApiService();

    const [events, setEvents] = useState([]);
    const [username, setUsername] = useState(decodedToken?.username || null);

    useEffect(() => {
            if (username) {
                const fetchData = async () => {
                const data = await api.getAll('events', username);
                setEvents(data);
                }
                fetchData();
            } else {
                alert('Signin to use calendar')
            }
    }, []);

    const exportCalendar = async () => {
        const result = events.map(i => {
            return {
                start: i.start,
                duration: i.duration,
                title: i.title
            }
        })
        return alert(JSON.stringify(result));
    }

    const removeEvent = async (event) => {
        const eventId = event.target.getAttribute('data-eventid'); 
        setEvents(events.filter(i => i._id !== eventId));
        await api.deleteResource('events', eventId);
    }

    return (
        <div className="calendar" >
            Click on the event to remove it
            <Wrapper>
                <HGrid first={'47px'} cols={'1'}>
                    <VGrid rows={'19'}>
                            <Hour>8:00</Hour>
                            <Hour>8:30</Hour>
                            <Hour>9:00</Hour>
                            <Hour>9:30</Hour>
                            <Hour>10:00</Hour>
                            <Hour>10:30</Hour>
                            <Hour>11:00</Hour>
                            <Hour>11:30</Hour>
                            <Hour>12:00</Hour>
                            <Hour>12:30</Hour>
                            <Hour>1:00</Hour>
                            <Hour>1:30</Hour>
                            <Hour>2:00</Hour>
                            <Hour>2:30</Hour>
                            <Hour>3:00</Hour>
                            <Hour>3:30</Hour>
                            <Hour>4:00</Hour>
                            <Hour>4:30</Hour>
                            <Hour>5:00</Hour>
                    </VGrid>
                    <HGrid cols={'1'} className="events">
                        {events.map((item => <Event className="event" eventId={item._id} start={item.start} duration={item.duration} onClick={(e) => removeEvent(e)}>{item.title}</Event>))}               
                    </HGrid>
                </HGrid>
            </Wrapper>
            <Button variant="secondary" onClick={exportCalendar}>Export in JSON format</Button>
        </div>
    );
}


const Wrapper = styled.div`
    width: 250px;
    margin: 30px;
    position: relative;
`;

const HGrid = styled.div`
    display: grid;
    grid-template-columns: ${({ first }) => first || ''} repeat(${({ cols }) => cols}, 1fr) 
`;

const VGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(${({ rows }) => rows}, 1fr) 
`;

const Hour = styled.div`
    font-family: 'Open Sans';
    font-weight: 200;
    font-size: 16px;
    height ${({ HOUR_HEIGHT }) => HOUR_HEIGHT}px;
    display: flex;
    align-items: center;
    margin-bottom: 70px;

    &:nth-child(even) {
        font-size: 12px;
    }
    &:nth-child(odd) {
        width: 250px;
        border-top: 1px solid #BDBDBC;
    }
`;

const Event = styled.div.attrs(props => ({'data-eventid': props.eventId}))`
   
    top: ${({ start }) => (start / 60 * HOUR_HEIGHT)}px;
    height: ${({ duration }) => (duration / 60) * HOUR_HEIGHT}px;
    
    
`;