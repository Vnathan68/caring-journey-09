
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

const MainLayout: React.FC = () => {
  console.log("MainLayout rendering");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-18 lg:pt-20 px-4 sm:px-6 lg:px-8 w-full max-w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
