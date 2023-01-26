import { CalendarPage } from '../pages/CalendarPage';
import { Header } from '../Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignInPage } from '../pages/SignInPage'
import { SignUpPage } from '../pages/SignUpPage';
import './App.css';
import { LocalStorageService } from '../LocalStorageServive/LocalStorageService';


const App = () => {
  const storage = new LocalStorageService();
  const token = storage.get('token') ?? '';  

  return (
      <div className='App'>
        <Header />
        <Router>
          <Routes>
            <Route path='/' element={<CalendarPage token={token}/>}/>
            <Route path='/signin' element={<SignInPage token={token}/>}/>
            <Route path='/signup' element={<SignUpPage />}/>
          </Routes>
        </Router>
     </div>
  );
};

export default App;
