import React from 'react';
import './App.css';
import UserLayout from './users/UserLayout';
import EmployeeProvider from "./EmployeeContext"

export default function App(props) {
    return (
        <EmployeeProvider>
            <UserLayout />
        </EmployeeProvider>
    );
}