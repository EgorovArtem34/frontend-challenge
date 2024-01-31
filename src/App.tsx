import { Routes, Route } from "react-router-dom";
import "@/styles/index.scss";
import { AllCatsPage } from "@/pages/AllCatsPage/AllCatsPage";
import { FavoritesCatsPage } from "@/pages/FavoritesCatsPage/FavoritesCatsPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AllCatsPage />} />
      <Route path="/favorites" element={<FavoritesCatsPage />} />
    </Routes>
  );
};
