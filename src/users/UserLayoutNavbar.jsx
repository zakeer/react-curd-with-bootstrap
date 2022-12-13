import React from 'react';
import { Link } from 'react-router-dom';

export default function UsersLayoutNavbar() {
  return (
    <nav className="navbar bg-light">
      <div className="container">
        <Link className="btn btn-outline-success" to="/add">
          Add User
        </Link>
      </div>
    </nav>
  );
}
