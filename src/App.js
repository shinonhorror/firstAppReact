import React, {useState,useEffect} from "react";
import AppRouter from "./components/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import "./styles/app.css";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    if(localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false)
  },[])

  return (
    <AuthContext.Provider value={{
      isAuth, 
      setIsAuth,
      isLoading
    }}>
      <Router>
        <Navbar />
        <AppRouter />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
