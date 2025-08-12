import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditTodaysTask = ({ show, handleClose, userEmail, task, taskid }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [addTask, setAddTask] = useState(false);
  const [isSave,setIsSave] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState({
    notes: "",
    status: "",
    date:""
  });
  // console.log("this is my task id",taskid)
  useEffect(() => {
    setTasks(task);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
        try {
        //   console.log("Fetching tasks for user:", user.email);
        const response = await fetch(`${process.env.backendUrl}/tasks/:${userEmail}`, {
          method: "GET",
          credentials: "include", 
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        for(let i = 0; i < data.tasks.length; i++) {
          if(data.tasks[i]._id === taskid) {
            setTasks(data.tasks[i].progress);
            
            // console.log("DATA tasks:", data.tasks[i].progress);
            break;
          }
        }
        // setTasks(data.tasks.progress);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
      fetchTasks();
  }, [isSave]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${process.env.backendUrl}/edit/${taskid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          date: taskUpdate.date,
          notes: taskUpdate.notes,
          status: taskUpdate.status
        })
      });
      if (!res.ok) throw new Error("Failed to update task");
      setAddTask(false);
      setIsSave(!isSave);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header >
        <Modal.Title>Previous Task Progress</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading tasks...</p>) 
          : (<table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Updated By</th>
              </tr>
            </thead>
            {tasks.length !== 0 &&<tbody>
              {tasks.map(task => (
                <tr key={task._id}>
                  <td>
                    {new Date(task.date).toLocaleDateString()}
                  </td>
                  <td>
                    {task.notes}
                  </td>
                  <td>
                    {task.status}
                  </td>
                  <td>
                    {task.updatedBy}
                  </td>
                </tr>
              ))}
            </tbody>}
            {addTask && <tbody>
              <tr>
                <td>
                  <input type="date" className="form-control" onChange={(e) => setTaskUpdate(prev => ({ ...prev, date: e.target.value }))} />
                </td>
                <td>
                  <input type="text" className="form-control" placeholder="Enter notes" onChange={(e) => setTaskUpdate(prev => ({ ...prev, notes: e.target.value }))} />
                </td>
                <td>
                  <select className="form-select" value={taskUpdate.status}
                    onChange={(e) =>
                      setTaskUpdate((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>{userEmail}</td>
                <td>
                </td>
              </tr>
                  <Button variant="primary" onClick={handleSave}>Save</Button>
                  <Button variant="secondary" onClick={() => setAddTask(false)}>Cancel</Button>
            </tbody>}
            <button className="btn btn-primary btn-sm" onClick={() => setAddTask(!addTask)}>Add Todays Update</button>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTodaysTask;
