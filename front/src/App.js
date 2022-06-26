import Routes from "./Routes/appRoutes";
import { useSelector } from "react-redux";




function App() {
  
  const getEmail = useSelector((state) => state.auth.email);
  const getAdmin = useSelector((state) => state.auth.isAdmin);
  return (
    <div className="App" style={{height:"100vh", width:"100vw"}}>
      <Routes email={getEmail} admin={getAdmin}/>
    </div>
  );
}

export default App;
