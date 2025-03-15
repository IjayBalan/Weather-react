import React from 'react'
import {HashRouter as Router,Route,Routes} from 'react-router-dom'
import HomePage from './Component/HomePage/HomePage';

let App=()=> {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Router> 
  );
}

export default App;
