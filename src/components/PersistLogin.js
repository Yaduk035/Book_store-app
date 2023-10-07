import { Outlet } from "react-router-dom";
import useRefresh from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { RiseLoader } from "react-spinners";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, []);


  return (
    <>{!persist ? <Outlet /> : isLoading ? <div  style={{
      display: 'flex',
      justifyContent: 'center',  // Center horizontally
      alignItems: 'center',      // Center vertically
      minHeight: '20vh',       // Ensure it covers the entire viewport height
    }}>

     <RiseLoader
    color="#36d7b7"
    loading
    speedMultiplier={2}
    /> 
    </div>
    : <Outlet />}</>
  );
};

export default PersistLogin;
