// src/App.js
import React from 'react';
import CustomerList from './components/CustomerList/CustomerList';
import MeasurementDetail from './components/MeasurementDetails/MeasurementDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CustomerList />
      </header>
    </div>
  );
}

export default App;
