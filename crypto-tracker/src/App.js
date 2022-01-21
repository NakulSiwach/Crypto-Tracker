import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import "./App.css"
import Header from "./components/Header"
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import { makeStyles } from '@material-ui/core';





const App = () => {
  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor:"#333333",
      color:"white",
      minHeight:"100vh",
    },
  }))

  const classes=useStyles()

  return(
  <BrowserRouter>
    <div className={classes.App} >
      <Header/>
      <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/coins/:id" element={<Coinpage/>}/>
      </Routes>
    </div>
  </BrowserRouter>
  );
};

export default App;
