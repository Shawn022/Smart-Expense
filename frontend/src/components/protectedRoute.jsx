import {Navigate} from "react-router-dom"
import {useAuth} from "../context/authContext"

const ProtectedRoute = ({children})=>{
    const {user,loading} = useAuth();
    

    if(loading){
        return <div className="loader"></div>
    }
    else if(!user){
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;