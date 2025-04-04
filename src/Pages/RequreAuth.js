
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../Firebase.init";
import Loading from "./Loading";

const RequireAuth=({children})=>{
    const [user, loading]=useAuthState(auth);
    // const location=useLocation()
    const navigate=useNavigate()
    if(loading){
      return <Loading></Loading>
    }
    if(!user){
      navigate("/login") 
    }
    return children;
}
export default RequireAuth;