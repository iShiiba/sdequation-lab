import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Cadastro from "../Pages/Cadastro";
import Perfil from "../Pages/Perfil";


const appRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='cadastro' element={<Cadastro />} />
                <Route path='perfil' element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    );
};

export default appRoutes;