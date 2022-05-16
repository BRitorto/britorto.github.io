import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import PartyInviteForm from './routes/PartyInviteForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/invitation/:invitationHash" element={<PartyInviteForm />} />
    </Routes >
  </BrowserRouter >
);
