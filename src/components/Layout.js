import React from 'react';
import '../styles/Layout.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ content }) => {
  return (
    <div className="layout">
      <Navbar/>
      <div style={{ maxHeight: 'calc(100vh - 192px)', overflowY: 'auto' }}><div className="layout-content">{content}</div></div>
      <Footer/>
    </div>
  );
};

export default Layout;