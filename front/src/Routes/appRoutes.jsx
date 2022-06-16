import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";



const appRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default appRoutes;