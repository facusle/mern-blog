import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Project from './pages/Project';

export default function App() {
     return (
          <BrowserRouter>
               <Header />
               <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/signin" element={<Signin />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/projects" element={<Project />}></Route>
               </Routes>
          </BrowserRouter>
     );
}
