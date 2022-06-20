import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Cadastro from "../Pages/Cadastro";
import Perfil from "../Pages/Perfil";
import Historico from "../Pages/Historico";
import Exercícios from "../Pages/Exercicios";
import HistoricoAdm from "../Pages/HistoricoAdm";


const appRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='cadastro' element={<Cadastro />} />
                <Route path='perfil' element={<Perfil />} />
                <Route path='historico' element={<Historico />} />
                <Route path='historicoadm' element={<HistoricoAdm />} />
                <Route path='exercicios' element={<Exercícios />} />
            </Routes>
        </BrowserRouter>
    );
};

export default appRoutes;