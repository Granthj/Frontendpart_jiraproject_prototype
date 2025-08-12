import React from 'react';
import { useAuth } from "../src/Authentication/AuthContext";
import { useNavigate } from 'react-router';
const App = () => {
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); // Clears user & calls backend logout
    };
    const handleLogin = () => {
        navigate("/login");
    }
    const handleSignUp = ()=>{
        navigate("/signup");
    }
    return (
        <>
            <div className="container mt-10">
                <h1 className="text-primary">Welcome to the Assign Task</h1>
                <p>Technologies used node,express,mongoDb and reactjs with jwt token</p>
                <p>All routes details</p>
                <p>/ for home page</p>
                <p>/admin-dashboard for admin dashboard</p>
                <p>/user-dashboard/:email for user dashboard</p>
                <p>/login for login</p>
                <p>/signup for signup</p>
                {user.email?(<button className="btn btn-success" onClick={handleLogout}>
                    Logout
                </button>):(<button className="btn btn-success" onClick={handleLogin}>
                    Login
                </button>)}
                {/* <button className="btn btn-success" onClick={handleLogout}>
                    Logout
                </button>
                <button className="btn btn-success" onClick={handleLogin}>
                    Login
                </button> */}
                <button className="btn btn-success" onClick={handleSignUp}>
                    Sign Up
                </button>
            </div>
        </>
    )

}

export default App;