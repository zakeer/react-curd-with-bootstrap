import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext();

export default function EmployeeProvider({ children }) {
    const [employees, setEmployees] = useState([
        {
			id: (new Date()).getTime(),
            firstName: 'Syed',
            lastName: 'Tasneem',
            email: 'syed@tasneem.me',
            contactNo: '9876543210',
            dateOfBirth: '01/01/1999',
            gender: 'Female',
            country: 'India',
            state: 'AP',
            city: 'Ongole',
            address: 'Islampet Area',
            hobbies: ['Reading Books', 'Tv'],
        },
		{
			id: (new Date()).getTime() + 1,
            firstName: 'Ranga',
            lastName: 'Raju',
            email: 'Ranga@Raju.me',
            contactNo: '787878900',
            dateOfBirth: '01/05/1992',
            gender: 'Male',
            country: 'India',
            state: 'Andhra Pradesh',
            city: 'Guntur',
            address: 'Arundelpet 4th lane',
            hobbies: ['Tv'],
        },
		{
			id: (new Date()).getTime() + 2,
            firstName: 'Syed 3',
            lastName: 'Tasneem',
            email: 'syed@tasneem.me',
            contactNo: '9876543210',
            dateOfBirth: '01/01/1999',
            gender: 'Female',
            country: 'India',
            state: 'AP',
            city: 'Ongole',
            address: 'Islampet Area',
            hobbies: ['Reading', 'Browsing'],
        },
    ]);
	
	const [selectEmployee, setSelectEmployee] = useState(null);

    const createEmployee = (newUserDetails) => {
        setEmployees([...employees, { id: Date.now(), ...newUserDetails }]);
    };

    const readEmployee = (id) => {
        return employees.find((employee) => employee.id === id);
    };

    const updateEmployee = (id, updateFields) => {
        setEmployees(employees.map((employee) => (employee.id === id ? { id, ...updateFields } : employee)));
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                createEmployee,
                readEmployee,
                updateEmployee,
                deleteEmployee,
				setSelectEmployee,
				selectEmployee
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};
