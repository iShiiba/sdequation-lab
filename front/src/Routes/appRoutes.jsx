import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Cadastro from "../Pages/Cadastro";
import Perfil from "../Pages/Perfil";
import Historico from "../Pages/Historico";
import Exercícios from "../Pages/Exercicios";
import HistoricoAdm from "../Pages/HistoricoAdm";

const appRoutes = ({ email, admin }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        {email && (
          <>
            <Route path="perfil" element={<Perfil />} />
            <Route path="historico" element={<Historico />} />
            <Route path="exercicios" element={<Exercícios />} />
          </>
        )}
        {admin && <Route path="historicoadm" element={<HistoricoAdm />} />}
        <Route
          path="*"
          element={<Navigate to={email ? "/exercicios" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default appRoutes;
