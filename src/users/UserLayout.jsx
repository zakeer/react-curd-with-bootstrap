import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import UsersLayoutNavbar from './UserLayoutNavbar';
import UserForm from './UserForm';
import UsersList from './UsersList';
import { EmployeeContext } from '../EmployeeContext';

export default function UsersLayout() {
	const { selectEmployee } = useContext(EmployeeContext);
    return (
        <BrowserRouter>
            <UsersLayoutNavbar />
            <div className="container-fluid py-5">
                <div className="row">
                    <div className={`col-md-${selectEmployee ? '8' : '12'}`}>
                        <UsersList />
                    </div>

                    {selectEmployee && <div className="col-md-4">
                        <UserForm />
                    </div>}
                </div>
            </div>
        </BrowserRouter>
    );
}