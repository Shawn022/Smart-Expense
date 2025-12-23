import {Navigate} from "react-router-dom"
import {useAuth} from "../context/authContext"

const ProtectedRoute = ({children})=>{
    const {user,loading} = useAuth();
    
    console.log("ProtectedRoute:", { user, loading });
    if(loading){
        return <div className="loader"></div>
    }
    else if(!user){
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;