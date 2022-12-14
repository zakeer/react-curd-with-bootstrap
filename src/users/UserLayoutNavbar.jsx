import React, {useContext} from 'react';
import { EmployeeContext } from '../EmployeeContext';

export default function UsersLayoutNavbar() {
const { setSelectEmployee } = useContext(EmployeeContext);
  return (
    <nav className="navbar bg-light">
      <div className="container">
        <button className="btn btn-outline-success" onClick={() => setSelectEmployee({})}>
          Add User
        </button>
      </div>
    </nav>
  );
}
