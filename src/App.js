import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header'
import Footer from './components/Footer'
import Routes from './components/Router';

//import Routes from './components/Router';


class App extends Component {
  render() {
    return (
        <div>
        <Header />
        <CssBaseline />
          <Routes/>

          <Footer />
        </div>
    );
  }
}

export default App;
