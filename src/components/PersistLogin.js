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
  const [loadingMsg ,setLoadingMsg] = useState(false)

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

  useEffect(()=>{
    setTimeout(()=>{
      setLoadingMsg(true)
    },[10000])
    setLoadingMsg(false)
  },[])


  return (
    <>{!persist ? <Outlet /> : isLoading ? <div  style={{
      display: 'flex',
      justifyContent: 'center',  // Center horizontally
      alignItems: 'center',      // Center vertically
      minHeight: '50vh',       // Ensure it covers the entire viewport height
    }}>
<div>
<div style={{display:'flex', justifyContent:'center'}}>

     <RiseLoader
    color="#36d7b7"
    loading
    speedMultiplier={2}
    /> 
    </div>
    <br/>
    <br/>
    <div style={{display:'flex', justifyContent:'center'}}>
    <br/>
    <br/>
    {loadingMsg && <div><p style={{fontFamily:'monospace', color:'gray'}}>This page is taking longer to load than expected, kindly be patient.</p></div> }
    </div>
    </div>
    </div>
    : <Outlet />}</>
  );
};

export default PersistLogin;
