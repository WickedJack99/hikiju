import './App.css';

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './i18n';

import Home from './components/Home';
import AssistanceOffers from './components/AssistanceOffers';
import Search from './components/Search';
import Imprint from './components/Imprint';
import DataProtection from './components/DataProtection';
import Contact from './components/Contact';
import SubCategories from './components/SubCategories';
import Solution from './components/Solution';
import Directions from './components/Directions';

function App() {
  useEffect(() => {
    // Check if the key already exists in localStorage
    const key = "i18nLanguage";
    if (!localStorage.getItem(key)) {
      // Initialize with a default value if it doesn't exist
      localStorage.setItem(key, "de");
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const theme = createTheme({
    colorSchemes: {
      dark: true
    },
  });

  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/directions" element={<Directions/>} />
          <Route path="/assistance" element={<AssistanceOffers/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/imprint" element={<Imprint/>} />
          <Route path="/data_protection" element={<DataProtection/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/category/:name" element={<SubCategories/>} />
          <Route path="/solution/:name" element={<Solution/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
