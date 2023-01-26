import { AddEventForm } from "../AddEventForm/AddEventForm";
import { Calendar } from "../Calendar/Calendar";


export const CalendarPage = ({ token }) => {
    return (
        <>
            <AddEventForm token={token}/>
            <Calendar token={token}/>
        </>
    );
} 