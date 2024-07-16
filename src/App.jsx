import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PetList from './Components/PetList';
import PetProfile from './Components/PetProfile';
import LoginForm from './Components/LoginFrom'; // Assuming the correct name is LoginForm
import FeedbackForm from './Components/FeedbackFrom'; // Assuming the correct name is FeedbackForm
//import AdoptionForm from './Components/AdoptionFrom'; // Assuming the correct name is AdoptionForm
import Header from './Components/Header';
import Footer from './Components/Footer';
import RegisterForm from './Components/RegisterFrom'; // Assuming the correct name is RegisterForm

import Homepages from './Components/Homepages';
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Components/AdminDashboard';
import AdoptionForm from './Components/AdoptionFrom';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepages />} />
          <Route path="/pet" element={<PetList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/feed" element={<FeedbackForm />} />
          <Route path="/adopt" element={<AdoptionForm />} />
          <Route path="/profile/:petId" element={<PetProfile />} />
          <Route path="/userdashboard" element={<Dashboard />} />
         
          
         
         
         
          
         
         
         
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
