import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';

function App() {
    const handleDateChange = (date: any) => {
        // console.log('Date:', date);
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Calendar handleDateChange={handleDateChange}/>
        </div>
    );
}

export default App;
