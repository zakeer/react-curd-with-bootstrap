import React, { useContext } from 'react';
import { EmployeeContext } from '../EmployeeContext';

export default function UsersList() {
    const { employees = {}, deleteEmployee, setSelectEmployee } = useContext(EmployeeContext);
    return (
        <div className="card">
            <div className="card-header">
                <h4 className="m-0">Employees List</h4>
            </div>
            <div className="card-body table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">ContactNo</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Country</th>
                            <th scope="col">State</th>
                            <th scope="col">City</th>
                            <th scope="col">Address</th>
                            <th scope="col">Hobbies</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.contactNo}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.country}</td>
                                <td>{employee.state}</td>
                                <td>{employee.city}</td>
                                <td>{employee.address}</td>
                                <td>{employee.hobbies}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => setSelectEmployee(employee)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteEmployee(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}