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
import CreateDonationCampaign from './Pages/UserDashboard/createDonationcamponsation/creatDonation';
import CheckoutForm from './Pages/UserDashboard/Payment/checkoutfrom';
import MyAddedPets from './Pages/UserDashboard/myaddedpet/myaddedPets';

import AdaptationPage from './Components/Adoption/AdpationPages';
import ApplicationForm from './Pages/ApplicationEmail.jsx/Application';
//import AdminDashboard from './Components/AdminDashboard';


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
          {/* <Route path="/adopt" element={<AdoptionForm />} /> */}
          <Route path="/profile" element={<PetProfile />} />
          <Route path="/userdashboard" element={<Dashboard />} />
          <Route path="/create-donation" element={<CreateDonationCampaign />} />
          <Route path = "/payment" element={<CheckoutForm/>}/>
          <Route path="/MyaddedPets" element ={<MyAddedPets/>}/>
          <Route path= "/AdaptationPage" element={<AdaptationPage/>}/>
          {/* <Route path='/admin' element={<AdminDashboard/>}/> */}
          <Route path='/apply' element={<ApplicationForm/>}/>
         
         
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
