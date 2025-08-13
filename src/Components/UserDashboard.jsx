import React, { useEffect, useState } from "react";
import { useAuth } from "../Authentication/AuthContext";
import { useParams } from "react-router-dom";
import EditTodaysTask from "./EditTodaysTask"
// import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";

const UserDashboard = () => {
  const { user } = useAuth(); 
  const { email } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { logout } = useAuth();
//   console.log(logout,"tdttdtd")
 function logOut() {
    logout();       
    window.location.href = "/login"; // Redirect to login page after logout
    }
  const openUpdateOption = () => {
    setShowUpdateModal(true);
  }
  useEffect(() => {
    if (!user.email) return;
    const fetchTasks = async () => {
        try {
        //   console.log("Fetching tasks for user:", user.email);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/:${user.email}`, {
          method: "GET",
          credentials: "include", 
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        // console.log("DATA tasks:", data.tasks);
        setTasks(data.tasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user.email]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: "red" }}> {error}</p>;

  return (
    <>
    <div className="container mt-4">
      <h2>Your Tasks</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Last Notes</th>
            <th>Last edit date</th>
            <th>Assign Date</th>
            <th>End Date</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                {(task.progress.length > 0)?<td>{task.progress[task.progress.length - 1].notes}</td>: <td>No notes yet</td>}
                {(task.progress.length > 0)?<td>{new Date(task.progress[task.progress.length - 1].date).toLocaleDateString()}</td>: <td>No updates yet</td>}
                <td>{new Date(task.assignDate).toLocaleDateString()}</td>
                <td>{new Date(task.endDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={openUpdateOption}>
                    See Progress
                  </button>
                </td>
                {showUpdateModal&&<EditTodaysTask userEmail={user.email} task={task.progress} taskid={task._id} show={showUpdateModal} handleClose={() => setShowUpdateModal(false)}/>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className="d-flex justify-content-center mt-4">
    <button type="button" 
        className="btn btn-danger btn-lg"  onClick={logOut}>Logout</button>
        </div>
    </>
  );
};

export default UserDashboard;
