import React, { useState, useEffect } from 'react';

const AdminAddEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [emailAdded, setEmailAdded] = useState();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        endDate: ''

    })

    useEffect(() => {
        fetch(`${process.env.backendUrl}/existing-emails`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "abcd")
                setEmployees(data.emails);
            })
            .catch((err) => console.error("Error fetching employees:", err));
    }, [emailAdded]);
    useEffect(() => {
        fetch(`${process.env.backendUrl}/available-user`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.usersNotInEmployees, "efgh")
                setUsers(data.usersNotInEmployees);
            })
            .catch((err) => console.error("Error fetching employees:", err));
    }, []);
    useEffect(() => {
        const addEmployee=()=>{
            fetch(`${process.env.backendUrl}/admin/create-employee`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailEmployee: selectedUser,
                    // employeeEmail: selected
                })
            })
            .then((res) => res.json())
            .then((data) => {
                setEmailAdded(data)
                console.log(data, "Employee added successfully");
            })
            .catch((err) => console.error("Error adding employee:", err));
        }
        addEmployee();
    }, [selectedUser]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // console.log(...formData, "selected employee");
        fetch(`${process.env.backendUrl}/admin-giveTask`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employeeEmail: selected,
                title: formData.title,
                description: formData.description,
                endDate: formData.endDate,
            }),
    })
}
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (

        <>
            <div className="mb-3">
                <label className="form-label">Select User</label>
                <select
                    className="form-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="">-- Select user to make employee --</option>
                    {users.map((emp, id) => (
                        <option key={id} value={emp.email || emp}>
                            {emp.email || emp}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
            <label className="form-label">Select Employee</label>
            <select
                className="form-select"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                <option value="">-- Select Employee --</option>
                {employees.map((emp, id) => (
                    <option key={id} value={emp.email || emp}>
                        {emp.email || emp}
                    </option>
                ))}
            </select>
            </div>
            <form className="container mt-4 p-4 border rounded" onSubmit={handleSubmit}>
                <h4 className="mb-4">Create Task</h4>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        placeholder="Enter description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </>
    )
}
export default AdminAddEmployee;