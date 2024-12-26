import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './components/Home';
import Directions from './components/Directions';
import AssistanceOffers from './components/AssistanceOffers';
import Search from './components/Search';
import Imprint from './components/Imprint';
import DataProtection from './components/DataProtection';
import Contact from './components/Contact';
import SubCategories from './components/SubCategories';
import Solution from './components/Solution';

function App() {

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