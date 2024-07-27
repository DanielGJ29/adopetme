import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Home from "../Pages/Home/index";
import PublicationsPets from "../components/Pets/PublicationsPets";
import MainLayout from "../Pages/layout/MainLayout";
import AdoptPets from "../components/Pets/AdoptPets";
import PetForm from "../Pages/PetForm";
import UserProfile from "../components/User/UserProfile";




const MainRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publicaciones" element={<PublicationsPets />} />
          <Route path="/adopcion" element={<AdoptPets />} />
          <Route path="/registro-mascotas" element={<PetForm />} />
          <Route path="/profile" element={<UserProfile/>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default MainRouter;
